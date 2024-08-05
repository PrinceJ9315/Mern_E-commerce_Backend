import express from "express";
import { connectDB } from "./utils/features.js";
import { errorMiddleware } from "./middlewares/error.js";
import NodeCache from "node-cache";
import { config } from "dotenv";
import morgan from "morgan";
import Stripe from "stripe";
import cors from "cors";
import compression from 'compression';

// Importing Routes
import userRoute from "./routes/user.js";
import productRoute from "./routes/products.js";
import orderRoute from "./routes/order.js";
import paymentRoute from "./routes/payment.js";
import dashboardRoute from './routes/stats.js'

config({
  path: "./.env",
});

const port = process.env.PORT || 5000;
const mongoURI = process.env.MONGO_URI || "";
const stripeKey = process.env.STRIPE_KEY || "";

// Move export statements to the top level
export const stripe = new Stripe(stripeKey);
export const myCache = new NodeCache();

async function startServer() {
  try {
    await connectDB(mongoURI);
    console.log("Database connected successfully");
  } catch (error) {
    console.error("Database connection error:", error);
    process.exit(1);
  }

  const app = express();

  // Middleware
  app.use(express.json());
  app.use(morgan("dev"));
  app.use(compression());

  // CORS Middleware
  app.use(cors({
    origin: 'https://mern-e-commerce-frontend-fjww.onrender.com',
    methods: 'GET, POST, PUT, DELETE',
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  }));

  app.get("/", (req, res) => {
    res.send("API Working with /api/v1");
  });

  // Using Routes
  app.use("/api/v1/user", userRoute);
  app.use("/api/v1/product", productRoute);
  app.use("/api/v1/order", orderRoute);
  app.use("/api/v1/payment", paymentRoute);
  app.use("/api/v1/dashboard", dashboardRoute);

  app.use("/uploads", express.static("uploads"));
  app.use(errorMiddleware);

  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
}

startServer();
