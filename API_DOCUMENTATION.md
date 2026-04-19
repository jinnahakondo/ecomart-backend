# Ecomart API - Pagination System & Endpoints

## Overview
This API provides a clean, organized structure with pagination support across all list endpoints. All endpoints are grouped by resource type for better organization.

## Base URL Structure
All endpoints are organized by resource type under `/api/`:
- `/api/auth` - Authentication endpoints
- `/api/users` - User management
- `/api/products` - Product management
- `/api/orders` - Order management
- `/api/reviews` - Review management
- `/api/dashboard` - Analytics and stats
- `/api/categories` - Product categories

## Pagination System

### Query Parameters
- **skip**: Number of items to skip (default: 0)
- **limit**: Number of items to return (default: 20)

### Response Format with Pagination
```json
{
  "success": true,
  "message": "Items fetched successfully",
  "data": [...],
  "pagination": {
    "total": 100,
    "skip": 0,
    "limit": 20,
    "page": 1
  }
}
```

### Pagination Metadata
- **total**: Total number of documents in the collection
- **skip**: Number of items skipped
- **limit**: Number of items per page
- **page**: Current page number (calculated from skip and limit)

## API Endpoints by Resource

### Authentication (`/api/auth`)
```json
{
  "auth": [
    { "method": "POST", "path": "/api/auth/register", "description": "Create a new user" },
    { "method": "POST", "path": "/api/auth/login", "description": "Authenticate and set auth cookie" },
    { "method": "GET", "path": "/api/auth/me", "description": "Get authenticated user info from cookie" },
    { "method": "POST", "path": "/api/auth/logout", "description": "Log out user and clear auth cookie" }
  ]
}
```

### Users (`/api/users`)
```json
{
  "users": [
    { "method": "GET", "path": "/api/users", "description": "Get all users with pagination", "query": ["skip", "limit"] },
    { "method": "GET", "path": "/api/users/:id", "description": "Get a user by ID" },
    { "method": "GET", "path": "/api/users/email/:email", "description": "Get a user by email" },
    { "method": "PATCH", "path": "/api/users/:id", "description": "Update a user" },
    { "method": "DELETE", "path": "/api/users/:id", "description": "Delete a user" }
  ]
}
```

### Products (`/api/products`)
```json
{
  "products": [
    { "method": "GET", "path": "/api/products", "description": "Get products with optional filters and pagination", "query": ["skip", "limit", "search", "sort", "category"] },
    { "method": "GET", "path": "/api/products/:serviceId", "description": "Get a single product by ID" },
    { "method": "POST", "path": "/api/products", "description": "Create a new product" },
    { "method": "PATCH", "path": "/api/products/:serviceId", "description": "Update a product" },
    { "method": "DELETE", "path": "/api/products/:serviceId", "description": "Delete a product" }
  ]
}
```

### Orders (`/api/orders`)
```json
{
  "orders": [
    { "method": "GET", "path": "/api/orders", "description": "Get all orders with pagination", "query": ["skip", "limit"] },
    { "method": "GET", "path": "/api/orders/:id", "description": "Get order by ID" },
    { "method": "GET", "path": "/api/orders/user/:userId", "description": "Get orders for a specific user with pagination", "query": ["skip", "limit"] },
    { "method": "POST", "path": "/api/orders", "description": "Create a new order" },
    { "method": "PATCH", "path": "/api/orders/:id", "description": "Update an order" },
    { "method": "DELETE", "path": "/api/orders/:id", "description": "Delete an order" }
  ]
}
```

### Reviews (`/api/reviews`)
```json
{
  "reviews": [
    { "method": "GET", "path": "/api/reviews/:productId", "description": "Get reviews for a product with pagination", "query": ["skip", "limit"] },
    { "method": "GET", "path": "/api/reviews/my-reviews/:userId", "description": "Get reviews by user with pagination", "query": ["skip", "limit"] },
    { "method": "POST", "path": "/api/reviews", "description": "Create a review" },
    { "method": "DELETE", "path": "/api/reviews/:id", "description": "Delete a review" }
  ]
}
```

## Usage Examples

### Pagination Examples

#### Get first 20 users
```bash
GET /api/users?skip=0&limit=20
```

#### Get second page of users
```bash
GET /api/users?skip=20&limit=20
```

#### Get products with filters and pagination
```bash
GET /api/products?search=laptop&category=electronics&skip=0&limit=20
```

#### Get orders for a user with pagination
```bash
GET /api/orders/user/USER_ID?skip=0&limit=20
```

### Frontend Implementation

#### JavaScript/React Example
```javascript
const fetchPaginatedData = async (endpoint, page = 1, limit = 20) => {
  const skip = (page - 1) * limit;
  const url = `${endpoint}?skip=${skip}&limit=${limit}`;

  const response = await fetch(url);
  const result = await response.json();

  return {
    data: result.data,
    pagination: result.pagination,
    totalPages: Math.ceil(result.pagination.total / limit)
  };
};

// Usage
const { data, pagination, totalPages } = await fetchPaginatedData('/api/users');
```

#### Pagination Component Logic
```javascript
const PaginationControls = ({ pagination, onPageChange }) => {
  const totalPages = Math.ceil(pagination.total / pagination.limit);
  const currentPage = pagination.page;

  return (
    <div>
      <button
        disabled={currentPage <= 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        Previous
      </button>

      <span>Page {currentPage} of {totalPages}</span>

      <button
        disabled={currentPage >= totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        Next
      </button>
    </div>
  );
};
```

## Response Examples

### Success Response (List with Pagination)
```json
{
  "success": true,
  "message": "Users fetched successfully",
  "data": [
    {
      "_id": "user_id_1",
      "name": "John Doe",
      "email": "john@example.com"
    }
  ],
  "pagination": {
    "total": 150,
    "skip": 0,
    "limit": 20,
    "page": 1
  }
}
```

### Success Response (Single Item)
```json
{
  "success": true,
  "message": "User fetched successfully",
  "data": {
    "_id": "user_id_1",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

### Error Response
```json
{
  "success": false,
  "message": "User not found"
}
```

## Implementation Notes

### Code Quality
- Clean, readable controller functions
- Consistent error handling
- Proper TypeScript types
- Helper functions for pagination calculation
- MongoDB native skip/limit for performance

### Performance Considerations
- Uses `countDocuments()` for accurate totals
- Efficient database queries with proper indexing recommended
- Pagination metadata helps frontend optimize requests

### Security
- Input validation on query parameters
- Proper error messages without sensitive data
- Rate limiting recommended for production

## Testing the API

### Get API Structure
```bash
curl http://localhost:5000/
```

### Test Pagination
```bash
# Get first page of users
curl "http://localhost:5000/api/users?skip=0&limit=20"

# Get second page of products
curl "http://localhost:5000/api/products?skip=20&limit=20"

# Get orders with pagination
curl "http://localhost:5000/api/orders?skip=0&limit=20"
```