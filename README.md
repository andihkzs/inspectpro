# 🔍 InspectPro - AI-Powered Inspection Form Builder

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Build Status](https://img.shields.io/badge/build-passing-brightgreen.svg)](https://github.com/yourusername/inspectpro)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-20232A?logo=react&logoColor=61DAFB)](https://reactjs.org/)

> Professional inspection form builder with AI-powered template generation for property management, construction, food service, and more.

[**🚀 Live Demo**](https://inspection-form-buil-ulq6.bolt.host) | [**📖 Documentation**](https://inspection-form-buil-ulq6.bolt.host/help) | [**🐛 Report Issues**](https://github.com/yourusername/inspectpro/issues)

## ✨ Features

### 🤖 AI-Powered Form Generation
- **Natural Language Processing**: Describe your inspection needs in plain English
- **Smart Templates**: AI generates comprehensive forms with appropriate sections and fields
- **Confidence Scoring**: Get feedback on how well the AI understood your requirements
- **Iterative Refinement**: Modify and enhance generated forms through conversation

### 🛠️ Visual Form Builder
- **Drag & Drop Interface**: Intuitive form building with visual feedback
- **9 Field Types**: Text, textarea, dropdown, radio, checkbox, rating, photo, video, signature
- **Section Management**: Organize forms into logical sections with expand/collapse
- **Real-time Preview**: See exactly how your form will look to users

### 📊 Data Management
- **Dual Storage**: Supabase cloud database with localStorage fallback
- **Version Control**: Track form changes and revisions automatically
- **Draft/Publish**: Work on forms privately then publish when ready
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile

### 🏭 Industry Templates
- **Property Management**: Apartment cleaning, maintenance inspections
- **Food Service**: Restaurant health and safety audits
- **Construction**: Site safety, equipment checks
- **General**: Customizable templates for any industry

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm
- Modern web browser (Chrome 90+, Firefox 88+, Safari 14+)

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/inspectpro.git
cd inspectpro

# Install dependencies
npm install

# Start development server
npm run dev
```

### Optional: Database Setup

For permanent storage and collaboration features:

1. Create a [Supabase](https://supabase.com) account
2. Create a new project
3. Copy your project URL and anon key
4. Set environment variables:

```bash
# Create .env file
VITE_SUPABASE_URL=your-project-url
VITE_SUPABASE_ANON_KEY=your-anon-key
```

The app works perfectly with localStorage if you prefer local-only storage.

## 🎯 Usage Examples

### Creating Your First Form

1. **Using AI Generator**:
   ```
   "Create inspection form for 2-bedroom apartment cleaning"
   ```

2. **Manual Builder**:
   - Click "Create New Form"
   - Add sections and fields visually
   - Configure field types and validation

### AI Prompt Examples

| Industry | Example Prompt |
|----------|----------------|
| Property | "Create move-out inspection for rental property" |
| Restaurant | "Restaurant kitchen safety inspection with HACCP compliance" |
| Construction | "Daily construction site safety checklist" |
| Automotive | "Vehicle maintenance inspection report" |

## 🏗️ Tech Stack

### Frontend
- **React 18** - Component library
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling framework
- **React Router** - Client-side routing
- **React Hook Form** - Form management
- **Lucide React** - Icon library

### Backend & Data
- **Supabase** - Database and authentication
- **localStorage** - Local storage fallback
- **Row Level Security** - Data protection

### Build & Deploy
- **Vite** - Build tool and dev server
- **ESLint** - Code linting
- **PostCSS** - CSS processing

## 📁 Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── Forms/           # Form-related components
│   │   ├── FormBuilder.tsx
│   │   ├── AIGeneratorSidebar.tsx
│   │   └── FormList.tsx
│   └── Layout/          # Layout components
│       └── Navigation.tsx
├── pages/               # Page components
│   ├── Dashboard.tsx
│   ├── CreateForm.tsx
│   ├── EditForm.tsx
│   └── Help.tsx
├── services/            # Business logic
│   ├── formService.ts
│   └── aiTemplateService.ts
├── hooks/               # Custom React hooks
│   └── useFormBuilder.ts
├── types/               # TypeScript definitions
│   ├── index.ts
│   └── database.ts
└── lib/                 # Utilities
    └── supabase.ts
```

## 🔧 Configuration

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `VITE_SUPABASE_URL` | Supabase project URL | No* |
| `VITE_SUPABASE_ANON_KEY` | Supabase anonymous key | No* |

*Falls back to localStorage if not provided

### Form Settings

Each form supports these configuration options:

- **Allow Offline Use**: Forms work without internet connection
- **Require Location**: GPS coordinates for inspections
- **Require Signature**: Digital signature validation
- **Auto Save**: Automatic draft saving

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### Development Workflow

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Add tests if applicable
5. Commit your changes (`git commit -m 'Add amazing feature'`)
6. Push to the branch (`git push origin feature/amazing-feature`)
7. Open a Pull Request

### Code Standards

- Use TypeScript for all new code
- Follow the existing file organization pattern
- Add header comments to new files
- Use environment variables for configuration
- Write clean, readable code with proper error handling

## 🐛 Bug Reports

Found a bug? Please [create an issue](https://github.com/yourusername/inspectpro/issues) with:

- Browser and version
- Steps to reproduce
- Expected vs actual behavior
- Screenshots if applicable
- Console errors (if any)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Supabase](https://supabase.com) for the excellent backend platform
- [Tailwind CSS](https://tailwindcss.com) for the utility-first CSS framework
- [Lucide](https://lucide.dev) for the beautiful icon set
- [Vite](https://vitejs.dev) for the lightning-fast build tool

## 📈 Roadmap

- [ ] Advanced AI form modifications
- [ ] Multi-language support
- [ ] Form analytics and reporting
- [ ] Team collaboration features
- [ ] Mobile app for field inspections
- [ ] Integration with popular inspection platforms
- [ ] Custom branding options
- [ ] Advanced field validation rules

## 💬 Support

- 📧 Email: support@inspectpro.dev
- 💬 Discord: [Join our community](https://discord.gg/inspectpro)
- 📚 Documentation: [Help Center](https://inspection-form-buil-ulq6.bolt.host/help)

---

<div align="center">
  <strong>Built with ❤️ for inspection professionals worldwide</strong>
  <br>
  <a href="https://inspection-form-buil-ulq6.bolt.host">Try InspectPro Now</a>
</div>