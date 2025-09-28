# API Reference

This document provides comprehensive information about the MyStore REST API.

## Base URL

```
Production: https://api.mystore.com/v1
Development: http://localhost:3001/api/v1
```

## Authentication

All API requests require authentication using JWT (JSON Web Tokens).

### Getting an Access Token

```bash
POST /auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "token_type": "Bearer",
  "expires_in": 3600,
  "user": {
    "id": "user_123",
    "email": "user@example.com",
    "name": "John Doe"
  }
}
```

### Using the Token

Include the token in the Authorization header:

```bash
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## Error Handling

The API uses conventional HTTP response codes to indicate success or failure.

### Error Response Format

```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid input data",
    "details": {
      "field": "email",
      "reason": "Invalid email format"
    }
  }
}
```

### HTTP Status Codes

- `200` - OK: Request succeeded
- `201` - Created: Resource created successfully
- `400` - Bad Request: Invalid request data
- `401` - Unauthorized: Authentication required
- `403` - Forbidden: Insufficient permissions
- `404` - Not Found: Resource not found
- `422` - Unprocessable Entity: Validation failed
- `500` - Internal Server Error: Server error

## Rate Limiting

API requests are rate-limited to prevent abuse:

- **Authenticated users**: 1000 requests per hour
- **Unauthenticated users**: 100 requests per hour

Rate limit headers are included in responses:

```
X-RateLimit-Limit: 1000
X-RateLimit-Remaining: 999
X-RateLimit-Reset: 1640995200
```

## Pagination

List endpoints support pagination using cursor-based pagination:

### Request Parameters
- `limit`: Number of items per page (max 100, default 20)
- `cursor`: Cursor for next page (from previous response)

### Response Format
```json
{
  "data": [...],
  "pagination": {
    "has_next": true,
    "next_cursor": "cursor_string",
    "limit": 20
  }
}
```

## Products API

### List Products

```bash
GET /products
```

**Query Parameters:**
- `category_id` (string): Filter by category
- `search` (string): Search products by name or description
- `min_price` (number): Minimum price filter
- `max_price` (number): Maximum price filter
- `sort` (string): Sort by `name`, `price`, `created_at`
- `order` (string): `asc` or `desc`

**Example Request:**
```bash
GET /products?category_id=electronics&min_price=100&sort=price&order=asc
```

**Response:**
```json
{
  "data": [
    {
      "id": "prod_123",
      "name": "iPhone 15 Pro",
      "description": "Latest iPhone with advanced features",
      "price": 999.99,
      "currency": "USD",
      "category": {
        "id": "cat_123",
        "name": "Electronics"
      },
      "images": [
        {
          "url": "https://cdn.mystore.com/products/iphone15.jpg",
          "alt": "iPhone 15 Pro"
        }
      ],
      "inventory": {
        "quantity": 50,
        "in_stock": true
      },
      "created_at": "2025-01-01T00:00:00Z",
      "updated_at": "2025-01-01T00:00:00Z"
    }
  ],
  "pagination": {
    "has_next": false,
    "next_cursor": null,
    "limit": 20
  }
}
```

### Get Product

```bash
GET /products/{product_id}
```

**Response:**
```json
{
  "id": "prod_123",
  "name": "iPhone 15 Pro",
  "description": "Latest iPhone with advanced features",
  "price": 999.99,
  "currency": "USD",
  "category": {
    "id": "cat_123",
    "name": "Electronics"
  },
  "variants": [
    {
      "id": "var_123",
      "name": "256GB Space Black",
      "price": 999.99,
      "attributes": {
        "color": "Space Black",
        "storage": "256GB"
      }
    }
  ],
  "images": [...],
  "inventory": {...},
  "created_at": "2025-01-01T00:00:00Z",
  "updated_at": "2025-01-01T00:00:00Z"
}
```

### Create Product (Admin)

```bash
POST /products
Content-Type: application/json
Authorization: Bearer {admin_token}

{
  "name": "New Product",
  "description": "Product description",
  "price": 99.99,
  "category_id": "cat_123",
  "images": [
    {
      "url": "https://example.com/image.jpg",
      "alt": "Product image"
    }
  ]
}
```

### Update Product (Admin)

```bash
PUT /products/{product_id}
Content-Type: application/json
Authorization: Bearer {admin_token}

{
  "name": "Updated Product Name",
  "price": 149.99
}
```

### Delete Product (Admin)

```bash
DELETE /products/{product_id}
Authorization: Bearer {admin_token}
```

## Categories API

### List Categories

```bash
GET /categories
```

**Response:**
```json
{
  "data": [
    {
      "id": "cat_123",
      "name": "Electronics",
      "slug": "electronics",
      "description": "Electronic devices and gadgets",
      "parent_id": null,
      "product_count": 150,
      "created_at": "2025-01-01T00:00:00Z"
    }
  ]
}
```

### Get Category

```bash
GET /categories/{category_id}
```

### Create Category (Admin)

```bash
POST /categories
Content-Type: application/json
Authorization: Bearer {admin_token}

{
  "name": "New Category",
  "slug": "new-category",
  "description": "Category description",
  "parent_id": "cat_123"
}
```

## Orders API

### List Orders

```bash
GET /orders
Authorization: Bearer {user_token}
```

**Response:**
```json
{
  "data": [
    {
      "id": "order_123",
      "order_number": "ORD-2025-001",
      "status": "confirmed",
      "total": 1299.98,
      "currency": "USD",
      "items": [
        {
          "id": "item_123",
          "product": {
            "id": "prod_123",
            "name": "iPhone 15 Pro"
          },
          "quantity": 1,
          "price": 999.99
        }
      ],
      "shipping": {
        "method": "standard",
        "cost": 9.99,
        "address": {
          "street": "123 Main St",
          "city": "New York",
          "state": "NY",
          "zip": "10001"
        }
      },
      "created_at": "2025-01-01T00:00:00Z"
    }
  ]
}
```

### Get Order

```bash
GET /orders/{order_id}
Authorization: Bearer {user_token}
```

### Create Order

```bash
POST /orders
Content-Type: application/json
Authorization: Bearer {user_token}

{
  "items": [
    {
      "product_id": "prod_123",
      "variant_id": "var_123",
      "quantity": 2
    }
  ],
  "shipping_address": {
    "street": "123 Main St",
    "city": "New York",
    "state": "NY",
    "zip": "10001",
    "country": "US"
  },
  "payment_method": {
    "type": "card",
    "token": "stripe_token_123"
  }
}
```

### Update Order Status (Admin)

```bash
PATCH /orders/{order_id}
Content-Type: application/json
Authorization: Bearer {admin_token}

{
  "status": "shipped",
  "tracking_number": "1234567890"
}
```

## Users API

### Get Current User

```bash
GET /users/me
Authorization: Bearer {user_token}
```

**Response:**
```json
{
  "id": "user_123",
  "email": "user@example.com",
  "name": "John Doe",
  "phone": "+1234567890",
  "addresses": [
    {
      "id": "addr_123",
      "type": "home",
      "street": "123 Main St",
      "city": "New York",
      "state": "NY",
      "zip": "10001",
      "country": "US",
      "is_default": true
    }
  ],
  "preferences": {
    "newsletter": true,
    "notifications": true
  },
  "created_at": "2025-01-01T00:00:00Z"
}
```

### Update User Profile

```bash
PUT /users/me
Content-Type: application/json
Authorization: Bearer {user_token}

{
  "name": "John Smith",
  "phone": "+1987654321"
}
```

### Register User

```bash
POST /auth/register
Content-Type: application/json

{
  "email": "newuser@example.com",
  "password": "securepassword123",
  "name": "Jane Doe"
}
```

## Cart API

### Get Cart

```bash
GET /cart
Authorization: Bearer {user_token}
```

### Add Item to Cart

```bash
POST /cart/items
Content-Type: application/json
Authorization: Bearer {user_token}

{
  "product_id": "prod_123",
  "variant_id": "var_123",
  "quantity": 2
}
```

### Update Cart Item

```bash
PUT /cart/items/{item_id}
Content-Type: application/json
Authorization: Bearer {user_token}

{
  "quantity": 3
}
```

### Remove Item from Cart

```bash
DELETE /cart/items/{item_id}
Authorization: Bearer {user_token}
```

### Clear Cart

```bash
DELETE /cart
Authorization: Bearer {user_token}
```

## Webhooks

MyStore can send webhook notifications for various events.

### Supported Events

- `order.created`
- `order.updated` 
- `order.cancelled`
- `payment.completed`
- `payment.failed`

### Webhook Payload

```json
{
  "id": "evt_123",
  "type": "order.created",
  "created": 1640995200,
  "data": {
    "object": {
      "id": "order_123",
      "status": "confirmed",
      ...
    }
  }
}
```

### Webhook Verification

Verify webhook signatures using the secret key:

```javascript
const crypto = require('crypto');

function verifyWebhook(payload, signature, secret) {
  const expectedSignature = crypto
    .createHmac('sha256', secret)
    .update(payload, 'utf8')
    .digest('hex');
  
  return signature === `sha256=${expectedSignature}`;
}
```

## SDK and Libraries

### Official SDKs

- **JavaScript/Node.js**: `npm install @mystore/sdk`
- **Python**: `pip install mystore-python`
- **PHP**: `composer require mystore/php-sdk`

### Community SDKs

- **Ruby**: `gem install mystore-ruby`
- **Go**: `go get github.com/mystore/go-sdk`

### Usage Example (JavaScript)

```javascript
import MyStore from '@mystore/sdk';

const client = new MyStore({
  apiKey: 'your_api_key',
  environment: 'production' // or 'sandbox'
});

// Get products
const products = await client.products.list({
  category_id: 'electronics'
});

// Create order
const order = await client.orders.create({
  items: [{ product_id: 'prod_123', quantity: 1 }],
  shipping_address: { ... }
});
```

## Testing

### Sandbox Environment

Use the sandbox environment for testing:

- Base URL: `https://api-sandbox.mystore.com/v1`
- Use test API keys (prefix: `test_`)
- No actual payments processed

### Test Data

Sample test data is available in the sandbox:
- Products with various configurations
- Test user accounts
- Mock payment methods

---

For more information, visit our [Developer Portal](https://developers.mystore.com) or contact support at api-support@mystore.com.