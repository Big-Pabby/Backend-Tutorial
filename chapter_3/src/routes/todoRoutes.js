import express from "express";;
import db from "../db.js";

const router = express.Router();

// Get all todos for logged in user
router.get("/", (req, res) => {
  const getTodos = db.prepare("SELECT * FROM todos WHERE user_id = ?");
    const todos = getTodos.all(req.userId);
    res.json(todos);
});
// Create a new todo
router.post("/", (req, res) => {
    const { task } = req.body;
    const insertTodo = db.prepare(
      "INSERT INTO todos (user_id, task) VALUES (?, ?)",
    );
    const result = insertTodo.run(req.userId, task);
    res.status(201).json({ id: result.lastInsertRowid, task, completed: 0 });
});
// Update a todo
router.put("/:id", (req, res) => {
    const { id } = req.params;
    const { task, completed } = req.body;
    const updateTodo = db.prepare(
      "UPDATE todos SET task = ?, completed = ? WHERE id = ? AND user_id = ?",
    );
    updateTodo.run(task, completed, id, req.userId);
    res.json({ id, task, completed });

});
// Delete a todo
router.delete("/:id", (req, res) => {
    const { id } = req.params;
    const deleteTodo = db.prepare(
      "DELETE FROM todos WHERE id = ? AND user_id = ?",
    );
    deleteTodo.run(id, req.userId);
    res.status(204).send();
});

export default router;
