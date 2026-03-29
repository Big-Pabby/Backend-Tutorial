import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import db from "../db.js";

const router = express.Router();
// Register a new user
router.post("/register", async (req, res) => {
  const { username, password } = req.body;
});
// Login a user
router.post("/login", async (req, res) => {
  const { username, password } = req.body;
});


export default router;
