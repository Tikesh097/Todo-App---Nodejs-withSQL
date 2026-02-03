const express = require("express");
const db = require("../config/db");

const router = express.Router();

//CREATE Todo (POST)
router.post("/", async (req, res) => {
  try {
    const { title } = req.body;

    const [result] = await db.execute(
      "INSERT INTO todos (title) VALUES (?)",
      [title]
    );

    res.status(201).json({
      id: result.insertId,
      title,
      completed: false
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//GET All Todos
router.get("/", async (req, res) => {
  try {
    const [todos] = await db.execute("SELECT * FROM todos");
    res.json(todos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//UPDATE Todo
router.put("/:id", async (req, res) => {
  try {
    const { completed } = req.body;
    const { id } = req.params;

    await db.execute(
      "UPDATE todos SET completed = ? WHERE id = ?",
      [completed, id]
    );

    res.json({ message: "Todo updated" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//DELETE Todo
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    await db.execute("DELETE FROM todos WHERE id = ?", [id]);

    res.json({ message: "Todo deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;