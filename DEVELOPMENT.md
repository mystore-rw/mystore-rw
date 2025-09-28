# Development Guide

This guide provides detailed information for developers working on MyStore.

## 🏗️ Architecture Deep Dive

### System Overview

MyStore follows a microservices-inspired architecture with clear separation of concerns:

```
┌─────────────────┐
│   Load Balancer │
└─────────┬───────┘
          │
┌─────────────────┐    ┌─────────────────┐
│   Web Frontend  │    │  Admin Frontend │
│   (Next.js)     │    │   (React SPA)   │
└─────────┬───────┘    └─────────┬───────┘
          │                      │
          └──────────┬───────────┘
                     │
          ┌─────────────────┐
          │   API Gateway   │
          │   (Express.js)  │
          └─────────┬───────┘
                    │
    ┌───────────────┼───────────────┐
    │               │               │
┌───▼───┐    ┌──────▼──────┐    ┌──▼──────┐
│Product│    │   Orders    │    │ Users   │
│Service│    │   Service   │    │ Service │
└───┬───┘    └──────┬──────┘    └──┬──────┘
    │               │               │
    └───────────────┼───────────────┘
                    │
          ┌─────────────────┐
          │   Data Layer    │
          │  ┌───────────┐  │
          │  │PostgreSQL │  │
          │  └───────────┘  │
          │  ┌───────────┐  │
          │  │   Redis   │  │
          │  └───────────┘  │
          │  ┌───────────┐  │
          │  │    S3     │  │
          │  └───────────┘  │
          └─────────────────┘
```

### Technology Stack

#### Frontend
- **Next.js 13+**: React framework with App Router
- **TypeScript**: Type-safe JavaScript
- **Tailwind CSS**: Utility-first CSS framework
- **Zustand**: Lightweight state management
- **React Query**: Server state management
- **Framer Motion**: Animation library

#### Backend
- **Node.js 18+**: Runtime environment
- **Express.js**: Web application framework
- **TypeScript**: Type-safe development
- **Prisma**: Database ORM
- **Jest**: Testing framework
- **Winston**: Logging library

#### Database & Storage
- **PostgreSQL**: Primary database
- **Redis**: Caching and sessions
- **AWS S3**: File storage
- **Elasticsearch**: Search functionality (optional)

#### DevOps
- **Docker**: Containerization
- **GitHub Actions**: CI/CD pipeline
- **Terraform**: Infrastructure as Code
- **Nginx**: Reverse proxy and load balancer

## 🔧 Development Environment

### Prerequisites

1. **Node.js 18+**
   ```bash
   # Using nvm (recommended)
   nvm install 18
   nvm use 18
   ```

2. **Package Manager**
   ```bash
   # Install pnpm (recommended)
   npm install -g pnpm
   ```

3. **Database**
   ```bash
   # PostgreSQL via Docker
   docker run --name mystore-postgres -e POSTGRES_PASSWORD=password -p 5432:5432 -d postgres:15
   
   # Or install locally (macOS)
   brew install postgresql@15
   brew services start postgresql@15
   ```

4. **Redis**
   ```bash
   # Redis via Docker
   docker run --name mystore-redis -p 6379:6379 -d redis:7
   
   # Or install locally (macOS)
   brew install redis
   brew services start redis
   ```

### Environment Setup

1. **Clone and Install**
   ```bash
   git clone https://github.com/mystore-rw/mystore-rw.git
   cd mystore-rw
   pnpm install
   ```

2. **Environment Configuration**
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your settings
   ```

3. **Database Setup**
   ```bash
   # Generate Prisma client
   pnpm prisma generate
   
   # Run migrations
   pnpm prisma migrate dev
   
   # Seed database
   pnpm run seed
   ```

4. **Development Server**
   ```bash
   # Start all services
   pnpm run dev
   
   # Or start individually
   pnpm run dev:web      # Frontend (port 3000)
   pnpm run dev:api      # API server (port 3001)
   pnpm run dev:admin    # Admin panel (port 3002)
   ```

## 📁 Project Structure

```
mystore-rw/
├── apps/                   # Applications
│   ├── web/               # Customer-facing web app
│   ├── admin/             # Admin dashboard
│   └── api/               # API server
├── packages/              # Shared packages
│   ├── ui/                # Shared UI components
│   ├── database/          # Database schema and migrations
│   ├── types/             # Shared TypeScript types
│   └── utils/             # Shared utilities
├── docs/                  # Documentation
├── scripts/               # Build and deployment scripts
├── tests/                 # Integration and E2E tests
├── .github/               # GitHub Actions workflows
└── tools/                 # Development tools
```

### App Structure (apps/web)

```
apps/web/
├── src/
│   ├── app/               # Next.js App Router pages
│   ├── components/        # React components
│   │   ├── ui/           # Basic UI components
│   │   ├── forms/        # Form components
│   │   ├── layouts/      # Layout components
│   │   └── features/     # Feature-specific components
│   ├── hooks/            # Custom React hooks
│   ├── lib/              # Utility libraries
│   ├── store/            # State management
│   ├── styles/           # Global styles
│   └── types/            # TypeScript type definitions
├── public/               # Static assets
├── tests/                # Component tests
└── package.json
```

### API Structure (apps/api)

```
apps/api/
├── src/
│   ├── controllers/      # Route controllers
│   ├── middleware/       # Express middleware
│   ├── services/         # Business logic
│   ├── models/           # Data models
│   ├── routes/           # API routes
│   ├── utils/            # Utility functions
│   ├── types/            # TypeScript types
│   └── config/           # Configuration
├── tests/                # API tests
└── package.json
```

## 🔄 Development Workflow

### Feature Development

1. **Create Feature Branch**
   ```bash
   git checkout -b feature/user-authentication
   ```

2. **Database Changes**
   ```bash
   # Create migration
   pnpm prisma migrate dev --name add-user-auth
   
   # Update types
   pnpm prisma generate
   ```

3. **Backend Development**
   ```bash
   # Create service
   touch apps/api/src/services/auth.service.ts
   
   # Create controller
   touch apps/api/src/controllers/auth.controller.ts
   
   # Add routes
   # Edit apps/api/src/routes/auth.routes.ts
   ```

4. **Frontend Development**
   ```bash
   # Create components
   mkdir apps/web/src/components/auth
   touch apps/web/src/components/auth/LoginForm.tsx
   
   # Add pages
   touch apps/web/src/app/login/page.tsx
   ```

5. **Testing**
   ```bash
   # Unit tests
   pnpm run test
   
   # Integration tests
   pnpm run test:integration
   
   # E2E tests
   pnpm run test:e2e
   ```

### Code Quality

```bash
# Linting
pnpm run lint            # Check all packages
pnpm run lint:fix        # Auto-fix issues

# Type checking
pnpm run type-check      # TypeScript validation

# Formatting
pnpm run format          # Format with Prettier

# Pre-commit checks
pnpm run pre-commit      # Run all quality checks
```

## 🗄️ Database Management

### Schema Design

```prisma
// packages/database/prisma/schema.prisma

model User {
  id        String   @id @default(cuid())
  email     String   @unique
  name      String?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  
  orders    Order[]
  reviews   Review[]
  
  @@map("users")
}

model Product {
  id          String   @id @default(cuid())
  name        String
  description String?
  price       Decimal
  category    Category @relation(fields: [categoryId], references: [id])
  categoryId  String
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  
  orderItems  OrderItem[]
  reviews     Review[]
  
  @@map("products")
}
```

### Migration Workflow

```bash
# Create migration
pnpm prisma migrate dev --name descriptive-name

# Apply to production
pnpm prisma migrate deploy

# Reset database (development only)
pnpm prisma migrate reset

# Generate client
pnpm prisma generate

# View database
pnpm prisma studio
```

### Seeding Data

```typescript
// packages/database/prisma/seed.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Create categories
  const electronics = await prisma.category.create({
    data: {
      name: 'Electronics',
      slug: 'electronics',
    },
  });

  // Create products
  await prisma.product.createMany({
    data: [
      {
        name: 'iPhone 15',
        price: 999.99,
        categoryId: electronics.id,
      },
      // More products...
    ],
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
```

## 🧪 Testing Strategy

### Test Pyramid

```
         ┌─────────────────┐
         │   E2E Tests     │ ← Few, high-value scenarios
         │   (Playwright)  │
         └─────────────────┘
       ┌───────────────────────┐
       │  Integration Tests    │ ← API endpoints, DB interactions
       │    (Jest + Supertest) │
       └───────────────────────┘
   ┌─────────────────────────────────┐
   │        Unit Tests               │ ← Many, fast, isolated
   │    (Jest + Testing Library)     │
   └─────────────────────────────────┘
```

### Unit Testing

```typescript
// apps/api/src/services/__tests__/product.service.test.ts
import { ProductService } from '../product.service';
import { PrismaClient } from '@prisma/client';

jest.mock('@prisma/client');

describe('ProductService', () => {
  let productService: ProductService;
  let mockPrisma: jest.Mocked<PrismaClient>;

  beforeEach(() => {
    mockPrisma = new PrismaClient() as jest.Mocked<PrismaClient>;
    productService = new ProductService(mockPrisma);
  });

  describe('getById', () => {
    it('should return product when found', async () => {
      const mockProduct = {
        id: '1',
        name: 'Test Product',
        price: 99.99,
      };

      mockPrisma.product.findUnique.mockResolvedValue(mockProduct);

      const result = await productService.getById('1');

      expect(result).toEqual(mockProduct);
      expect(mockPrisma.product.findUnique).toHaveBeenCalledWith({
        where: { id: '1' },
      });
    });

    it('should throw error when product not found', async () => {
      mockPrisma.product.findUnique.mockResolvedValue(null);

      await expect(productService.getById('999')).rejects.toThrow(
        'Product not found'
      );
    });
  });
});
```

### Integration Testing

```typescript
// tests/integration/api/products.test.ts
import request from 'supertest';
import { app } from '../../../apps/api/src/app';
import { setupTestDb, cleanupTestDb } from '../helpers/database';

describe('Products API', () => {
  beforeAll(async () => {
    await setupTestDb();
  });

  afterAll(async () => {
    await cleanupTestDb();
  });

  describe('GET /api/products', () => {
    it('should return list of products', async () => {
      const response = await request(app)
        .get('/api/v1/products')
        .expect(200);

      expect(response.body).toHaveProperty('data');
      expect(Array.isArray(response.body.data)).toBe(true);
    });

    it('should support pagination', async () => {
      const response = await request(app)
        .get('/api/v1/products?page=1&limit=10')
        .expect(200);

      expect(response.body).toHaveProperty('pagination');
      expect(response.body.pagination.page).toBe(1);
      expect(response.body.pagination.limit).toBe(10);
    });
  });
});
```

### E2E Testing

```typescript
// tests/e2e/checkout.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Checkout Flow', () => {
  test('should complete purchase successfully', async ({ page }) => {
    // Navigate to product page
    await page.goto('/products/test-product');
    
    // Add to cart
    await page.click('[data-testid="add-to-cart"]');
    await expect(page.locator('[data-testid="cart-count"]')).toHaveText('1');
    
    // Go to checkout
    await page.click('[data-testid="cart-button"]');
    await page.click('[data-testid="checkout-button"]');
    
    // Fill checkout form
    await page.fill('[data-testid="email"]', 'test@example.com');
    await page.fill('[data-testid="name"]', 'John Doe');
    await page.fill('[data-testid="address"]', '123 Test St');
    
    // Complete purchase
    await page.click('[data-testid="place-order"]');
    
    // Verify success
    await expect(page.locator('[data-testid="order-confirmation"]')).toBeVisible();
  });
});
```

## 🔍 Debugging

### Local Debugging

1. **VS Code Configuration**
   ```json
   // .vscode/launch.json
   {
     "version": "0.2.0",
     "configurations": [
       {
         "name": "Debug API",
         "type": "node",
         "request": "launch",
         "program": "${workspaceFolder}/apps/api/src/index.ts",
         "env": {
           "NODE_ENV": "development"
         },
         "runtimeArgs": ["-r", "ts-node/register"],
         "sourceMaps": true
       }
     ]
   }
   ```

2. **Browser DevTools**
   - React DevTools for component inspection
   - Redux DevTools for state management
   - Network tab for API debugging

3. **Database Debugging**
   ```bash
   # Enable query logging
   DATABASE_URL="postgresql://user:pass@localhost/db?schema=public&log=query"
   
   # Use Prisma Studio
   pnpm prisma studio
   ```

### Production Debugging

1. **Logging**
   ```typescript
   import { logger } from '@mystore/utils';
   
   logger.info('User action', { userId, action: 'purchase' });
   logger.error('Payment failed', { error, orderId });
   ```

2. **Monitoring**
   - Application Performance Monitoring (APM)
   - Error tracking with Sentry
   - Infrastructure monitoring

3. **Health Checks**
   ```typescript
   // apps/api/src/routes/health.ts
   export const healthCheck = async (req: Request, res: Response) => {
     const health = {
       status: 'healthy',
       timestamp: new Date().toISOString(),
       services: {
         database: await checkDatabase(),
         redis: await checkRedis(),
         storage: await checkStorage(),
       },
     };
     
     res.json(health);
   };
   ```

## 📈 Performance Optimization

### Frontend Performance

1. **Code Splitting**
   ```tsx
   // Lazy load components
   const AdminPanel = lazy(() => import('./AdminPanel'));
   
   // Route-based splitting
   const CheckoutPage = lazy(() => import('../pages/CheckoutPage'));
   ```

2. **Image Optimization**
   ```tsx
   import Image from 'next/image';
   
   <Image
     src="/product.jpg"
     alt="Product"
     width={500}
     height={300}
     priority={false}
     placeholder="blur"
   />
   ```

3. **Caching Strategy**
   ```tsx
   // React Query caching
   const { data } = useQuery({
     queryKey: ['products', filters],
     queryFn: () => fetchProducts(filters),
     staleTime: 5 * 60 * 1000, // 5 minutes
   });
   ```

### Backend Performance

1. **Database Optimization**
   ```sql
   -- Add indexes for common queries
   CREATE INDEX idx_products_category ON products(category_id);
   CREATE INDEX idx_orders_user_date ON orders(user_id, created_at);
   ```

2. **Caching**
   ```typescript
   // Redis caching
   const cachedProducts = await redis.get(`products:${categoryId}`);
   if (cachedProducts) {
     return JSON.parse(cachedProducts);
   }
   
   const products = await prisma.product.findMany({
     where: { categoryId },
   });
   
   await redis.setex(`products:${categoryId}`, 300, JSON.stringify(products));
   return products;
   ```

3. **Connection Pooling**
   ```typescript
   // Database connection pool
   const prisma = new PrismaClient({
     datasources: {
       db: {
         url: process.env.DATABASE_URL + '?connection_limit=20&pool_timeout=20',
       },
     },
   });
   ```

## 🚀 Deployment

### Local Deployment

```bash
# Build all applications
pnpm run build

# Start production server
pnpm run start
```

### Docker Deployment

```dockerfile
# Dockerfile
FROM node:18-alpine AS base

# Dependencies
FROM base AS deps
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN npm install -g pnpm && pnpm install --frozen-lockfile

# Builder
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN pnpm run build

# Runner
FROM base AS runner
WORKDIR /app
ENV NODE_ENV production
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs
EXPOSE 3000
ENV PORT 3000

CMD ["node", "server.js"]
```

### CI/CD Pipeline

```yaml
# .github/workflows/ci.yml
name: CI/CD Pipeline

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    services:
      postgres:
        image: postgres:15
        env:
          POSTGRES_PASSWORD: postgres
        options: >-
          --health-cmd pg_isready
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5

    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'pnpm'

      - name: Install dependencies
        run: pnpm install --frozen-lockfile

      - name: Run linting
        run: pnpm run lint

      - name: Run type checking
        run: pnpm run type-check

      - name: Run tests
        run: pnpm run test
        env:
          DATABASE_URL: postgresql://postgres:postgres@localhost:5432/test

      - name: Run E2E tests
        run: pnpm run test:e2e

  deploy:
    needs: test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'

    steps:
      - uses: actions/checkout@v3
      
      - name: Deploy to production
        run: |
          # Deployment script here
          echo "Deploying to production..."
```

## 📚 Additional Resources

### Learning Resources
- [Next.js Documentation](https://nextjs.org/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro)

### Tools and Extensions
- **VS Code Extensions**
  - Prisma (syntax highlighting)
  - ESLint (code quality)
  - Prettier (code formatting)
  - GitLens (git integration)

### Community
- [GitHub Discussions](https://github.com/mystore-rw/mystore-rw/discussions)
- [Discord Server](https://discord.gg/mystore) (TBD)
- [Stack Overflow](https://stackoverflow.com/questions/tagged/mystore)

---

This development guide is a living document. Please contribute improvements and updates as the project evolves!