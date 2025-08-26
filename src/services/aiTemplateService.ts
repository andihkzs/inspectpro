/**
 * AI Template Service for generating inspection forms from natural language
 * Provides industry-specific form templates and smart field suggestions
 */

import { AITemplate, FormField, FormSection } from '../types';
import { v4 as uuidv4 } from 'uuid';

class AITemplateService {
  private industryTemplates: Record<string, AITemplate> = {};

  constructor() {
    this.initializeTemplates();
  }

  private initializeTemplates() {
    // Apartment cleaning inspection template
    this.industryTemplates['apartment-cleaning'] = {
      id: uuidv4(),
      name: 'Apartment Cleaning Inspection',
      industry: 'property-management',
      description: 'Comprehensive inspection form for apartment cleaning services',
      confidence: 0.95,
      sections: [
        {
          id: uuidv4(),
          title: 'General Information',
          order: 0,
          fields: [
            {
              id: uuidv4(),
              type: 'text',
              label: 'Property Address',
              required: true,
              placeholder: 'Enter full address'
            },
            {
              id: uuidv4(),
              type: 'select',
              label: 'Number of Bedrooms',
              required: true,
              options: ['Studio', '1 Bedroom', '2 Bedrooms', '3 Bedrooms', '4+ Bedrooms']
            },
            {
              id: uuidv4(),
              type: 'select',
              label: 'Number of Bathrooms',
              required: true,
              options: ['1 Bath', '1.5 Baths', '2 Baths', '2.5 Baths', '3+ Baths']
            }
          ]
        },
        {
          id: uuidv4(),
          title: 'Kitchen Inspection',
          order: 1,
          fields: [
            {
              id: uuidv4(),
              type: 'checkbox',
              label: 'Kitchen Areas Cleaned',
              required: true,
              options: ['Countertops', 'Sink', 'Stovetop', 'Oven', 'Refrigerator', 'Dishwasher', 'Cabinets', 'Floor']
            },
            {
              id: uuidv4(),
              type: 'rating',
              label: 'Overall Kitchen Cleanliness',
              required: true,
              validation: { min: 1, max: 5 }
            },
            {
              id: uuidv4(),
              type: 'photo',
              label: 'Kitchen Photos',
              required: false
            }
          ]
        },
        {
          id: uuidv4(),
          title: 'Living Areas',
          order: 2,
          fields: [
            {
              id: uuidv4(),
              type: 'checkbox',
              label: 'Living Room Tasks',
              required: true,
              options: ['Vacuumed/Mopped', 'Dusted surfaces', 'Cleaned windows', 'Organized items']
            },
            {
              id: uuidv4(),
              type: 'rating',
              label: 'Living Room Cleanliness',
              required: true,
              validation: { min: 1, max: 5 }
            }
          ]
        },
        {
          id: uuidv4(),
          title: 'Bedrooms',
          order: 3,
          fields: [
            {
              id: uuidv4(),
              type: 'checkbox',
              label: 'Bedroom Cleaning Tasks',
              required: true,
              options: ['Bed made', 'Floors cleaned', 'Dusted surfaces', 'Closet organized']
            },
            {
              id: uuidv4(),
              type: 'rating',
              label: 'Bedroom Cleanliness',
              required: true,
              validation: { min: 1, max: 5 }
            }
          ]
        },
        {
          id: uuidv4(),
          title: 'Bathrooms',
          order: 4,
          fields: [
            {
              id: uuidv4(),
              type: 'checkbox',
              label: 'Bathroom Cleaning Tasks',
              required: true,
              options: ['Toilet cleaned', 'Shower/tub cleaned', 'Sink cleaned', 'Mirror cleaned', 'Floor mopped']
            },
            {
              id: uuidv4(),
              type: 'rating',
              label: 'Bathroom Cleanliness',
              required: true,
              validation: { min: 1, max: 5 }
            }
          ]
        },
        {
          id: uuidv4(),
          title: 'Final Assessment',
          order: 5,
          fields: [
            {
              id: uuidv4(),
              type: 'rating',
              label: 'Overall Satisfaction',
              required: true,
              validation: { min: 1, max: 5 }
            },
            {
              id: uuidv4(),
              type: 'textarea',
              label: 'Additional Notes',
              required: false,
              placeholder: 'Any additional comments or concerns'
            },
            {
              id: uuidv4(),
              type: 'signature',
              label: 'Inspector Signature',
              required: true
            }
          ]
        }
      ],
      suggestedFields: []
    };

    // Restaurant inspection template
    this.industryTemplates['restaurant'] = {
      id: uuidv4(),
      name: 'Restaurant Health Inspection',
      industry: 'food-service',
      description: 'Health and safety inspection form for restaurants',
      confidence: 0.92,
      sections: [
        {
          id: uuidv4(),
          title: 'Basic Information',
          order: 0,
          fields: [
            {
              id: uuidv4(),
              type: 'text',
              label: 'Restaurant Name',
              required: true
            },
            {
              id: uuidv4(),
              type: 'text',
              label: 'License Number',
              required: true
            },
            {
              id: uuidv4(),
              type: 'select',
              label: 'Restaurant Type',
              required: true,
              options: ['Fast Food', 'Casual Dining', 'Fine Dining', 'Cafe', 'Bar/Grill']
            }
          ]
        },
        {
          id: uuidv4(),
          title: 'Food Safety',
          order: 1,
          fields: [
            {
              id: uuidv4(),
              type: 'checkbox',
              label: 'Food Temperature Control',
              required: true,
              options: ['Proper refrigeration', 'Hot food holding', 'Thermometer available', 'Temperature logs']
            },
            {
              id: uuidv4(),
              type: 'rating',
              label: 'Food Safety Compliance',
              required: true,
              validation: { min: 1, max: 5 }
            }
          ]
        },
        {
          id: uuidv4(),
          title: 'Cleanliness',
          order: 2,
          fields: [
            {
              id: uuidv4(),
              type: 'checkbox',
              label: 'Cleaning Standards',
              required: true,
              options: ['Kitchen surfaces', 'Equipment sanitized', 'Floors clean', 'Hand washing stations']
            },
            {
              id: uuidv4(),
              type: 'photo',
              label: 'Kitchen Photos',
              required: false
            }
          ]
        }
      ],
      suggestedFields: []
    };
  }

  async generateTemplate(description: string, context?: string): Promise<AITemplate> {
    // Input validation
    if (!description || typeof description !== 'string') {
      throw new Error('Invalid description provided');
    }

    const sanitizedDescription = description.trim();
    if (sanitizedDescription.length === 0) {
      throw new Error('Description cannot be empty');
    }

    if (sanitizedDescription.length > 1000) {
      throw new Error('Description too long');
    }

    // Simulate AI processing time with shorter delay
    await new Promise((resolve) => {
      setTimeout(resolve, 1500); // Reduced from 2000ms to 1500ms
    });

    const lowerDescription = sanitizedDescription.toLowerCase();
    const lowerContext = (context || '').toLowerCase();
    
    // Simple keyword matching for demo
    if (lowerDescription.includes('apartment') || lowerDescription.includes('cleaning') || 
        lowerContext.includes('apartment') || lowerContext.includes('cleaning')) {
      return this.industryTemplates['apartment-cleaning'];
    }
    
    if (lowerDescription.includes('restaurant') || lowerDescription.includes('food') ||
        lowerContext.includes('restaurant') || lowerContext.includes('food')) {
      return this.industryTemplates['restaurant'];
    }

    // Generic template for unknown types
    return {
      id: uuidv4(),
      name: 'Custom Inspection Form',
      industry: 'general',
      description: 'AI-generated inspection form based on your requirements',
      confidence: 0.8,
      sections: [
        {
          id: uuidv4(),
          title: 'General Information',
          order: 0,
          fields: [
            {
              id: uuidv4(),
              type: 'text',
              label: 'Location/Property Name',
              required: true
            },
            {
              id: uuidv4(),
              type: 'text',
              label: 'Inspector Name',
              required: true
            },
            {
              id: uuidv4(),
              type: 'text',
              label: 'Inspection Date',
              required: true
            }
          ]
        },
        {
          id: uuidv4(),
          title: 'Inspection Items',
          order: 1,
          fields: [
            {
              id: uuidv4(),
              type: 'rating',
              label: 'Overall Condition',
              required: true,
              validation: { min: 1, max: 5 }
            },
            {
              id: uuidv4(),
              type: 'textarea',
              label: 'Notes',
              required: false,
              placeholder: 'Add any additional notes or observations'
            },
            {
              id: uuidv4(),
              type: 'photo',
              label: 'Supporting Photos',
              required: false
            }
          ]
        }
      ],
      suggestedFields: []
    };
  }

  async modifyTemplate(template: AITemplate, modification: string): Promise<AITemplate> {
    // Input validation
    if (!template || !modification) {
      throw new Error('Invalid template or modification provided');
    }

    // Simulate AI processing
    await new Promise(resolve => setTimeout(resolve, 1000));

    const lowerModification = modification.toLowerCase();
    const updatedTemplate = { ...template };

    // Simple modification logic for demo
    if (lowerModification.includes('add') && lowerModification.includes('safety')) {
      // Add safety section
      const safetySection: FormSection = {
        id: uuidv4(),
        title: 'Safety Assessment',
        order: updatedTemplate.sections.length,
        fields: [
          {
            id: uuidv4(),
            type: 'checkbox',
            label: 'Safety Checks',
            required: true,
            options: ['Emergency exits clear', 'Fire extinguisher present', 'Safety equipment available']
          },
          {
            id: uuidv4(),
            type: 'rating',
            label: 'Overall Safety Rating',
            required: true,
            validation: { min: 1, max: 5 }
          }
        ]
      };
      updatedTemplate.sections.push(safetySection);
    }

    if (lowerModification.includes('add') && lowerModification.includes('bathroom')) {
      // Add bathroom section
      const bathroomSection: FormSection = {
        id: uuidv4(),
        title: 'Bathroom Facilities',
        order: updatedTemplate.sections.length,
        fields: [
          {
            id: uuidv4(),
            type: 'checkbox',
            label: 'Bathroom Cleanliness',
            required: true,
            options: ['Toilets clean', 'Sinks clean', 'Floors mopped', 'Supplies stocked', 'Hand soap available', 'Paper towels available']
          },
          {
            id: uuidv4(),
            type: 'rating',
            label: 'Bathroom Condition',
            required: true,
            validation: { min: 1, max: 5 }
          },
          {
            id: uuidv4(),
            type: 'photo',
            label: 'Bathroom Photos',
            required: false
          }
        ]
      };
      updatedTemplate.sections.push(bathroomSection);
    }

    if (lowerModification.includes('add') && (lowerModification.includes('storage') || lowerModification.includes('utility'))) {
      // Add storage/utility section
      const storageSection: FormSection = {
        id: uuidv4(),
        title: 'Storage & Utility Areas',
        order: updatedTemplate.sections.length,
        fields: [
          {
            id: uuidv4(),
            type: 'checkbox',
            label: 'Storage Area Checks',
            required: true,
            options: ['Well organized', 'Clean floors', 'Proper ventilation', 'No pest signs', 'Adequate lighting']
          },
          {
            id: uuidv4(),
            type: 'rating',
            label: 'Storage Area Rating',
            required: true,
            validation: { min: 1, max: 5 }
          }
        ]
      };
      updatedTemplate.sections.push(storageSection);
    }

    if (lowerModification.includes('add') && lowerModification.includes('dining')) {
      // Add dining area section
      const diningSection: FormSection = {
        id: uuidv4(),
        title: 'Dining Area',
        order: updatedTemplate.sections.length,
        fields: [
          {
            id: uuidv4(),
            type: 'checkbox',
            label: 'Dining Area Checks',
            required: true,
            options: ['Tables clean', 'Chairs in good condition', 'Floor clean', 'Lighting adequate', 'Temperature comfortable']
          },
          {
            id: uuidv4(),
            type: 'rating',
            label: 'Dining Area Rating',
            required: true,
            validation: { min: 1, max: 5 }
          }
        ]
      };
      updatedTemplate.sections.push(diningSection);
    }
    if (lowerModification.includes('add') && lowerModification.includes('photo')) {
      // Add photo field to last section
      if (updatedTemplate.sections.length > 0) {
        const lastSection = updatedTemplate.sections[updatedTemplate.sections.length - 1];
        const photoField: FormField = {
          id: uuidv4(),
          type: 'photo',
          label: 'Additional Photos',
          required: false
        };
        lastSection.fields.push(photoField);
      }
    }

    if (lowerModification.includes('add') && (lowerModification.includes('section') || lowerModification.includes('more'))) {
      // Add a generic additional section
      const additionalSection: FormSection = {
        id: uuidv4(),
        title: 'Additional Inspection Items',
        order: updatedTemplate.sections.length,
        fields: [
          {
            id: uuidv4(),
            type: 'textarea',
            label: 'Additional Notes',
            required: false,
            placeholder: 'Add any additional observations'
          },
          {
            id: uuidv4(),
            type: 'rating',
            label: 'Additional Rating',
            required: false,
            validation: { min: 1, max: 5 }
          }
        ]
      };
      updatedTemplate.sections.push(additionalSection);
    }

    // Update metadata
    updatedTemplate.updatedAt = new Date();
    updatedTemplate.version = (updatedTemplate.version || 1) + 1;
    updatedTemplate.confidence = Math.min(0.95, (updatedTemplate.confidence || 0.8) + 0.05);

    return updatedTemplate;
  }

  getIndustryTemplates(): AITemplate[] {
    return Object.values(this.industryTemplates);
  }
}

export const aiTemplateService = new AITemplateService();