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
  ExclamationTriangleIcon,
  MagnifyingGlassIcon,
  ChevronRightIcon,
  DocumentTextIcon
} from '@heroicons/react/24/outline';
import IssueReportModal from '../components/Forms/IssueReportModal';

const Help: React.FC = () => {
  const [activeSection, setActiveSection] = useState('getting-started');
  const [searchTerm, setSearchTerm] = useState('');
  const [showIssueModal, setShowIssueModal] = useState(false);

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
                  onClick={() => setShowIssueModal(true)}
                  className="w-full flex items-center space-x-2 px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-medium"
                >
                  <ExclamationTriangleIcon className="w-4 h-4" />
                  <span>Report Issue</span>
                </button>
                <p className="text-xs text-red-600 mt-2 text-center">
                  Found a bug or need help? Click here for structured issue templates.
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
                      onClick={() => setShowIssueModal(true)}
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
                  <h4 className="font-medium text-gray-900 mb-2">Still having trouble with {activeContent.title.toLowerCase()}?</h4>
                  <p className="text-sm text-gray-600 mb-3">
                    Use our structured issue templates to get help quickly and effectively.
                  </p>
                  <button
                    onClick={() => setShowIssueModal(true)}
                    className="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-medium"
                  >
                    <ExclamationTriangleIcon className="w-4 h-4" />
                    <span>Open Issue Templates</span>
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
            Can't find what you're looking for? Use our structured issue templates to report bugs, request features, or ask questions.
          </p>
          <div className="flex justify-center space-x-4">
            <button 
              onClick={() => setShowIssueModal(true)}
              className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
            >
              🐛 Report Issue / Get Help
            </button>
          </div>
        </div>
      </div>

      {/* Issue Report Modal */}
      <IssueReportModal 
        isOpen={showIssueModal}
        onClose={() => setShowIssueModal(false)}
      />
    </div>
  );
};

export default Help;