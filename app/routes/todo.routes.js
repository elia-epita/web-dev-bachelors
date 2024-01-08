const express = require("express");
const router = express.Router();

const todoServices = require("../services/todo.service");

router.get("/", todoServices.getTodos);
router.post("/", todoServices.addTodo);
router.get("/:index", todoServices.getTodoAtIndex);
router.put("/:index", todoServices.updateTodoAtIndex);

module.exports = router;
