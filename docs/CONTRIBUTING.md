# Contributing to NAUI

Thank you for your interest in contributing to NAUI! This guide will help you get started with development.

## 🚀 Quick Setup

1. **Clone and Install**

```bash
git clone https://github.com/your-org/naui-library.git
cd naui-library
pnpm install
```

2. **Start Development**

```bash
pnpm dev  # Starts Storybook
```

3. **Open Storybook**

```
http://localhost:6006
```

## 📁 Project Structure

```
src/
├── components/        # React components
│   └── ComponentName/
│       ├── ComponentName.tsx      # Component implementation
│       ├── ComponentName.test.tsx # Unit tests
│       ├── ComponentName.stories.tsx # Storybook stories
│       └── index.ts                # Public exports
├── theme/            # Theming system
├── utils/           # Utility functions
└── styles/          # Global styles
e2e/                # Test files
├── ComponentName.spec.ts    # E2E tests
└── ComponentName.visual.ts  # Visual tests
```

## 🧩 Component Development

### 1. Component Guidelines

- Use functional components with hooks
- Follow TypeScript strict mode
- Implement proper ARIA attributes
- Include proper type exports
- Follow TailwindCSS class naming
- Ensure components are tree-shakeable
- Must be keyboard and screen reader accessible

### 2. Required Files

Each component needs:

```
ComponentName/
├── ComponentName.tsx        # Implementation
├── ComponentName.test.tsx   # Unit tests
├── ComponentName.stories.tsx # Storybook stories
└── index.ts                # Public exports
```

### 3. Testing Requirements

Every component must have:

- Unit tests (React Testing Library)
- E2E tests (Playwright)
- Visual tests (Playwright)
- Accessibility tests (axe-core)

## 🧪 Development Workflow

### 1. Creating Components

1. Create component directory and files
2. Implement component with proper types
3. Add unit tests
4. Create Storybook stories
5. Add E2E and visual tests
6. Document props and usage

### 2. Testing Process

```bash
# During development
pnpm dev              # Start Storybook
pnpm test:unit:watch  # Watch unit tests

# Before committing
pnpm check            # Run all checks
pnpm fix              # Fix formatting

# Visual testing
pnpm test:visual              # Check for changes
pnpm test:visual:update       # Update snapshots
```

### 3. Pull Request Process

1. Create feature branch
2. Make changes following guidelines
3. Run all checks: `pnpm check`
4. Update documentation if needed
5. Create PR with:
   - Clear description
   - Screenshots/videos if visual changes
   - Link to related issues

## 🎨 Theme Development

When modifying the theme system:

1. Update types in `src/theme/types.ts`
2. Modify CSS variables in `src/styles/globals.css`
3. Update `ThemeProvider` if needed
4. Add tests for new theme features
5. Document changes in stories

## 📝 Documentation

Keep documentation up to date:

1. Update component stories
2. Modify README if needed
3. Update this guide for process changes
4. Add JSDoc comments to code

## 🚀 Release Process

1. Update version:

```bash
pnpm version <patch|minor|major>
```

2. Build and test:

```bash
pnpm build
pnpm test:all
```

3. Create release PR:

- Update CHANGELOG.md
- Include breaking changes
- List new features
- Document bug fixes

## 🎯 Best Practices

### Accessibility

- WCAG 2.1 AA compliance
- Keyboard navigation
- Screen reader support
- Color contrast (4.5:1 minimum)
- Proper ARIA attributes

### Performance

- Keep bundle size minimal
- Use proper memoization
- Implement tree-shaking
- Monitor bundle size

### Code Style

- Follow ESLint rules
- Use Prettier formatting
- Follow naming conventions
- Write clear comments

Need help? Join our [Discord](your-discord-link) or open an issue!
