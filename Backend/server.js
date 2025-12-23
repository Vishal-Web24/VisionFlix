import express from "express";
import { connectionToDb } from "./config/db.js";
import dotenv from "dotenv";
dotenv.config();
import bcryptjs from "bcryptjs";
import User from "./models/user.model.js";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import cors from "cors";
const app = express();

// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));

// app.use(cors({ 
//   origin: (origin, callback) => {
//     const allowedOrigins = ['http://localhost:5173', 'http://localhost:5173/'];
//     if (!origin || allowedOrigins.includes(origin)) {
//       callback(null, true);
//     } else {
//       callback(new Error('Not allowed by CORS'));
//     }
//   },
//   credentials: true 
// }));

const PORT = process.env.PORT || 8080;
app.get("/", (req, res) => {
  res.send("Hello World");
});
app.post("/api/signup", async (req, res) => {
  const { username, email, password } = req.body;
  //   console.log( username,password,email);

  try {
    if (!username || !email || !password) {
      throw new Error("All fields are required!");
    }
    const emailExits = await User.findOne({ email });
    if (emailExits) {
      return res.status(400).json({ message: "User already exists" });
    }

    const usernameExits = await User.findOne({ username });
    if (usernameExits) {
      return res.status(400).json({ message: "username is taken " });
    }

    const hashPassword = await bcryptjs.hash(password, 10);

    const userDoc = await User.create({
      username,
      email,
      password: hashPassword,
    });

    //JWT
    if (userDoc) {
      //jwt.sign(payload,secret,options)
      const token = jwt.sign({ id: userDoc._id }, process.env.JWT_SECRET, {
        expiresIn: "7d",
      });
      res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
      });
    }

    return res
      .status(200)
      .json({ user: userDoc, message: "User created successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.post("/api/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const userDoc = await User.findOne({ username });
    if (!userDoc) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }
    const isPasswordValid = bcryptjs.compareSync(password, userDoc.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }
    //JWT
    if (userDoc) {
      //jwt.sign(payload,secret,options)
      const token = jwt.sign({ id: userDoc._id }, process.env.JWT_SECRET, {
        expiresIn: "7d",
      });
      res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
      });
    }
    return res
      .status(200)
      .json({ user: userDoc, message: "Logged in succescfully" });
  } catch (error) {
    console.log("error logging in :", error.message);
    res.status(400).json({ message: error.message });
  }
});

app.get("/api/fetch-user", async (req, res) => {
  const { token } = req.cookies;
  if (!token) {
    return res.status(401).json({ message: "No Token" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return res.status(401).json({ message: "invalid token" });
    }
    const userDoc = await User.findById(decoded.id).select("-password");
    if (!userDoc) {
      return res.status(400).json({ message: "No User Found" });
    }
    res.status(200).json({ user: userDoc });
  } catch (error) {
    console.log("Error in fetching user :", error.message);
    return res.status(400).json({ message: error.message });
  }
});

app.post("/api/logout", async (req, res) => {
  res.clearCookie("token");
  return res.status(200).json({ message: "Logged Out successfully" });
});

app.listen(PORT, () => {
  connectionToDb();
  console.log("Server is running");
});
