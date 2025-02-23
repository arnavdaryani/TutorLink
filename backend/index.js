import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import openidClient from "express-openid-connect";
import recommendationRouter from './routes/recommendationRoutes.js';
import userRoutes from './routes/userRoutes.js';
import fs from 'fs';
import path from "path";
dotenv.config();

const { auth, requiresAuth } = openidClient;

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.authSECRET,
  baseURL: 'http://localhost:3000',
  clientID: 'SbmbXTIwjTjVaFZwwyGhWRiZRXVnX1BT',
  issuerBaseURL: 'https://dev-063fksim8i2gynsl.us.auth0.com'
};

app.use(auth(config));

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB Connection Error:", err));

// Middleware to make the `user` object available for all views
app.use(function (req, res, next) {
  res.locals.user = req.oidc.user;
  next();
});

// Sample route
app.get("/", (req, res) => {
  res.send("Backend is running!");
  console.log(req.oidc.user);
});

app.get('/profile', requiresAuth(), (req, res) => {
  res.send(JSON.stringify(req.oidc.user));
});

app.use('/api/users', userRoutes);
app.use("/api/recommend-tutors", recommendationRouter);

app.get("/api/get-classes", (req, res) => {
  try {
    // Use import.meta.url to get the directory name and resolve the file path
    const __dirname = path.dirname(new URL(import.meta.url).pathname);
    const filePath = path.join(__dirname, 'db.js', 'classesBySubject.json');
    
    const data = fs.readFileSync(filePath, 'utf-8');
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
