const Todo = require("../models/Todo");
const List = require("../models/List");
const { handleError } = require("../utils/error");

// Get todos
const getTodos = async (req, res, next) => {
  try {
    const todos = await Todo.find({ user: req.user.id }).sort({
      createdAt: -1,
    });
    res.status(200).json(todos);
  } catch (e) {
    console.log(e.message);
    next(handleError(500, "Error getting to-dos"));
  }
};

// Set todo
const setTodo = async (req, res, next) => {
  try {
    if (
      !req.body ||
      req.body.title === "" ||
      Object.keys(req.body).length === 0
    ) {
      return next(handleError(400, "Please add all fields."));
    }

    const list = await List.findOne({ _id: req.body.list });

    const todo = await Todo.create({
      ...req.body,
      user: req.user._id,
    });
    if (list) {
      todo.list = list;
      await list.save();
    }
    res.status(201).json(todo);
  } catch (e) {
    console.log(e.message);
    next(handleError(500, "Error creating todo, try again."));
  }
};

// Update todo
const updateTodo = async (req, res, next) => {
  let todo;
  try {
    todo = await Todo.findById(req.params.id);

    if (!req.user) {
      return next(handleError(401, "User not found."));
    }

    if (todo.user.toString() !== req.user.id) {
      return next(handleError(401, "Not authorized."));
    }
    const updateTodo = await Todo.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(201).json(updateTodo);
  } catch (e) {
    console.log(e.message);
    if (!todo) {
      return next(handleError(400, "Todo not found"));
    }
    next(handleError(500, "Error updating todo, try again."));
  }
};

// Delete todo
const deleteTodo = async (req, res, next) => {
  let todo;
  try {
    todo = await Todo.findById(req.params.id);

    if (!req.user) {
      return next(handleError(401, "User not found."));
    }

    if (todo.user.toString() !== req.user.id) {
      return next(handleError(401, "Not authorized."));
    }

    await todo.remove();
    res.status(200).json(null);
  } catch (e) {
    console.log(e.message);
    if (!todo) {
      return next(handleError(400, "Todo not found"));
    }
    next(handleError(500, "Error deleting todo, try again."));
  }
};

module.exports = {
  getTodos,
  setTodo,
  updateTodo,
  deleteTodo,
};
