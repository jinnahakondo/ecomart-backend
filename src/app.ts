import cors from "cors";
import express, { Application, Request, Response } from "express";
import cookieParser from "cookie-parser";

// Routes
import authRoute from "./routes/auth/auth.route";
import userRoutes from "./routes/user.route";
import productRoutes from "./routes/product.route";
import reviewRoutes from "./routes/review.route";
import orderRoutes from "./routes/order.route";
import statsRoutes from "./routes/dashoard.stats.route";
import chartDataRoutes from "./routes/chart.data.route";
import getCategoryRoute from "./routes/category.route";

const app: Application = express();
const port = process.env.PORT || 5000;

// -------------------
// Middleware
// -------------------

// CORS - credentials true required for cookie sharing
app.use(
  cors({
    origin: [
      "http://localhost:3000", // dev
      "https://ecomart-frontend-three.vercel.app", // production
    ],
    credentials: true,
  })
);

// cookie parser to read req.cookies
app.use(cookieParser());

// JSON parser for POST requests
app.use(express.json());

// URL encoded parser if needed
app.use(express.urlencoded({ extended: true }));

// -------------------
// Routes
// -------------------

// Auth routes (login, register, logout, me)
app.use("/api/auth", authRoute);

// User routes (CRUD, profile)
app.use("/api/users", userRoutes);

// Product routes
app.use("/api/products", productRoutes);

// Order routes
app.use("/api/orders", orderRoutes);

// Review routes
app.use("/api/reviews", reviewRoutes);

// Dashboard stats
app.use("/api/dashboard/stats", statsRoutes);

//Dashboard Chart data
app.use("/api/dashboard/chart-data", chartDataRoutes);

// Categories
app.use("/api/categories", getCategoryRoute);

// -------------------
// API root with endpoint list
// -------------------
app.get("/", (req: Request, res: Response) => {
  const apiRoot = `${req.protocol}://${req.get("host")}`;
  const endpoints = {
    auth: [
      { method: "POST", path: "/api/auth/register", description: "Create a new user" },
      { method: "POST", path: "/api/auth/login", description: "Authenticate and set auth cookie" },
      { method: "GET", path: "/api/auth/me", description: "Get authenticated user info from cookie" },
      { method: "POST", path: "/api/auth/logout", description: "Log out user and clear auth cookie" },
    ],
    users: [
      { method: "GET", path: "/api/users", description: "Get all users with pagination", query: ["skip", "limit"] },
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
      { method: "GET", path: "/api/orders", description: "Get all orders with pagination", query: ["skip", "limit"] },
      { method: "GET", path: "/api/orders/:id", description: "Get order by ID" },
      { method: "GET", path: "/api/orders/user/:userId", description: "Get orders for a specific user with pagination", query: ["skip", "limit"] },
      { method: "POST", path: "/api/orders", description: "Create a new order" },
      { method: "PATCH", path: "/api/orders/:id", description: "Update an order" },
      { method: "DELETE", path: "/api/orders/:id", description: "Delete an order" },
    ],
    reviews: [
      { method: "GET", path: "/api/reviews/:productId", description: "Get reviews for a product with pagination", query: ["skip", "limit"] },
      { method: "GET", path: "/api/reviews/my-reviews/:userId", description: "Get reviews by user with pagination", query: ["skip", "limit"] },
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
  };

  return res.json({
    success: true,
    message: "Ecomart API endpoints - organized by resource",
    baseUrl: apiRoot,
    endpoints,
  });
});

// -------------------
// 404 Not Found handler
// -------------------
app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

export default app;