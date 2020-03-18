const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const app = express();
const mongoose = require("mongoose");
const Todo = require("./models/todo");
const compression = require("compression");
app.use(compression());
mongoose.connect("mongodb://localhost:27017/todos", { useNewUrlParser: true });
const db = mongoose.connection;
db.on("error", error => console.error(error));
db.once("open", () => console.log("connected to database"));
app.use(express.static(path.join(__dirname, "client/dist")));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());

app.get("/todos", async (req, res) => {
  try {
    const todos = await Todo.find().sort("completed");
    res.json(todos);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post("/todo", async (req, res) => {
  const todo = new Todo({
    title: req.body.todo
  });

  try {
    const newTodo = await todo.save();
    res.status(201).json(newTodo);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.delete("/todo/:id", async (req, res) => {
  const id = req.params.id;
  const todo = await Todo.findOne({ _id: id });
  if (!todo) {
    return res.status(404).send();
  }
  await todo.delete();
  res.status(201).json(todo);
});

app.get("/todoc/:id", async (req, res) => {
  const id = req.params.id;
  const todo = await Todo.findOne({ _id: id });
  if (!todo) {
    return res.status(404).send();
  }
  todo.completed = true;
  await todo.save();
  res.status(201).json(todo);
});

app.get("/todou/:id", async (req, res) => {
  const id = req.params.id;
  const todo = await Todo.findOne({ _id: id });
  if (!todo) {
    return res.status(404).send();
  }
  todo.completed = false;
  await todo.save();
  res.status(201).json(todo);
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client/dist/index.html"));
});

const PORT = process.env.PORT || 8000;

app.listen(PORT);
