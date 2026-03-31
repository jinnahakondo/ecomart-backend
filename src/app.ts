import cors from "cors";
import express, { Application, Request, Response } from "express";
import userRoutes from "./routes/user.route";
import productRoutes from "./routes/product.route";
import reviewRoutes from "./routes/review.route";
import orderRoutes from "./routes/order.route";
import statsRoutes from "./routes/dashoard.stats.route";
import chartDataRoutes from "./routes/chart.data.route";
import getCategoryRoute from "./routes/category.route";
import authRoute from "./routes/auth/auth.route";
import cookieParser from "cookie-parser";
const port = process.env.PORT;

const app: Application = express();

// Parsers
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://ecomart-frontend-three.vercel.app",
    ],
    credentials: true,
  }),
);

// cookie parser
app.use(cookieParser());


// Application routes
// auth routes
// login
app.use("/api/auth", authRoute);

// user routes
app.use("/api/users", userRoutes);

// product routes
app.use("/api/products", productRoutes);

// order routes
app.use("/api/orders", orderRoutes);

// review routes
app.use("/api/reviews", reviewRoutes);

// review routes
app.use("/api/stats", statsRoutes);

//chart data routes
app.use("/api/dashboard/chart-data", chartDataRoutes);

//get all category routes
app.use("/api/categories", getCategoryRoute);

// Testing route
app.get("/", (req: Request, res: Response) => {
  res.send("Ecomart Server is running!");
});

// Not found route
app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

export default app;
