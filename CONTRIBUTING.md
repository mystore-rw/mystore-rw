# Contributing to MyStore

Thank you for your interest in contributing to MyStore! This document provides guidelines and information for contributors.

## 🚀 Getting Started

### Prerequisites

Before contributing, ensure you have:
- Read and understood our [Code of Conduct](CODE_OF_CONDUCT.md)
- Set up your [development environment](README.md#-development)
- Familiarized yourself with our [architecture](README.md#-architecture)

### Development Setup

1. **Fork and clone the repository**
   ```bash
   git clone https://github.com/your-username/mystore-rw.git
   cd mystore-rw
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

## 🔄 Development Workflow

### 1. Issue Selection
- Browse [open issues](https://github.com/mystore-rw/mystore-rw/issues)
- Look for issues labeled `good first issue` if you're new
- Comment on the issue to indicate you're working on it

### 2. Making Changes
- Write clean, maintainable code
- Follow existing code conventions
- Add appropriate tests
- Update documentation as needed

### 3. Testing
```bash
# Run all tests
npm run test

# Run specific test types
npm run test:unit
npm run test:integration
npm run test:e2e

# Run with coverage
npm run test:coverage
```

### 4. Code Quality
```bash
# Lint your code
npm run lint

# Format your code
npm run format

# Fix auto-fixable linting issues
npm run lint:fix
```

### 5. Committing Changes
We use [Conventional Commits](https://www.conventionalcommits.org/):

```bash
# Examples of good commit messages
git commit -m "feat: add product search functionality"
git commit -m "fix: resolve checkout payment issue"
git commit -m "docs: update API documentation"
git commit -m "test: add unit tests for user service"
```

### 6. Submitting Pull Request
- Push your branch to your fork
- Create a pull request with a clear title and description
- Link any related issues
- Ensure all checks pass

## 📝 Code Style Guidelines

### JavaScript/TypeScript
- Use ES6+ features where appropriate
- Prefer `const` and `let` over `var`
- Use meaningful variable and function names
- Add JSDoc comments for public APIs
- Maximum line length: 100 characters

### File Organization
```
src/
├── components/     # Reusable UI components
├── pages/         # Next.js pages
├── services/      # Business logic
├── utils/         # Helper functions
├── types/         # TypeScript type definitions
└── __tests__/     # Test files
```

### Naming Conventions
- **Files**: kebab-case (`user-service.js`)
- **Directories**: kebab-case (`order-management/`)
- **Components**: PascalCase (`ProductCard.tsx`)
- **Functions**: camelCase (`getUserById()`)
- **Constants**: UPPER_SNAKE_CASE (`API_BASE_URL`)

## 🧪 Testing Guidelines

### Test Structure
- Write tests for all new functionality
- Aim for >80% code coverage
- Use descriptive test names
- Group related tests using `describe` blocks

### Test Examples
```javascript
// Unit test example
describe('UserService', () => {
  describe('getUserById', () => {
    it('should return user when valid id is provided', async () => {
      // Test implementation
    });

    it('should throw error when user not found', async () => {
      // Test implementation
    });
  });
});
```

### Integration Tests
- Test API endpoints with real database
- Use test fixtures for consistent data
- Clean up after each test

### E2E Tests
- Focus on critical user journeys
- Use Page Object Model pattern
- Test across different browsers/devices

## 📖 Documentation

### Code Documentation
- Add JSDoc comments for public functions
- Include parameter types and return values
- Provide usage examples for complex functions

### README Updates
- Update README.md when adding new features
- Include configuration changes
- Update installation instructions if needed

### API Documentation
- Document all API endpoints
- Include request/response examples
- Update OpenAPI/Swagger specifications

## 🐛 Bug Reports

### Before Reporting
1. Check existing issues for duplicates
2. Test with the latest version
3. Reproduce with minimal example

### Bug Report Template
- **Description**: Clear description of the issue
- **Steps to Reproduce**: Detailed steps
- **Expected Behavior**: What should happen
- **Actual Behavior**: What actually happens
- **Environment**: OS, browser, Node.js version
- **Additional Context**: Screenshots, logs, etc.

## 💡 Feature Requests

### Before Requesting
1. Check existing issues and discussions
2. Consider if it fits project scope
3. Think about implementation complexity

### Feature Request Template
- **Problem**: What problem does this solve?
- **Solution**: Proposed solution
- **Alternatives**: Alternative approaches considered
- **Additional Context**: Use cases, examples

## 🏷️ Issue Labels

- `bug`: Something isn't working
- `enhancement`: New feature or improvement
- `documentation`: Documentation updates
- `good first issue`: Good for newcomers
- `help wanted`: Extra attention needed
- `priority: high/medium/low`: Issue priority
- `type: frontend/backend/api`: Component affected

## ⚡ Performance Guidelines

### Code Performance
- Avoid unnecessary re-renders in React
- Use appropriate data structures
- Implement proper error handling
- Consider memory usage in long-running processes

### Database Performance
- Use appropriate indexes
- Optimize queries
- Implement proper pagination
- Consider caching strategies

## 🔒 Security Considerations

### Input Validation
- Validate all user inputs
- Sanitize data before database operations
- Use parameterized queries
- Implement proper authentication/authorization

### Sensitive Data
- Never commit secrets or API keys
- Use environment variables for configuration
- Implement proper session management
- Follow OWASP guidelines

## 🎯 Review Process

### Pull Request Review
1. **Automated Checks**: CI/CD pipeline must pass
2. **Code Review**: At least one maintainer approval required
3. **Testing**: All tests must pass
4. **Documentation**: Updates must be included

### Review Checklist
- [ ] Code follows style guidelines
- [ ] Tests are included and passing
- [ ] Documentation is updated
- [ ] No breaking changes (or properly documented)
- [ ] Performance impact considered
- [ ] Security implications reviewed

## 🏆 Recognition

### Contributors
- All contributors are acknowledged in our [Contributors](CONTRIBUTORS.md) file
- Significant contributions may be highlighted in release notes
- Community recognition through GitHub achievements

### Maintainership
Outstanding contributors may be invited to become maintainers with:
- Commit access
- Issue triage responsibilities
- Code review privileges
- Release management participation

## 📞 Getting Help

### Communication Channels
- **GitHub Discussions**: General questions and ideas
- **GitHub Issues**: Bug reports and feature requests
- **Email**: maintainers@mystore-rw.com

### Office Hours
- Weekly community calls (schedule TBD)
- Maintainer availability for questions
- Pair programming sessions for complex features

## 📊 Project Metrics

We track various metrics to understand project health:
- Code coverage percentage
- Issue resolution time
- Pull request merge time
- Community engagement levels

## 🗺️ Contribution Opportunities

### Beginner-Friendly
- Documentation improvements
- Test case additions
- Bug fixes with clear reproduction steps
- UI/UX enhancements

### Intermediate
- New feature implementations
- Performance optimizations
- Integration improvements
- Refactoring tasks

### Advanced
- Architecture improvements
- Security enhancements
- Scalability implementations
- Core system modifications

---

Thank you for contributing to MyStore! Your efforts help make this project better for everyone. 🙏