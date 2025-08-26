/**
 * AI Generator sidebar component for creating forms from natural language
 * Provides a chat-like interface for AI form generation
 */

import React, { useState, useRef, useEffect } from 'react';
import { aiTemplateService } from '../../services/aiTemplateService';
import { AITemplate, FormSection, FormField } from '../../types';
import {
  SparklesIcon, 
  XMarkIcon,
  ArrowRightIcon, 
  CheckCircleIcon,
  ExclamationTriangleIcon,
  ClockIcon,
  BoltIcon,
  TrashIcon,
  MinusCircleIcon,
  PaperAirplaneIcon,
  CodeBracketIcon,
  DocumentDuplicateIcon
} from '@heroicons/react/24/outline';

interface Message {
  id: string;
  type: 'user' | 'ai' | 'system';
  content: string;
  timestamp: Date;
  template?: AITemplate;
  isLoading?: boolean;
}

interface AIGeneratorSidebarProps {
  isOpen: boolean;
  onToggle: () => void;
  onTemplateGenerated: (template: AITemplate) => void;
}

const AIGeneratorSidebar: React.FC<AIGeneratorSidebarProps> = ({ 
  isOpen, 
  onToggle, 
  onTemplateGenerated 
}) => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentTemplate, setCurrentTemplate] = useState<AITemplate | null>(null);
  const [conversationContext, setConversationContext] = useState<string>('');
  const [sidebarWidth, setSidebarWidth] = useState(() => 
    Math.min(400, window.innerWidth * 0.3)
  );
  const [isResizing, setIsResizing] = useState(false);
  const [showJsonPreview, setShowJsonPreview] = useState<string | null>(null);
  const [copiedJson, setCopiedJson] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const resizeTimeoutRef = useRef<number | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      // Reset height to recalculate
      textareaRef.current.style.height = 'auto';
      // Set height to scrollHeight with min/max constraints
      const scrollHeight = textareaRef.current.scrollHeight;
      const minHeight = 40; // minimum height in pixels
      const maxHeight = 120; // maximum height in pixels
      const newHeight = Math.min(Math.max(scrollHeight, minHeight), maxHeight);
      textareaRef.current.style.height = `${newHeight}px`;
    }
  }, [input]);

  const clearConversation = () => {
    setMessages([]);
    setInput('');
    setCurrentTemplate(null);
    setConversationContext('');
  };

  // Sanitize user input
  const sanitizeInput = (text: string): string => {
    return text.trim().slice(0, 1000); // Limit length and trim
  };

  // Debounced resize handler
  const debouncedResize = React.useCallback(() => {
    if (resizeTimeoutRef.current) {
      clearTimeout(resizeTimeoutRef.current);
    }
    resizeTimeoutRef.current = window.setTimeout(() => {
      const maxWidth = Math.min(800, window.innerWidth * 0.9);
      const minWidth = 300;
      setSidebarWidth(prevWidth => Math.max(minWidth, Math.min(maxWidth, prevWidth)));
    }, 100);
  }, []);

  const addMessage = (message: Omit<Message, 'id' | 'timestamp'>) => {
    // Sanitize message content
    const sanitizedContent = typeof message.content === 'string' 
      ? message.content.slice(0, 2000) 
      : '';
    
    const newMessage: Message = {
      ...message,
      content: sanitizedContent,
      id: Date.now().toString(),
      timestamp: new Date()
    };
    setMessages(prev => [...prev, newMessage]);
    return newMessage.id;
  };

  const updateMessage = (id: string, updates: Partial<Message>) => {
    setMessages(prev => {
      const existingIndex = prev.findIndex(msg => msg.id === id);
      if (existingIndex === -1) return prev;
      
      const newMessages = [...prev];
      newMessages[existingIndex] = { ...prev[existingIndex], ...updates };
      return newMessages;
    });
  };

  const handleMouseDown = React.useCallback((e: React.MouseEvent) => {
    setIsResizing(true);
    e.preventDefault();
  }, []);

  const handleMouseMove = React.useCallback((e: MouseEvent) => {
    if (!isResizing) return;
    
    const newWidth = window.innerWidth - e.clientX;
    const minWidth = 300;
    const maxWidth = Math.min(800, window.innerWidth * 0.9);
    
    setSidebarWidth(Math.max(minWidth, Math.min(maxWidth, newWidth)));
  }, [isResizing]);

  const handleMouseUp = React.useCallback(() => {
    setIsResizing(false);
  }, []);

  React.useEffect(() => {
    if (isResizing) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = 'col-resize';
      document.body.style.userSelect = 'none';
      
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
        document.body.style.cursor = '';
        document.body.style.userSelect = '';
      };
    }
  }, [isResizing, handleMouseMove, handleMouseUp]);

  // Handle window resize
  React.useEffect(() => {
    window.addEventListener('resize', debouncedResize);
    return () => {
      window.removeEventListener('resize', debouncedResize);
      if (resizeTimeoutRef.current) {
        clearTimeout(resizeTimeoutRef.current);
      }
    };
  }, [debouncedResize]);

  // Cleanup on unmount
  React.useEffect(() => {
    return () => {
      if (resizeTimeoutRef.current) {
        clearTimeout(resizeTimeoutRef.current);
      }
    };
  }, []);

  const handleRemoveSection = (template: AITemplate, sectionId: string) => {
    const updatedTemplate = {
      ...template,
      sections: template.sections.filter(section => section.id !== sectionId)
    };

    setMessages(prev => prev.map(msg => 
      msg.template?.id === template.id ? { ...msg, template: updatedTemplate } : msg
    ));
  };

  const handleRemoveField = (template: AITemplate, sectionId: string, fieldId: string) => {
    const updatedTemplate = {
      ...template,
      sections: template.sections.map(section =>
        section.id === sectionId
          ? {
              ...section,
              fields: section.fields.filter(field => field.id !== fieldId)
            }
          : section
      )
    };

    setMessages(prev => prev.map(msg => 
      msg.template?.id === template.id ? { ...msg, template: updatedTemplate } : msg
    ));
  };

  const handleShowJson = (template: AITemplate) => {
    setShowJsonPreview(prev => prev === template.id ? null : template.id);
  };

  const handleCopyJson = async (template: AITemplate) => {
    try {
      const jsonString = JSON.stringify(template, null, 2);
      await navigator.clipboard.writeText(jsonString);
      setCopiedJson(template.id);
      setTimeout(() => setCopiedJson(null), 2000);
    } catch (error) {
      console.error('Failed to copy JSON:', error);
    }
  };

  const handleSendMessage = async () => {
    const sanitizedInput = sanitizeInput(input);
    if (!sanitizedInput || isGenerating) return;

    setIsGenerating(true);
    setInput('');

    // Add user message
    addMessage({
      type: 'user',
      content: sanitizedInput
    });

    // Update conversation context
    const newContext = conversationContext 
      ? `${conversationContext}\nUser: ${sanitizedInput}` 
      : `User: ${sanitizedInput}`;
    setConversationContext(newContext);
    try {
      // Check if this is a modification request
      const isModificationRequest = currentTemplate && (
        sanitizedInput.toLowerCase().includes('add') ||
        sanitizedInput.toLowerCase().includes('modify') ||
        sanitizedInput.toLowerCase().includes('change') ||
        sanitizedInput.toLowerCase().includes('remove') ||
        sanitizedInput.toLowerCase().includes('update') ||
        sanitizedInput.toLowerCase().includes('more')
      );

      if (isModificationRequest) {
        // Modify existing template
        const updatedTemplate = await aiTemplateService.modifyTemplate(currentTemplate!, sanitizedInput);
        setCurrentTemplate(updatedTemplate);
        
        addMessage({
          type: 'ai',
          content: `✅ Updated "${updatedTemplate.name}" based on your request`,
          template: updatedTemplate
        });
      } else {
        // Generate new template or continue conversation
        const template = await aiTemplateService.generateTemplate(sanitizedInput, conversationContext);
        setCurrentTemplate(template);
        
        addMessage({
          type: 'ai',
          content: `✅ Generated "${template.name}" form template!`,
          template: template
        });
      }
    } catch (error: any) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      addMessage({
        type: 'ai',
        content: `❌ Generation failed: ${errorMessage}. Please try again with a different description.`
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleUseTemplate = (template: AITemplate) => {
    onTemplateGenerated(template);
    addMessage({
      type: 'system',
      content: `✅ Template "${template.name}" has been applied to your form builder! The sidebar will close now.`
    });
    // Clear the conversation and close sidebar
    setTimeout(() => {
      clearConversation();
      onToggle();
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && e.ctrlKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const examples = [
    'Create inspection form for 2-bedroom apartment cleaning',
    'Restaurant health and safety inspection checklist',
    'Construction site safety inspection form',
    'Vehicle maintenance inspection report'
  ];

  return (
    <>
      {/* AI Generator Toggle Button */}
      <button
        onClick={onToggle}
        className="fixed bottom-6 right-6 bg-purple-600 text-white p-4 rounded-full shadow-lg hover:bg-purple-700 transition-colors z-40"
        title="AI Form Generator"
      >
        <SparklesIcon className="w-6 h-6" />
      </button>

      {/* AI Generator Sidebar */}
      <div 
        className={`fixed top-0 right-0 bg-white shadow-2xl border-l border-gray-200 transition-all duration-300 ease-in-out z-40 ${
          isOpen ? 'block' : 'hidden'
        } h-screen`}
        style={{ width: `${sidebarWidth}px` }}
      >
        {/* Resize Handle */}
        <div
          className={`absolute top-0 left-0 w-1 h-full bg-transparent hover:bg-blue-200 cursor-col-resize z-10 transition-none ${
            isResizing ? 'bg-blue-300' : ''
          }`}
          onMouseDown={handleMouseDown}
          title="Drag to resize"
        />
        
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="bg-purple-600 text-white p-4 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <SparklesIcon className="w-6 h-6" />
              <h3 className="text-lg font-semibold">AI Form Generator</h3>
            </div>
            <div className="flex items-center space-x-2">
              {messages.length > 0 && (
                <button
                  onClick={clearConversation}
                  className="text-white hover:text-gray-200 transition-colors text-sm px-2 py-1 rounded"
                  title="Clear conversation"
                >
                  Clear
                </button>
              )}
              <button
                onClick={onToggle}
                className="text-white hover:text-gray-200 transition-colors"
              >
                <XMarkIcon className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto">
            {messages.length === 0 ? (
              /* Initial State */
              <div className="p-4 space-y-4">
                {/* Description */}
                <div className="bg-purple-50 rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <BoltIcon className="w-5 h-5 text-purple-600" />
                    <h4 className="font-medium text-purple-900">How it works</h4>
                  </div>
                  <p className="text-sm text-purple-700">
                    Describe what you want to inspect and our AI will generate a comprehensive form template for you.
                  </p>
                </div>

                {/* Pre-built Templates */}
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Pre-built Templates:</h4>
                  <div className="space-y-2">
                    {aiTemplateService.getIndustryTemplates().map((template) => (
                      <div key={template.id} className="border border-gray-200 rounded-lg p-3 hover:shadow-sm transition-shadow">
                        <h5 className="font-medium text-gray-900 text-sm">{template.name}</h5>
                        <p className="text-xs text-gray-600 mb-2">{template.description}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                            {template.industry}
                          </span>
                          <button
                            onClick={() => handleUseTemplate(template)}
                            className="text-xs text-purple-600 hover:text-purple-800 font-medium"
                          >
                            Use Template
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Quick Examples */}
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Quick Examples:</h4>
                  <div className="space-y-1">
                    {examples.map((example, index) => (
                      <button
                        key={index}
                        onClick={() => setInput(example)}
                        className="w-full text-left text-xs px-3 py-2 bg-gray-50 text-gray-700 rounded-md hover:bg-gray-100 transition-colors border border-gray-200"
                      >
                        {example}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              /* Chat Messages */
              <div className="p-4 space-y-4">
                {messages.map((message) => (
                  <div key={message.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          message.type === 'user' 
                            ? 'bg-purple-100 text-purple-800' 
                            : message.type === 'system'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-blue-100 text-blue-800'
                        }`}>
                          {message.type === 'user' ? 'You' : message.type === 'system' ? 'System' : 'AI Assistant'}
                        </span>
                        <span className="text-xs text-gray-500">{formatTime(message.timestamp)}</span>
                      </div>
                    </div>
                    
                    <div className="px-4 pb-4">
                      <div className="text-sm text-gray-900 mb-3">
                      {message.isLoading ? (
                        <div className="flex items-center space-x-2">
                          <ClockIcon className="w-4 h-4 animate-spin" />
                          <span>{message.content}</span>
                        </div>
                      ) : (
                        message.content
                      )}
                      </div>
                      
                      {/* Template Preview */}
                      {message.template && !message.isLoading && (
                        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-5 border border-blue-100">
                          <div className="flex items-center justify-between mb-3">
                            <h4 className="font-bold text-lg text-gray-900">{message.template.name}</h4>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              message.template.confidence > 0.9 ? 'bg-green-100 text-green-800' :
                              message.template.confidence > 0.7 ? 'bg-yellow-100 text-yellow-800' :
                              'bg-red-100 text-red-800'
                            }`}>
                              {(message.template.confidence * 100).toFixed(0)}%
                            </span>
                          </div>
                          
                          <p className="text-sm text-gray-700 mb-5 leading-relaxed">{message.template.description}</p>
                          
                          <div className="grid grid-cols-3 gap-4 mb-5">
                            <div className="text-center bg-white rounded-lg p-3 shadow-sm border border-blue-100">
                              <div className="font-bold text-xl text-blue-600">{message.template.sections.length}</div>
                              <div className="text-sm text-gray-600 font-medium">Sections</div>
                            </div>
                            <div className="text-center bg-white rounded-lg p-3 shadow-sm border border-blue-100">
                              <div className="font-bold text-xl text-green-600">{message.template.sections.reduce((acc, section) => acc + section.fields.length, 0)}</div>
                              <div className="text-sm text-gray-600 font-medium">Fields</div>
                            </div>
                            <div className="text-center bg-white rounded-lg p-3 shadow-sm border border-blue-100">
                              <div className="font-bold text-sm text-purple-600 capitalize truncate">{message.template.industry}</div>
                              <div className="text-sm text-gray-600 font-medium">Industry</div>
                            </div>
                          </div>

                          {/* Sections Preview */}
                          <div className="space-y-4 mb-5">
                            <h5 className="font-semibold text-gray-900 text-base border-b border-blue-200 pb-2">Form Structure</h5>
                            <div className="space-y-3">
                              {message.template.sections.map((section, sectionIndex) => (
                                <div key={section.id} className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm hover:shadow-md transition-all duration-200">
                                  <div className="flex items-center justify-between mb-3">
                                    <div className="flex items-center space-x-2">
                                      <div className="w-7 h-7 bg-blue-500 rounded-full flex items-center justify-center shadow-sm">
                                        <span className="text-sm font-bold text-white">{sectionIndex + 1}</span>
                                      </div>
                                      <h6 className="text-sm font-bold text-gray-900">
                                        {section.title}
                                      </h6>
                                      <span className="text-xs text-blue-700 bg-blue-100 px-2 py-1 rounded-full font-medium">
                                        {section.fields.length} field{section.fields.length !== 1 ? 's' : ''}
                                      </span>
                                    </div>
                                    <button
                                      onClick={() => handleRemoveSection(message.template!, section.id)}
                                      className="text-red-400 hover:text-red-600 hover:bg-red-50 p-1.5 rounded-full transition-colors"
                                      title="Remove section"
                                    >
                                      <MinusCircleIcon className="w-4 h-4" />
                                    </button>
                                  </div>
                                  <div className="space-y-2.5">
                                    {section.fields.map((field, fieldIndex) => {
                                      const getFieldIcon = (type: string) => {
                                        switch (type) {
                                          case 'text': return '📝';
                                          case 'textarea': return '📄';
                                          case 'select': return '📋';
                                          case 'radio': return '🔘';
                                          case 'checkbox': return '☑️';
                                          case 'rating': return '⭐';
                                          case 'photo': return '📷';
                                          case 'video': return '🎥';
                                          case 'signature': return '✍️';
                                          default: return '📝';
                                        }
                                      };

                                      const getFieldTypeColor = (type: string) => {
                                        switch (type) {
                                          case 'text': case 'textarea': return 'bg-green-100 text-green-700';
                                          case 'select': case 'radio': case 'checkbox': return 'bg-purple-100 text-purple-700';
                                          case 'rating': return 'bg-yellow-100 text-yellow-700';
                                          case 'photo': case 'video': return 'bg-pink-100 text-pink-700';
                                          case 'signature': return 'bg-indigo-100 text-indigo-700';
                                          default: return 'bg-gray-100 text-gray-700';
                                        }
                                      };

                                      return (
                                        <div key={field.id} className="flex items-center justify-between bg-gray-50 rounded-lg px-3 py-2.5 border border-gray-200 hover:border-gray-300 hover:bg-gray-100 transition-all duration-200">
                                          <div className="flex-1 min-w-0">
                                            <div className="flex items-center space-x-1 mb-1.5">
                                              <span className="text-sm font-semibold text-gray-800 truncate">
                                                {field.label}
                                              </span>
                                            </div>
                                            <div className="flex items-center space-x-1">
                                              <span className={`px-2 py-1 rounded text-xs font-semibold ${getFieldTypeColor(field.type)}`}>
                                                {field.type}
                                              </span>
                                              {field.required && (
                                                <span className="text-red-600 text-sm font-bold">
                                                  *
                                                </span>
                                              )}
                                            </div>
                                          </div>
                                          <div className="flex-shrink-0 ml-2">
                                            <button
                                              onClick={() => handleRemoveField(message.template!, section.id, field.id)}
                                              className="text-red-400 hover:text-red-600 hover:bg-red-50 p-1.5 rounded-lg transition-colors"
                                              title="Remove field"
                                            >
                                              <TrashIcon className="w-3 h-3" />
                                            </button>
                                          </div>
                                        </div>
                                      );
                                    })}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* JSON Preview */}
                          {showJsonPreview === message.template.id && (
                            <div className="mb-5">
                              <div className="bg-gray-900 rounded-xl p-4 max-h-64 overflow-y-auto border border-gray-700">
                                <pre className="text-green-400 text-sm font-mono whitespace-pre-wrap break-words leading-relaxed">
                                  {JSON.stringify(message.template, null, 2)}
                                </pre>
                              </div>
                            </div>
                          )}

                          {/* Action Buttons */}
                          <div className="flex flex-col space-y-2">
                            <div className="flex space-x-3">
                              <button
                                onClick={() => handleShowJson(message.template!)}
                                className="flex items-center space-x-2 px-4 py-2.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium flex-1"
                              >
                                <CodeBracketIcon className="w-3 h-3" />
                                <span>{showJsonPreview === message.template.id ? 'Hide JSON' : 'View JSON'}</span>
                              </button>
                              <button
                                onClick={() => handleCopyJson(message.template!)}
                                className="flex items-center space-x-2 px-4 py-2.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium flex-1"
                              >
                                <DocumentDuplicateIcon className="w-3 h-3" />
                                <span>{copiedJson === message.template.id ? 'Copied!' : 'Copy JSON'}</span>
                              </button>
                            </div>
                            <button
                              onClick={() => handleUseTemplate(message.template!)}
                              disabled={message.template.sections.length === 0}
                              className="w-full flex items-center justify-center space-x-2 px-6 py-3.5 bg-purple-600 text-white rounded-xl hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 text-base font-semibold shadow-md hover:shadow-lg"
                            >
                              <span>Use This Template</span>
                              <ArrowRightIcon className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>
            )}
          </div>

          {/* Message Input */}
          <div className="border-t border-gray-200 p-4">
            <div className="bg-white border border-gray-300 rounded-2xl p-4 flex flex-col space-y-3">
              {/* Text Input */}
              <textarea
                ref={textareaRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={currentTemplate 
                  ? "Add more sections, modify existing ones, or ask questions..." 
                  : "Create form"
                }
                className="w-full bg-transparent text-gray-900 placeholder-gray-500 focus:outline-none text-sm resize-none overflow-hidden"
                style={{ minHeight: '40px', maxHeight: '120px' }}
                maxLength={1000}
                aria-label={currentTemplate ? "Continue conversation" : "Describe your inspection form"}
              />

              {/* Attachment Icon and Send Button */}
              <div className="flex items-center justify-between">
                <button className="text-gray-500 hover:text-gray-700 transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                  </svg>
                </button>
                
                <button
                  onClick={handleSendMessage}
                  disabled={!input.trim() || isGenerating}
                  className="bg-gray-900 text-white p-2 rounded-full hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  aria-label="Send message"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                  </svg>
                </button>
              </div>
            </div>
            
            {/* Character Count */}
            <div className="text-xs text-gray-500 mt-2 px-2">
              {input.length}/1000 characters
            </div>

            {currentTemplate ? (
              <div className="mt-2">
                <p className="text-xs text-gray-600 font-medium">
                  💬 Continue refining "{currentTemplate.name}"
                </p>
                <p className="text-xs text-gray-500">
                  Try: "Add a safety section", "Remove bedroom fields", "Make it more detailed"
                </p>
              </div>
            ) : (
              <p className="text-xs text-gray-500 mt-1">
                Press Ctrl+Enter to send, Enter for new line. Max 1000 characters.
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default AIGeneratorSidebar;