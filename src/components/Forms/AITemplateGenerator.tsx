/**
 * AI Template Generator component for creating forms from natural language
 * Handles template generation, preview, and integration with form builder
 */

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { aiTemplateService } from '../../services/aiTemplateService';
import { AITemplate } from '../../types';
import { 
  SparklesIcon, 
  ArrowRightIcon, 
  CheckCircleIcon,
  ExclamationTriangleIcon,
  ClockIcon
} from '@heroicons/react/24/outline';

interface AITemplateGeneratorProps {
  onTemplateGenerated: (template: AITemplate) => void;
}

const AITemplateGenerator: React.FC<AITemplateGeneratorProps> = ({ onTemplateGenerated }) => {
  const [input, setInput] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedTemplate, setGeneratedTemplate] = useState<AITemplate | null>(null);
  const navigate = useNavigate();

  const handleGenerate = async () => {
    if (!input.trim()) return;

    setIsGenerating(true);
    try {
      const template = await aiTemplateService.generateTemplate(input);
      setGeneratedTemplate(template);
    } catch (error) {
      console.error('Error generating template:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleUseTemplate = () => {
    if (generatedTemplate) {
      onTemplateGenerated(generatedTemplate);
      setGeneratedTemplate(null);
      setInput('');
    }
  };

  const examples = [
    'Create inspection form for 2-bedroom apartment cleaning',
    'Restaurant health and safety inspection checklist',
    'Construction site safety inspection form',
    'Vehicle maintenance inspection report'
  ];

  return (
    <div className="space-y-6">
      {/* AI Generator Header */}
      <div className="text-center">
        <div className="flex items-center justify-center space-x-2 mb-4">
          <SparklesIcon className="w-8 h-8 text-blue-600" />
          <h2 className="text-2xl font-bold text-gray-900">AI Form Generator</h2>
        </div>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Describe what you want to inspect and our AI will generate a comprehensive form template for you.
        </p>
      </div>

      {/* Input Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <label htmlFor="ai-input" className="block text-sm font-medium text-gray-700 mb-2">
          Describe your inspection form
        </label>
        <div className="space-y-4">
          <textarea
            id="ai-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="e.g., Create inspection form for 2-bedroom apartment cleaning"
            className="w-full h-32 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
          />
          <div className="flex items-center justify-between">
            <div className="flex flex-wrap gap-2">
              {examples.map((example, index) => (
                <button
                  key={index}
                  onClick={() => setInput(example)}
                  className="text-sm px-3 py-1 bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-colors"
                >
                  {example}
                </button>
              ))}
            </div>
            <button
              onClick={handleGenerate}
              disabled={!input.trim() || isGenerating}
              className="flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isGenerating ? (
                <>
                  <ClockIcon className="w-4 h-4 animate-spin" />
                  <span>Generating...</span>
                </>
              ) : (
                <>
                  <SparklesIcon className="w-4 h-4" />
                  <span>Generate Form</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Generated Template Preview */}
      {generatedTemplate && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <CheckCircleIcon className="w-6 h-6 text-green-600" />
              <h3 className="text-lg font-semibold text-gray-900">Generated Template</h3>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-500">Confidence:</span>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                generatedTemplate.confidence > 0.9 ? 'bg-green-100 text-green-800' :
                generatedTemplate.confidence > 0.7 ? 'bg-yellow-100 text-yellow-800' :
                'bg-red-100 text-red-800'
              }`}>
                {(generatedTemplate.confidence * 100).toFixed(0)}%
              </span>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <h4 className="font-medium text-gray-900">{generatedTemplate.name}</h4>
              <p className="text-sm text-gray-600">{generatedTemplate.description}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h5 className="font-medium text-gray-900 mb-2">Sections ({generatedTemplate.sections.length})</h5>
                <ul className="space-y-1">
                  {generatedTemplate.sections.map((section, index) => (
                    <li key={section.id} className="text-sm text-gray-600">
                      {index + 1}. {section.title} ({section.fields.length} fields)
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h5 className="font-medium text-gray-900 mb-2">Field Types</h5>
                <div className="flex flex-wrap gap-2">
                  {Array.from(new Set(generatedTemplate.sections.flatMap(s => s.fields.map(f => f.type)))).map(type => (
                    <span key={type} className="px-2 py-1 bg-gray-100 text-gray-700 rounded-md text-xs">
                      {type}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-gray-200">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <ExclamationTriangleIcon className="w-4 h-4" />
                <span>Review and customize the generated form before publishing</span>
              </div>
              <div className="flex space-x-3">
                <button
                  onClick={() => setGeneratedTemplate(null)}
                  className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleUseTemplate}
                  className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <span>Use This Template</span>
                  <ArrowRightIcon className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Pre-built Templates */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Pre-built Templates</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {aiTemplateService.getIndustryTemplates().map((template) => (
            <div key={template.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <h4 className="font-medium text-gray-900 mb-2">{template.name}</h4>
              <p className="text-sm text-gray-600 mb-3">{template.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                  {template.industry}
                </span>
                <button
                  onClick={() => onTemplateGenerated(template)}
                  className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                >
                  Use Template
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AITemplateGenerator;