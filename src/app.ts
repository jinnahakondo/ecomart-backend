import cors from "cors";
import express, { Application, Request, Response } from "express";
import userRoutes from "./routes/user.route";
import productRoutes from "./routes/product.route";
import reviewRoutes from "./routes/review.route";
import orderRoutes from "./routes/order.route";
import statsRoutes from "./routes/dashoard.stats.route";
const port = 3000;

const app: Application = express();

// Parsers
app.use(express.json());
app.use(cors());

// Application routes

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
