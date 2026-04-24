export const endpoints = {
    auth: [
        { method: "POST", path: "/api/auth/register", description: "Create a new user" },
        { method: "POST", path: "/api/auth/login", description: "Authenticate and set auth cookie" },
        { method: "GET", path: "/api/auth/me", description: "Get authenticated user info from cookie" },
        { method: "POST", path: "/api/auth/logout", description: "Log out user and clear auth cookie" },
    ],
    users: [
        { method: "GET", path: "/api/users", description: "Get all users with pagination and search", query: ["skip", "limit", "search"] },
        { method: "GET", path: "/api/users/:id", description: "Get a user by ID" },
        { method: "GET", path: "/api/users/email/:email", description: "Get a user by email" },
        { method: "PATCH", path: "/api/users/:id", description: "Update a user" },
        { method: "DELETE", path: "/api/users/:id", description: "Delete a user" },
    ],
    products: [
        { method: "GET", path: "/api/products", description: "Get products with optional filters and pagination", query: ["skip", "limit", "search", "sort", "category"] },
        { method: "GET", path: "/api/products/:serviceId", description: "Get a single product by ID" },
        { method: "POST", path: "/api/products", description: "Create a new product" },
        { method: "PATCH", path: "/api/products/:serviceId", description: "Update a product" },
        { method: "DELETE", path: "/api/products/:serviceId", description: "Delete a product" },
    ],
    orders: [
        { method: "GET", path: "/api/orders", description: "Get all orders with pagination and search", query: ["skip", "limit", "search"] },
        { method: "GET", path: "/api/orders/:id", description: "Get order by ID" },
        { method: "GET", path: "/api/orders/user/:userId", description: "Get orders for a specific user with pagination and search", query: ["skip", "limit", "search"] },
        { method: "POST", path: "/api/orders", description: "Create a new order" },
        { method: "PATCH", path: "/api/orders/:id", description: "Update an order" },
        { method: "DELETE", path: "/api/orders/:id", description: "Delete an order" },
    ],
    reviews: [
        { method: "GET", path: "/api/reviews/:productId", description: "Get reviews for a product with pagination and search", query: ["skip", "limit", "search"] },
        { method: "GET", path: "/api/reviews/my-reviews/:userId", description: "Get reviews by user with pagination and search", query: ["skip", "limit", "search"] },
        { method: "POST", path: "/api/reviews", description: "Create a review" },
        { method: "DELETE", path: "/api/reviews/:id", description: "Delete a review" },
    ],
    dashboard: [
        { method: "GET", path: "/api/dashboard/stats", description: "Get dashboard summary stats" },
        { method: "GET", path: "/api/dashboard/chart-data", description: "Get chart-ready dashboard data" },
    ],
    categories: [
        { method: "GET", path: "/api/categories", description: "Get distinct product categories" },
    ],
    ai: [
        { method: "POST", path: "/api/ai/generate-description", description: "Generate a product description" },
    ],
};