/**
 * Help page component displaying documentation and guides
 * Provides access to all help resources and troubleshooting information
 */

import React, { useState } from 'react';
import { 
  BookOpenIcon, 
  SparklesIcon,
  WrenchScrewdriverIcon,
  CodeBracketIcon,
  RocketLaunchIcon,
  MagnifyingGlassIcon,
  ChevronRightIcon,
  DocumentTextIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline';

const Help: React.FC = () => {
  const [activeSection, setActiveSection] = useState('getting-started');
  const [searchTerm, setSearchTerm] = useState('');
  const [showIssueForm, setShowIssueForm] = useState(false);
  const [issueForm, setIssueForm] = useState({
    type: 'bug',
    title: '',
    description: '',
    browser: '',
    os: '',
    steps: '',
    expected: '',
    actual: '',
    priority: 'medium'
  });

  const sections = [
    {
      id: 'getting-started',
      title: 'Getting Started',
      icon: RocketLaunchIcon,
      description: 'Learn the basics of creating your first inspection form',
      content: `
# Getting Started with InspectPro

Welcome to InspectPro! This guide will help you create your first inspection form quickly and efficiently.

## 🎯 What You Can Do
- **Create Forms**: Use AI to generate forms from natural language descriptions
- **Manage Forms**: Organize, edit, and publish your inspection forms
- **Collect Data**: Deploy forms for field inspections

## 🚀 Your First Form

### Using AI Generation (Recommended)
1. Click the purple "AI Form Generator" button
2. Describe your inspection: "Create inspection form for 2-bedroom apartment cleaning"
3. Review the generated template
4. Click "Use This Template"
5. Customize further in the form builder

### Example Prompts
- "Restaurant safety inspection checklist"
- "Construction site safety inspection"
- "Vehicle maintenance inspection"

## 📝 Field Types
- **Text Input**: Names, addresses, short answers
- **Text Area**: Comments, detailed descriptions
- **Dropdown**: Single choice from options
- **Checkboxes**: Multiple selections
- **Rating**: Star ratings for quality
- **Photo/Video**: Visual evidence
- **Signature**: Digital approvals

## 💡 Pro Tips
- Be specific in AI prompts
- Use clear field labels
- Group related fields into sections
- Test forms before publishing
      `
    },
    {
      id: 'ai-generator',
      title: 'AI Generator',
      icon: SparklesIcon,
      description: 'Master the AI-powered form generation features',
      content: `
# AI Form Generator Guide

The AI Generator creates comprehensive inspection forms using natural language descriptions.

## 🤖 How It Works
The AI understands your requirements and automatically creates structured forms with appropriate sections and fields.

## 🎯 Understanding AI Confidence Scores

Every AI-generated template includes a confidence score that indicates how well the AI understood your request and how suitable the generated form is for your needs.

### Confidence Score Ranges:
- **90-100%** (🟢 High Confidence)
  - Template should work excellently for your needs
  - All sections and fields are highly relevant
  - Minimal customization required
  
- **70-89%** (🟡 Good Confidence) 
  - Template is generally good but may need minor tweaks
  - Most sections are relevant with some adjustments needed
  - Review fields and modify as needed

- **Below 70%** (🔴 Lower Confidence)
  - Template provides a starting point but needs review
  - May include irrelevant sections or miss important ones
  - Use as a foundation and customize extensively

### What Affects Confidence:
- **Specificity**: "Restaurant kitchen safety inspection" vs "inspection form"
- **Industry Recognition**: Known industries like "property management" score higher
- **Clear Requirements**: Detailed descriptions produce better results
- **Standard Use Cases**: Common inspection types have higher confidence

### Using Confidence Scores:
- **High confidence**: Start with the template and make minor adjustments
- **Medium confidence**: Review each section carefully before publishing
- **Low confidence**: Use as inspiration but build your own structure

## ✅ Good Prompts
- "Create inspection form for 2-bedroom apartment cleaning"
- "Restaurant health and safety inspection checklist"
- "Construction site safety inspection with OSHA compliance"

## ❌ Poor Prompts
- "Make a form"
- "Inspection stuff"
- "Something for work"

## 🔄 Iterative Refinement
Start with a basic prompt, then refine:
1. "Create restaurant kitchen inspection"
2. "Add staff hygiene section"
3. "Include photo requirements"

## 📚 Pre-built Templates
- Property Management: Apartment cleaning, maintenance
- Food Service: Restaurant inspections, kitchen safety
- Construction: Site safety, equipment checks
- Healthcare: Facility inspections, equipment maintenance

## 💡 Advanced Tips
- Include industry context
- Mention specific requirements
- Specify compliance needs
- Use action words for modifications
      `
    },
    {
      id: 'form-builder',
      title: 'Form Builder',
      icon: WrenchScrewdriverIcon,
      description: 'Learn to use the visual form building interface',
      content: `
# Form Builder Guide

The Form Builder provides complete control over your inspection forms with a visual interface.

## 🏗 Form Structure
\`\`\`
Form
├── Header (Title, Description, Settings)
├── Section 1
│   ├── Field 1
│   ├── Field 2
│   └── Field 3
└── Section 2
    ├── Field 4
    └── Field 5
\`\`\`

## 📝 Building Process
1. **Form Header**: Enter title and description
2. **Form Settings**: Configure location, signature, offline options
3. **Add Sections**: Organize related fields
4. **Add Fields**: Choose from 9 field types
5. **Configure Fields**: Set labels, options, validation

## 🔧 Field Configuration
- **Label**: Clear, descriptive field names
- **Required**: Mark critical fields as mandatory
- **Validation**: Set rules for data quality
- **Options**: Provide choices for selection fields

## 🎨 Best Practices
- Use logical section flow
- Keep sections focused (5-10 fields max)
- Provide helpful placeholder text
- Test forms before publishing

## 💾 Save Options
- **Save Draft**: Work in progress, not live
- **Publish Form**: Make available for field use
- **Version Control**: Track changes automatically
      `
    },
    {
      id: 'field-types',
      title: 'Field Types',
      icon: DocumentTextIcon,
      description: 'Complete reference for all available field types',
      content: `
# Field Types Reference

## 📝 Text Fields

### Text Input
- **Use for**: Names, addresses, short answers
- **Example**: "Inspector Name", "Property Address"

### Text Area
- **Use for**: Comments, detailed descriptions
- **Example**: "Additional Comments", "Repair Notes"

## 🎯 Selection Fields

### Dropdown
- **Use for**: Single choice from many options
- **Example**: Property Type (Apartment, House, Condo)

### Radio Buttons
- **Use for**: Single choice, all options visible
- **Example**: Overall Condition (Excellent, Good, Fair, Poor)

### Checkboxes
- **Use for**: Multiple selections allowed
- **Example**: Areas Cleaned (Kitchen, Bathroom, Living Room)

## ⭐ Assessment Fields

### Rating
- **Use for**: Quality assessments, satisfaction scores
- **Scale**: 1-5 stars standard
- **Example**: Cleanliness Rating, Equipment Condition

## 📷 Media Fields

### Photo
- **Use for**: Visual evidence, before/after images
- **Best Practice**: Take clear, well-lit photos

### Video
- **Use for**: Process demonstrations, detailed explanations
- **Tip**: Keep videos short and focused (30-60 seconds)

## ✍️ Authentication Fields

### Digital Signature
- **Use for**: Inspector signatures, client approvals
- **Legal**: Digital signatures have legal standing
      `
    },
    {
      id: 'troubleshooting',
      title: 'Troubleshooting',
      icon: ExclamationTriangleIcon,
      description: 'Solutions for common problems and issues',
      content: `
# Troubleshooting Guide

## 🚨 Common Issues

### AI Generator Not Working
**Symptoms**: Generator doesn't respond, infinite loading
**Solutions**:
1. Check browser console for errors (F12)
2. Try shorter, simpler descriptions
3. Clear browser cache (Ctrl+F5)
4. Test with simple prompts

### Forms Not Saving
**Symptoms**: Changes disappear, form resets
**Solutions**:
1. Ensure form has title
2. Check localStorage is enabled
3. Save frequently with "Save Draft"
4. Try incognito mode

### Fields Not Appearing
**Symptoms**: Sections won't expand, fields missing
**Solutions**:
1. Use "Expand All" button
2. Refresh the page
3. Try different browser
4. Check for JavaScript errors

### Performance Issues
**Symptoms**: Slow loading, unresponsive interface
**Solutions**:
1. Close other browser tabs
2. Clear browser cache
3. Reduce form complexity
4. Try different device

## 🔧 Browser Requirements
- **Minimum**: Chrome 90+, Firefox 88+, Safari 14+
- **Recommended**: Latest Chrome or Firefox
- **RAM**: 4GB minimum, 8GB recommended
- **Storage**: 100MB free space

## 📞 Getting Help
Include this information when reporting issues:
- Browser name and version
- Operating system
- Steps to reproduce
- Error messages from console (F12)
      `
    },
    {
      id: 'api-reference',
      title: 'API Reference',
      icon: CodeBracketIcon,
      description: 'Technical documentation for developers',
      content: `
# API Reference

## 📊 Core Data Models

### InspectionForm
\`\`\`typescript
interface InspectionForm {
  id: string;
  title: string;
  description?: string;
  industry: string;
  sections: FormSection[];
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
  version: number;
  isTemplate: boolean;
  isPublished: boolean;
  settings: FormSettings;
}
\`\`\`

### FormField
\`\`\`typescript
interface FormField {
  id: string;
  type: 'text' | 'textarea' | 'select' | 'checkbox' | 'radio' | 'rating' | 'photo' | 'video' | 'signature';
  label: string;
  placeholder?: string;
  required: boolean;
  options?: string[];
  validation?: ValidationRules;
}
\`\`\`

## 🛠 Service APIs

### AITemplateService
\`\`\`typescript
// Generate new template
const template = await aiTemplateService.generateTemplate(
  'Create inspection form for restaurant kitchen'
);

// Modify existing template
const updated = await aiTemplateService.modifyTemplate(
  template, 
  'Add safety compliance section'
);
\`\`\`

### useFormBuilder Hook
\`\`\`typescript
const {
  form,
  addSection,
  addField,
  updateField,
  publishForm
} = useFormBuilder();
\`\`\`

## 💾 Storage
Currently uses localStorage, expandable to Supabase:

\`\`\`typescript
// Save forms
localStorage.setItem('inspectionForms', JSON.stringify(forms));

// Load forms
const forms = JSON.parse(localStorage.getItem('inspectionForms') || '[]');
\`\`\`

## 🔌 Extension Points
- Custom field types
- Industry-specific templates
- Event system hooks
- External integrations
      `
    }
  ];

  const handleIssueSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    let issueBody = '';
    let issueTitle = '';
    let labels = '';

    if (issueForm.type === 'bug') {
      issueTitle = `[Bug]: ${issueForm.title}`;
      labels = 'bug,needs-triage';
      issueBody = `## Bug Description
${issueForm.description}

## Browser & Version
${issueForm.browser}

## Operating System
${issueForm.os}

## Steps to Reproduce
${issueForm.steps}

## Expected Behavior
${issueForm.expected}

## Actual Behavior
${issueForm.actual}

## Priority
${issueForm.priority}

---
*This issue was created using InspectPro's help center form*`;
    } else if (issueForm.type === 'feature') {
      issueTitle = `[Feature]: ${issueForm.title}`;
      labels = 'enhancement,needs-review';
      issueBody = `## Feature Summary
${issueForm.description}

## Problem or Use Case
${issueForm.steps}

## Proposed Solution
${issueForm.expected}

## Priority
${issueForm.priority}

---
*This feature request was created using InspectPro's help center form*`;
    } else {
      issueTitle = `[Question]: ${issueForm.title}`;
      labels = 'question,support';
      issueBody = `## Question
${issueForm.description}

## Context
${issueForm.steps}

## Browser & OS
${issueForm.browser}, ${issueForm.os}

---
*This question was submitted using InspectPro's help center form*`;
    }

    // Create GitHub issue URL with pre-filled data
    const githubUrl = `https://github.com/andihkzs/inspectpro/issues/new?title=${encodeURIComponent(issueTitle)}&body=${encodeURIComponent(issueBody)}&labels=${encodeURIComponent(labels)}`;
    
    // Open GitHub in new tab
    window.open(githubUrl, '_blank');
    
    // Reset form
    setIssueForm({
      type: 'bug',
      title: '',
      description: '',
      browser: '',
      os: '',
      steps: '',
      expected: '',
      actual: '',
      priority: 'medium'
    });
    setShowIssueForm(false);
  };

  const filteredSections = sections.filter(section =>
    section.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    section.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    section.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const activeContent = sections.find(section => section.id === activeSection);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">InspectPro Help Center</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Everything you need to know about creating professional inspection forms with AI-powered tools
          </p>
          
          {/* Search */}
          <div className="max-w-md mx-auto mt-6 relative">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search help topics..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sticky top-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Topics</h3>
              
              {/* Quick Report Issue Button */}
              <div className="mb-4 p-3 bg-gradient-to-r from-red-50 to-pink-50 border border-red-200 rounded-lg">
                <button
                  onClick={() => setShowIssueForm(true)}
                  className="w-full flex items-center space-x-2 px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-medium"
                >
                  <ExclamationTriangleIcon className="w-4 h-4" />
                  <span>Report Issue</span>
                </button>
                <p className="text-xs text-red-600 mt-2 text-center">
                  Submit bugs, feature requests, or ask questions
                </p>
              </div>
              <nav className="space-y-2">
                {filteredSections.map((section) => {
                  const Icon = section.icon;
                  return (
                    <button
                      key={section.id}
                      onClick={() => setActiveSection(section.id)}
                      className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                        activeSection === section.id
                          ? 'bg-blue-100 text-blue-700 border border-blue-200'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <Icon className="w-5 h-5 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-sm">{section.title}</div>
                        <div className="text-xs text-gray-500 truncate">{section.description}</div>
                      </div>
                      {activeSection === section.id && (
                        <ChevronRightIcon className="w-4 h-4" />
                      )}
                    </button>
                  );
                })}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {activeContent && (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
                <div className="flex items-center space-x-3 mb-6">
                  <activeContent.icon className="w-8 h-8 text-blue-600" />
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">{activeContent.title}</h2>
                    <p className="text-gray-600">{activeContent.description}</p>
                  </div>
                  {/* Section-specific Report Issue Button */}
                  <div className="ml-auto">
                    <button
                      onClick={() => setShowIssueForm(true)}
                      className="flex items-center space-x-2 px-3 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors text-sm"
                      title="Report an issue with this topic"
                    >
                      <ExclamationTriangleIcon className="w-4 h-4" />
                      <span>Report Issue</span>
                    </button>
                  </div>
                </div>
                
                <div className="prose prose-blue max-w-none">
                  <div dangerouslySetInnerHTML={{ 
                    __html: activeContent.content
                      .split('\n')
                      .map(line => {
                        // Convert markdown headers
                        if (line.startsWith('### ')) {
                          return `<h3 class="text-xl font-semibold text-gray-900 mt-6 mb-3">${line.slice(4)}</h3>`;
                        }
                        if (line.startsWith('## ')) {
                          return `<h2 class="text-2xl font-semibold text-gray-900 mt-8 mb-4">${line.slice(3)}</h2>`;
                        }
                        if (line.startsWith('# ')) {
                          return `<h1 class="text-3xl font-bold text-gray-900 mt-8 mb-6">${line.slice(2)}</h1>`;
                        }
                        
                        // Convert code blocks
                        if (line.startsWith('```')) {
                          return line === '```' ? '</code></pre>' : '<pre class="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto"><code>';
                        }
                        
                        // Convert inline code
                        const codeRegex = /`([^`]+)`/g;
                        line = line.replace(codeRegex, '<code class="bg-gray-100 text-gray-900 px-2 py-1 rounded text-sm">$1</code>');
                        
                        // Convert bold text
                        const boldRegex = /\*\*([^*]+)\*\*/g;
                        line = line.replace(boldRegex, '<strong class="font-semibold text-gray-900">$1</strong>');
                        
                        // Convert bullet points
                        if (line.startsWith('- ')) {
                          return `<li class="ml-6 list-disc">${line.slice(2)}</li>`;
                        }
                        
                        // Convert numbered lists
                        if (line.match(/^\d+\. /)) {
                          return `<li class="ml-6 list-decimal">${line.slice(line.indexOf('. ') + 2)}</li>`;
                        }
                        
                        // Regular paragraphs
                        if (line.trim() && !line.startsWith('<')) {
                          return `<p class="text-gray-700 mb-4 leading-relaxed">${line}</p>`;
                        }
                        
                        return line;
                      })
                      .join('') 
                  }} />
                </div>

                {/* Inline Help for Current Section */}
                <div className="mt-8 bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <h4 className="font-medium text-gray-900 mb-2">Having trouble with {activeContent.title.toLowerCase()}?</h4>
                  <p className="text-sm text-gray-600 mb-3">
                    Submit a detailed issue report to help us improve InspectPro.
                  </p>
                  <div className="mt-2 p-2 bg-yellow-50 border border-yellow-200 rounded">
                    <p className="text-xs text-yellow-800">
                      <strong>No GitHub account?</strong> It's free to create one at 
                      <a href="https://github.com/signup" target="_blank" rel="noopener noreferrer" className="text-yellow-900 underline ml-1">
                        github.com/signup
                      </a>
                    </p>
                  </div>
                </div>

                {/* Alternative: Copy to Clipboard */}
                <div className="mt-4 p-3 bg-gray-50 rounded-lg border border-gray-200">
                  <h4 className="text-sm font-medium text-gray-900 mb-2">Alternative: Copy Issue Details</h4>
                  <p className="text-xs text-gray-600 mb-3">
                    Don't want to create a GitHub account? Copy the formatted issue details to share via email or other channels.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      let issueText = '';
                      if (issueForm.type === 'bug') {
                        issueText = `BUG REPORT: ${issueForm.title}

Description: ${issueForm.description}
Browser: ${issueForm.browser}
OS: ${issueForm.os}
Steps: ${issueForm.steps}
Expected: ${issueForm.expected}
Actual: ${issueForm.actual}
Priority: ${issueForm.priority}`;
                      } else if (issueForm.type === 'feature') {
                        issueText = `FEATURE REQUEST: ${issueForm.title}

Description: ${issueForm.description}
Use Case: ${issueForm.steps}
Solution: ${issueForm.expected}
Priority: ${issueForm.priority}`;
                      } else {
                        issueText = `QUESTION: ${issueForm.title}

Details: ${issueForm.description}
Context: ${issueForm.steps}
Browser/OS: ${issueForm.browser}, ${issueForm.os}`;
                      }
                      
                      navigator.clipboard.writeText(issueText).then(() => {
                        alert('Issue details copied to clipboard! You can now paste this in an email or message.');
                      }).catch(() => {
                        alert('Could not copy to clipboard. Please manually copy the text after submitting.');
                      });
                    }}
                    className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors text-sm font-medium"
                  >
                    📋 Copy Issue Details
                  </button>
                  <button
                    onClick={() => setShowIssueForm(true)}
                    className="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-medium"
                  >
                    <ExclamationTriangleIcon className="w-4 h-4" />
                    <span>Submit Issue Report</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 text-center bg-blue-50 rounded-lg p-8">
          <BookOpenIcon className="w-12 h-12 text-blue-600 mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-gray-900 mb-2">Still Need Help?</h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Can't find what you're looking for? Submit an issue report and we'll help you directly on GitHub.
          </p>
          <button 
            onClick={() => setShowIssueForm(true)}
            className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
          >
            🐛 Submit Issue Report
          </button>
        </div>

        {/* GitHub Issue Form Modal */}
        {showIssueForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-gray-900">Submit Issue Report</h3>
                  <button
                    onClick={() => setShowIssueForm(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    ×
                  </button>
                </div>

                <form onSubmit={handleIssueSubmit} className="space-y-6">
                  {/* Issue Type */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Issue Type
                    </label>
                    <select
                      value={issueForm.type}
                      onChange={(e) => setIssueForm({...issueForm, type: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    >
                      <option value="bug">🐛 Bug Report</option>
                      <option value="feature">✨ Feature Request</option>
                      <option value="question">❓ Question / Support</option>
                    </select>
                  </div>

                  {/* Title */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {issueForm.type === 'bug' ? 'Bug Summary' : 
                       issueForm.type === 'feature' ? 'Feature Title' : 'Question Title'}
                    </label>
                    <input
                      type="text"
                      value={issueForm.title}
                      onChange={(e) => setIssueForm({...issueForm, title: e.target.value})}
                      placeholder={
                        issueForm.type === 'bug' ? 'Brief description of the bug' :
                        issueForm.type === 'feature' ? 'Brief description of the feature' :
                        'What do you need help with?'
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>

                  {/* Description */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {issueForm.type === 'bug' ? 'Detailed Description' : 
                       issueForm.type === 'feature' ? 'Feature Description' : 'Question Details'}
                    </label>
                    <textarea
                      value={issueForm.description}
                      onChange={(e) => setIssueForm({...issueForm, description: e.target.value})}
                      placeholder={
                        issueForm.type === 'bug' ? 'Describe what happened and what you expected to happen' :
                        issueForm.type === 'feature' ? 'Describe the feature and how it would help you' :
                        'Please provide details about your question'
                      }
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>

                  {/* Browser & OS */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Browser & Version
                      </label>
                      <input
                        type="text"
                        value={issueForm.browser}
                        onChange={(e) => setIssueForm({...issueForm, browser: e.target.value})}
                        placeholder="e.g., Chrome 120.0, Firefox 115.0"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Operating System
                      </label>
                      <input
                        type="text"
                        value={issueForm.os}
                        onChange={(e) => setIssueForm({...issueForm, os: e.target.value})}
                        placeholder="e.g., Windows 11, macOS 14.0"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      />
                    </div>
                  </div>

                  {/* Dynamic fields based on issue type */}
                  {issueForm.type === 'bug' && (
                    <>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Steps to Reproduce
                        </label>
                        <textarea
                          value={issueForm.steps}
                          onChange={(e) => setIssueForm({...issueForm, steps: e.target.value})}
                          placeholder="1. Go to '...'&#10;2. Click on '...'&#10;3. See error"
                          rows={3}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Expected Behavior
                        </label>
                        <textarea
                          value={issueForm.expected}
                          onChange={(e) => setIssueForm({...issueForm, expected: e.target.value})}
                          placeholder="What should have happened?"
                          rows={2}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Actual Behavior
                        </label>
                        <textarea
                          value={issueForm.actual}
                          onChange={(e) => setIssueForm({...issueForm, actual: e.target.value})}
                          placeholder="What actually happened?"
                          rows={2}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          required
                        />
                      </div>
                    </>
                  )}

                  {issueForm.type === 'feature' && (
                    <>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Problem or Use Case
                        </label>
                        <textarea
                          value={issueForm.steps}
                          onChange={(e) => setIssueForm({...issueForm, steps: e.target.value})}
                          placeholder="What problem does this feature solve? How would you use it?"
                          rows={3}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Proposed Solution
                        </label>
                        <textarea
                          value={issueForm.expected}
                          onChange={(e) => setIssueForm({...issueForm, expected: e.target.value})}
                          placeholder="How should this feature work?"
                          rows={3}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          required
                        />
                      </div>
                    </>
                  )}

                  {issueForm.type === 'question' && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Additional Context
                      </label>
                      <textarea
                        value={issueForm.steps}
                        onChange={(e) => setIssueForm({...issueForm, steps: e.target.value})}
                        placeholder="What have you tried? What's your specific situation?"
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      />
                    </div>
                  )}

                  {/* Priority */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Priority
                    </label>
                    <select
                      value={issueForm.priority}
                      onChange={(e) => setIssueForm({...issueForm, priority: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="low">Low - Minor issue or nice to have</option>
                      <option value="medium">Medium - Affects functionality</option>
                      <option value="high">High - Major problem</option>
                      <option value="critical">Critical - App unusable</option>
                    </select>
                  </div>

                  {/* Submit Buttons */}
                  <div className="flex items-center justify-end space-x-3 pt-4 border-t border-gray-200">
                    <button
                      type="button"
                      onClick={() => setShowIssueForm(false)}
                      className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
                    >
                      Create GitHub Issue
                    </button>
                  </div>

                  <div className="mt-3 p-3 bg-blue-50 rounded-lg">
                    <p className="text-sm text-blue-800">
                      <strong>How it works:</strong> This form will open GitHub in a new tab with your issue pre-filled. 
                      You'll need a GitHub account to submit the issue.
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Help;