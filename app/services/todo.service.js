const todos = [];

const getTodos = (req, res) => {
  res.status(200).json(todos);
};

const addTodo = (req, res) => {
  const { todo } = req.body;

  if (!todo) {
    return res.status(400).json({ error: "todo not found" });
  }
  todos.push(todo);

  return res.status(200).json(todos);
};

const getTodoAtIndex = (req, res) => {
  const { index } = req.params;

  if (todos.length <= index || index < 0) {
    return res.status(400).json({ error: "index out of bounds" });
  }
  return res.status(200).json({ todo: todos[index] });
};

const updateTodoAtIndex = (req, res) => {
  const { todo } = req.query;
  const { index } = req.params;

  if (todos.length <= index || index < 0) {
    return res.status(400).json({ error: "index out of bounds" });
  }
  if (!todo) {
    return res.status(400).json({ error: "new element is empty" });
  }
  todos[index] = todo;

  return res.status(200).json(todos);
};

module.exports = {
  getTodos,
  addTodo,
  getTodoAtIndex,
  updateTodoAtIndex
};
