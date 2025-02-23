import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import pkg from "express-openid-connect";
const { auth, requiresAuth } = pkg;
import recommendationRouter from "./routes/recommendationRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import fs from "fs";
import { fileURLToPath } from "url";
import path from "path";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Configure CORS to allow requests from your frontend
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// Parse JSON bodies and cookies
app.use(express.json());
app.use(cookieParser());

// Auth0 configuration using a custom callback route
const config = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.authSECRET,
  baseURL: "http://localhost:3000",
  clientID: "SbmbXTIwjTjVaFZwwyGhWRiZRXVnX1BT",
  issuerBaseURL: "https://dev-063fksim8i2gynsl.us.auth0.com",
  routes: {
    // Set a custom callback route
    callback: "/custom-callback",
  },
};

app.use(auth(config));

mongoose .connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true }) .then(() => console.log("MongoDB Connected")) .catch((err) => console.error("MongoDB Connection Error:", err));

// Custom login route
// This route accepts a returnTo query parameter, stores it in a cookie, and then redirects to the default /login endpoint.
app.get("/custom-login", (req, res) => {
  const returnTo = req.query.returnTo || "http://localhost:5173/SelectOption";
  // Store returnTo in a cookie so it can be used after login
  res.cookie("returnTo", returnTo, { httpOnly: true });
  res.redirect("/login");
});

// Custom callback route
// After authentication, Auth0 will redirect to this route.
// It reads the returnTo value from the cookie (if present), clears the cookie, and then redirects the user to that URL.
app.get("/custom-callback", (req, res) => {
  const returnTo = req.cookies.returnTo || "http://localhost:5173/";
  res.clearCookie("returnTo");
  res.redirect(returnTo);
});

// Middleware to expose the user object in responses
app.use((req, res, next) => {
  res.locals.user = req.oidc.user;
  next();
});

// Basic route to verify the backend is running
app.get("/", (req, res) => {
  res.send("Backend is running!");
  console.log("User:", req.oidc.user);
});

// Protected route example
app.get("/profile", requiresAuth(), (req, res) => {
  res.send(JSON.stringify(req.oidc.user));
});

// API routes
app.use("/api/users", userRoutes);
app.use("/api/recommend-tutors", recommendationRouter);

// Endpoint to fetch classes from a local JSON file
app.get("/api/get-classes", (req, res) => {
  try {
    const __dirname = path.dirname(new URL(import.meta.url).pathname);
    const filePath = path.join(__dirname, "db.js", "individualClasses.json");
    const data = fs.readFileSync(filePath, "utf-8");
    const parsedData = JSON.parse(data);
    res.json(parsedData);
  } catch (error) {
    console.error("Error loading classes:", error);
    res.status(500).send("Failed to load classes");
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
