import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import db from "../db.js";

const router = express.Router();
// Register a new user
router.post("/register", async (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 8);
  try {
    const insertUser = db.prepare(
      "INSERT INTO users (username, password) VALUES (?, ?)",
    );
    const result = insertUser.run(username, hashedPassword);

    const defaultTodo = "Hello :), Welcome to your todo list!";
    const insertTodo = db.prepare(
      "INSERT INTO todos (user_id, task) VALUES (?, ?)",
    );
    insertTodo.run(result.lastInsertRowid, defaultTodo);

    // create a JWT token
    const token = jwt.sign(
      { id: result.lastInsertRowid },
      process.env.JWT_SECRET,
      {
        expiresIn: "24h",
      },
    );
    res.status(201).json({ token });
  } catch (err) {
    console.log(err.message);
    res.sendStatus(503);
  }
});
// Login a user
router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const getUser = db.prepare("SELECT * FROM users WHERE username = ?");
    const user = getUser.get(username);
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }
    const passwordMatch = bcrypt.compareSync(password, user.password);
    if (!passwordMatch) {
      return res.status(401).send({ message: "Invalid credentials" });
    }
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });
    res.status(201).json({ token });
  } catch (err) {
    console.log(err.message);
    res.sendStatus(503);
  }
});

export default router;
