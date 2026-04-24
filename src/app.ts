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
import generateDescriptionRoute from "./routes/ai/generate-description.route";
import { endpoints } from "./utils/endpointsData";

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

// AI Routes
app.use("/api/ai", generateDescriptionRoute);

// -------------------
// API root with endpoint list
// -------------------
app.get("/", (req: Request, res: Response) => {
  const apiRoot = `${req.protocol}://${req.get("host")}`;

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