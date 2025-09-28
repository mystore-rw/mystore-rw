# Getting Started Guide

Welcome to MyStore! This guide will help you get up and running with our e-commerce platform quickly.

## 📋 What You'll Learn

By the end of this guide, you'll have:
- MyStore running locally on your machine
- Understanding of the basic features
- Your first product added to the store
- A test order placed and processed

## ⏱️ Time Required

- **Quick Start**: 15 minutes
- **Complete Setup**: 45 minutes
- **First Product**: 10 minutes
- **Test Order**: 5 minutes

## 🚀 Quick Start (15 minutes)

### Step 1: Prerequisites Check

Make sure you have these installed:

```bash
# Check Node.js version (need 18+)
node --version

# Check npm version (need 8+)
npm --version

# Check if Git is installed
git --version
```

If you don't have these, visit our [Prerequisites Guide](../installation/prerequisites.md).

### Step 2: Get the Code

```bash
# Clone the repository
git clone https://github.com/mystore-rw/mystore-rw.git
cd mystore-rw

# Install dependencies
npm install
```

### Step 3: Quick Setup

```bash
# Copy environment file
cp .env.example .env

# Start with Docker (recommended for beginners)
docker-compose up -d
```

### Step 4: Access Your Store

Open your browser and visit:
- **Store Frontend**: http://localhost:3000
- **Admin Dashboard**: http://localhost:3000/admin
- **API Documentation**: http://localhost:3001/docs

🎉 **Congratulations!** Your store is now running!

## 🔧 Complete Setup (45 minutes)

If you prefer a more customized setup or want to understand the system better:

### Step 1: Database Setup

#### Option A: Use Docker (Recommended)
```bash
# Start PostgreSQL and Redis
docker-compose up -d postgres redis
```

#### Option B: Local Installation
```bash
# Install PostgreSQL (macOS with Homebrew)
brew install postgresql@15
brew services start postgresql@15

# Create database
createdb mystore_development

# Install Redis
brew install redis
brew services start redis
```

### Step 2: Environment Configuration

Edit your `.env` file with your specific settings:

```bash
# Basic Configuration
NODE_ENV=development
PORT=3000
APP_NAME="My Awesome Store"
APP_URL=http://localhost:3000

# Database (adjust if needed)
DATABASE_URL=postgresql://username:password@localhost:5432/mystore_development

# Redis (adjust if needed)
REDIS_URL=redis://localhost:6379

# Secrets (generate new ones for production)
JWT_SECRET=your-super-secret-jwt-key
SESSION_SECRET=your-session-secret-key

# Email (optional for development)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password

# Payment (optional for development)
STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
```

### Step 3: Database Migration and Seeding

```bash
# Run database migrations
npm run migrate

# Seed with sample data
npm run seed
```

### Step 4: Start Development Server

```bash
# Start all services
npm run dev

# Or start individually
npm run dev:web      # Frontend (port 3000)
npm run dev:api      # API server (port 3001)
npm run dev:admin    # Admin panel (port 3002)
```

### Step 5: Create Admin Account

```bash
# Create your admin account
npm run create-admin

# Follow the prompts to set up your admin credentials
```

## 🛍️ Adding Your First Product (10 minutes)

### Step 1: Access Admin Dashboard

1. Go to http://localhost:3000/admin
2. Log in with your admin credentials
3. Navigate to "Products" > "Add New Product"

### Step 2: Product Information

Fill in the product details:

```
Name: "Wireless Bluetooth Headphones"
Description: "High-quality wireless headphones with noise cancellation"
Price: 199.99
Category: Electronics (create if doesn't exist)
SKU: WBH-001
```

### Step 3: Add Product Images

- Upload product images or use sample images
- Set the primary image
- Add alternative angles

### Step 4: Inventory Settings

```
Stock Quantity: 50
Track Inventory: Yes
Allow Backorders: No
Stock Status: In Stock
```

### Step 5: SEO and Metadata

```
SEO Title: "Premium Wireless Bluetooth Headphones - MyStore"
Meta Description: "Experience superior sound quality with our wireless Bluetooth headphones featuring active noise cancellation."
URL Slug: wireless-bluetooth-headphones
```

### Step 6: Save and Publish

- Click "Save Draft" to save your work
- Click "Publish" when ready to make it live
- View the product on your store frontend

## 🛒 Processing Your First Order (5 minutes)

### Step 1: Place a Test Order

1. Visit your store frontend at http://localhost:3000
2. Browse to your newly created product
3. Add it to cart
4. Proceed to checkout

### Step 2: Customer Information

```
Email: customer@example.com
Name: John Doe
Phone: +1-555-0123

Shipping Address:
123 Main Street
New York, NY 10001
United States
```

### Step 3: Payment

If you have Stripe configured:
- Use test card number: 4242424242424242
- Expiry: Any future date
- CVC: Any 3 digits

For development without payment:
- Select "Cash on Delivery" or "Bank Transfer"

### Step 4: Order Confirmation

- You'll receive an order confirmation
- Check the admin dashboard under "Orders"
- Update the order status as needed

## 🎨 Customizing Your Store

### Store Settings

Navigate to Admin > Settings to customize:

- **Store Name**: Your store's name
- **Logo**: Upload your logo
- **Theme Colors**: Primary and secondary colors
- **Currency**: Default currency
- **Time Zone**: Your local time zone

### Adding More Products

Create different types of products:

1. **Simple Products**: Basic products with single price
2. **Variable Products**: Products with variants (size, color)
3. **Digital Products**: Downloadable items
4. **Grouped Products**: Collections of related items

### Setting Up Categories

Organize your products with categories:

1. Go to Admin > Products > Categories
2. Create main categories (Electronics, Clothing, etc.)
3. Add subcategories as needed
4. Set category images and descriptions

## 📧 Configuring Email

To receive order notifications and send customer emails:

### Gmail Configuration

1. Enable 2-factor authentication on your Gmail account
2. Generate an app password
3. Update your `.env` file:

```bash
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
```

### Test Email

```bash
# Send a test email
npm run test-email
```

## 💳 Setting Up Payments

### Stripe Integration

1. Create a Stripe account at stripe.com
2. Get your API keys from the dashboard
3. Update your `.env` file:

```bash
STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
```

4. Test with Stripe's test card numbers

### PayPal Integration

1. Create a PayPal developer account
2. Create a new app to get credentials
3. Update your configuration:

```bash
PAYPAL_CLIENT_ID=your-paypal-client-id
PAYPAL_CLIENT_SECRET=your-paypal-client-secret
PAYPAL_ENVIRONMENT=sandbox
```

## 📊 Understanding the Dashboard

### Sales Overview

The dashboard shows:
- **Today's Sales**: Revenue for today
- **Total Orders**: Number of orders
- **Product Views**: Popular products
- **Customer Growth**: New vs returning customers

### Key Metrics

Monitor these important metrics:
- Conversion rate
- Average order value
- Cart abandonment rate
- Customer lifetime value

## 🔧 Troubleshooting

### Common Issues

#### "Cannot connect to database"
```bash
# Check if PostgreSQL is running
brew services list | grep postgresql

# Restart PostgreSQL
brew services restart postgresql@15

# Check connection
psql -h localhost -p 5432 -U username -d mystore_development
```

#### "Redis connection failed"
```bash
# Check if Redis is running
redis-cli ping

# Should return "PONG"

# Start Redis if needed
brew services start redis
```

#### "Port 3000 is already in use"
```bash
# Find what's using the port
lsof -ti:3000

# Kill the process (replace PID with actual process ID)
kill -9 PID

# Or use a different port
PORT=3001 npm run dev
```

#### Email not sending
- Check SMTP credentials
- Verify app password for Gmail
- Check firewall settings
- Test with a different email provider

### Getting Help

If you encounter issues:

1. **Check the logs**: Look at terminal output for error messages
2. **Search documentation**: Check our docs for solutions
3. **GitHub Issues**: Search existing issues or create a new one
4. **Community**: Ask questions in GitHub Discussions
5. **Support**: Email support@mystore-rw.com

## 📚 Next Steps

Now that you have MyStore running, explore these topics:

### For Store Owners
- [Store Management Guide](store-management.md)
- [Marketing Features](marketing.md)
- [Analytics and Reporting](analytics.md)
- [SEO Best Practices](seo.md)

### For Developers
- [Development Guide](../DEVELOPMENT.md)
- [API Documentation](../api/README.md)
- [Theme Customization](themes.md)
- [Plugin Development](plugins.md)

### For System Administrators
- [Production Deployment](../deployment/production.md)
- [Security Best Practices](security.md)
- [Backup and Recovery](backup.md)
- [Performance Optimization](performance.md)

## 🏆 Best Practices

### Performance
- Optimize images before uploading
- Use a CDN for static assets
- Enable caching in production
- Monitor page load times

### Security
- Use strong passwords
- Keep software updated
- Enable SSL/TLS in production
- Regular security audits

### User Experience
- Test checkout process regularly
- Optimize for mobile devices
- Provide clear product information
- Fast customer support response

### SEO
- Use descriptive product titles
- Write unique product descriptions
- Optimize images with alt text
- Create a sitemap

---

Congratulations on setting up MyStore! You're now ready to start building your online business. Remember, great e-commerce is about continuous improvement – keep testing, learning, and optimizing your store for the best customer experience.

Need help? We're here for you! Contact support@mystore-rw.com or join our community discussions.