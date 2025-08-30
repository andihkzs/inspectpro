# Contributing to InspectPro

Thank you for your interest in contributing to InspectPro! This guide will help you get started.

## 🚀 Getting Started

### Prerequisites
- Node.js 18 or higher
- npm or yarn
- Git
- Modern code editor (VS Code recommended)

### Development Setup

1. **Fork and Clone**
   ```bash
   git clone https://github.com/andihkzs/inspectpro.git
   cd inspectpro
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Set Up Environment** (Optional)
   ```bash
   cp .env.example .env
   # Add your Supabase credentials if testing database features
   ```

4. **Start Development Server**
   ```bash
   npm run dev
   ```

## 📝 Code Standards

### File Organization
- Each file must have a header comment describing its purpose
- Follow the existing folder structure:
  - `src/components/` - Reusable UI components
  - `src/pages/` - Page-level components
  - `src/services/` - Business logic and API calls
  - `src/hooks/` - Custom React hooks
  - `src/types/` - TypeScript type definitions

### Code Style
- Use TypeScript for all new code
- Follow the existing naming conventions
- Use environment variables for configuration
- Keep functions focused and small
- Add error handling for external calls

### Component Guidelines
- Use functional components with hooks
- Extract reusable logic into custom hooks
- Follow the single responsibility principle
- Add proper TypeScript types
- Use meaningful prop names

## 🧪 Testing

Currently using localStorage for data persistence. When adding tests:
- Test both happy path and error scenarios
- Mock external dependencies
- Test responsive design breakpoints
- Verify accessibility compliance

## 🔄 Pull Request Process

1. **Create Feature Branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make Changes**
   - Follow code standards above
   - Add header comments to new files
   - Test your changes thoroughly

3. **Commit Changes**
   ```bash
   git add .
   git commit -m "feat: add your feature description"
   ```

4. **Push and Create PR**
   ```bash
   git push origin feature/your-feature-name
   ```

5. **Pull Request Checklist**
   - [ ] Code follows style guidelines
   - [ ] Added header comments to new files
   - [ ] Tested changes in multiple browsers
   - [ ] Updated documentation if needed
   - [ ] No console errors or warnings

## 🐛 Reporting Issues

### Bug Reports
Include the following information:
- Browser and version
- Operating system
- Steps to reproduce
- Expected vs actual behavior
- Screenshots or screen recordings
- Console errors (F12 Developer Tools)

### Feature Requests
- Clearly describe the feature
- Explain the use case and benefits
- Provide mockups or examples if applicable
- Consider implementation complexity

## 🎯 Areas for Contribution

### High Priority
- Mobile responsiveness improvements
- Accessibility enhancements
- Performance optimizations
- Additional field validation rules

### Medium Priority
- New field types
- Export/import functionality
- Form templates for new industries
- UI/UX improvements

### Nice to Have
- Internationalization (i18n)
- Dark mode support
- Advanced AI capabilities
- Integration with external services

## 📚 Learning Resources

### Project-Specific
- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Supabase Docs](https://supabase.com/docs)

### Design Patterns
- [React Patterns](https://reactpatterns.com)
- [TypeScript Best Practices](https://typescript-eslint.io/rules)
- [Accessibility Guidelines](https://www.w3.org/WAI/WCAG21/quickref)

## 🏆 Recognition

Contributors will be recognized in:
- README.md contributors section
- Release notes for major contributions
- Project documentation

## 📞 Getting Help

- 💬 Discord: [Join our community](https://discord.gg/inspectpro)
- 📧 Email: contributors@inspectpro.dev
- 📋 GitHub Issues: For technical questions

## 📜 License

By contributing to InspectPro, you agree that your contributions will be licensed under the MIT License.