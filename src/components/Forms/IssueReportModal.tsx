/**
 * Issue report modal component for guiding users to report bugs and issues
 * Provides structured guidance for creating effective issue reports
 */

import React from 'react';
import { 
  XMarkIcon, 
  ExclamationTriangleIcon, 
  BugAntIcon,
  SparklesIcon,
  QuestionMarkCircleIcon,
  DocumentDuplicateIcon
} from '@heroicons/react/24/outline';

interface IssueReportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const IssueReportModal: React.FC<IssueReportModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = React.useState<'bug' | 'feature' | 'question'>('bug');
  const [copied, setCopied] = React.useState<string | null>(null);

  if (!isOpen) return null;

  const handleCopy = async (text: string, type: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(type);
      setTimeout(() => setCopied(null), 2000);
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  const bugTemplate = `**🐛 Bug Report**

**Browser & Version:**
(e.g., Chrome 120.0, Firefox 115.0, Safari 16.0)

**Operating System:**
(e.g., Windows 11, macOS 14.0, Ubuntu 22.04)

**Bug Description:**
A clear description of what the bug is.

**Steps to Reproduce:**
1. Go to '...'
2. Click on '...'
3. See error

**Expected Behavior:**
What you expected to happen.

**Actual Behavior:**
What actually happened.

**Console Errors:**
(Open F12 > Console tab and paste any error messages)

**Screenshots:**
(If applicable, drag and drop images here)

**Priority:** Low/Medium/High/Critical`;

  const featureTemplate = `**✨ Feature Request**

**Feature Summary:**
Brief description of the feature you'd like to see.

**Problem or Use Case:**
What problem does this solve? As a [type of user], I want [goal] so that [benefit].

**Proposed Solution:**
How should this feature work?

**Feature Category:**
- [ ] AI Form Generation
- [ ] Form Builder/Editor
- [ ] User Interface/Design
- [ ] Data Management
- [ ] Export/Import
- [ ] Mobile Experience
- [ ] Performance
- [ ] Integration
- [ ] Other

**User Type:**
Who would benefit from this feature?

**Priority:** Low/Medium/High

**Additional Context:**
Any other information about the feature.`;

  const questionTemplate = `**❓ Question or Support**

**Question Category:**
- [ ] Getting Started
- [ ] AI Form Generation
- [ ] Form Builder Usage
- [ ] Technical Implementation
- [ ] Best Practices
- [ ] Other

**Your Question:**
What would you like to know?

**Context:**
- What are you trying to accomplish?
- What have you already tried?
- Any relevant details about your setup

**Urgency:** 
(e.g., Blocking my work, Nice to know, Planning ahead)`;

  const tabs = [
    { id: 'bug', label: 'Bug Report', icon: BugAntIcon, template: bugTemplate },
    { id: 'feature', label: 'Feature Request', icon: SparklesIcon, template: featureTemplate },
    { id: 'question', label: 'Question', icon: QuestionMarkCircleIcon, template: questionTemplate }
  ];

  const activeTemplate = tabs.find(tab => tab.id === activeTab);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">Report an Issue</h2>
              <p className="text-blue-100 mt-1">Help us improve InspectPro by reporting bugs or suggesting features</p>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:text-gray-200 transition-colors"
            >
              <XMarkIcon className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row h-full">
          {/* Tabs */}
          <div className="lg:w-1/3 bg-gray-50 border-r border-gray-200">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Issue Type</h3>
              <div className="space-y-2">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id as any)}
                      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                        activeTab === tab.id
                          ? 'bg-blue-100 text-blue-700 border border-blue-200'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <Icon className="w-5 h-5 flex-shrink-0" />
                      <span className="font-medium">{tab.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Tips */}
              <div className="mt-6 bg-white rounded-lg p-4 border border-gray-200">
                <h4 className="font-medium text-gray-900 mb-2">💡 Tips for Better Reports</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Be specific and detailed</li>
                  <li>• Include screenshots when helpful</li>
                  <li>• Test in different browsers</li>
                  <li>• Check console for errors (F12)</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Template Content */}
          <div className="lg:w-2/3 p-6 overflow-y-auto">
            {activeTemplate && (
              <div className="space-y-6">
                <div className="flex items-center space-x-3">
                  <activeTemplate.icon className="w-6 h-6 text-gray-600" />
                  <h3 className="text-xl font-semibold text-gray-900">{activeTemplate.label}</h3>
                </div>

                {/* Instructions */}
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    <ExclamationTriangleIcon className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium text-yellow-800">How to Report</h4>
                      <p className="text-sm text-yellow-700 mt-1">
                        {activeTab === 'bug' && "Copy the template below, fill it out completely, and create a new issue on our GitHub repository."}
                        {activeTab === 'feature' && "Use this template to clearly describe your feature request with context and use cases."}
                        {activeTab === 'question' && "Use this template for questions about using InspectPro or getting support."}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Template */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium text-gray-900">Template</h4>
                    <button
                      onClick={() => handleCopy(activeTemplate.template, activeTab)}
                      className="flex items-center space-x-2 px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm"
                    >
                      <DocumentDuplicateIcon className="w-4 h-4" />
                      <span>{copied === activeTab ? 'Copied!' : 'Copy Template'}</span>
                    </button>
                  </div>

                  <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                    <pre className="text-green-400 text-sm font-mono whitespace-pre-wrap">
                      {activeTemplate.template}
                    </pre>
                  </div>
                </div>

                {/* Action Steps */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="font-medium text-blue-800 mb-2">Next Steps</h4>
                  <ol className="text-sm text-blue-700 space-y-1">
                    <li>1. Copy the template above</li>
                    <li>2. Go to the GitHub repository</li>
                    <li>3. Click "Issues" → "New Issue"</li>
                    <li>4. Paste the template and fill it out</li>
                    <li>5. Submit your issue</li>
                  </ol>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
                  <button
                    onClick={onClose}
                    className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      handleCopy(activeTemplate.template, activeTab);
                      // You can add logic here to open GitHub in a new tab
                      window.open('https://github.com', '_blank');
                    }}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Copy & Go to GitHub
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default IssueReportModal;