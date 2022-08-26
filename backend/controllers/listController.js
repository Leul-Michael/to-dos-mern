const List = require("../models/List");
const Todo = require("../models/Todo");
const { handleError } = require("../utils/error");

// Get todos
const getLists = async (req, res, next) => {
  try {
    const lists = await List.find({ user: req.user.id }).sort({
      createdAt: -1,
    });
    res.status(200).json(lists);
  } catch (e) {
    console.log(e.message);
    next(handleError(500, "Error getting lists, try again."));
  }
};

// Set todo
const createList = async (req, res, next) => {
  try {
    if (
      !req.body ||
      req.body.name === "" ||
      Object.keys(req.body).length === 0
    ) {
      return next(handleError(400, "Please add all fields."));
    }
    const list = await List.create({ ...req.body, user: req.user._id });
    res.status(201).json(list);
  } catch (e) {
    console.log(e.message);
    next(handleError(500, "Error creating list, try again."));
  }
};

// Update todo
const updateList = async (req, res, next) => {
  let list;
  try {
    list = await List.findById(req.params.id);

    if (!req.user) {
      return next(handleError(401, "User not found"));
    }

    if (list.user.toString() !== req.user.id) {
      return next(handleError(401, "Not authorized"));
    }
    const updateList = await List.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(201).json(updateList);
  } catch (e) {
    console.log(e.message);
    if (!list) {
      return next(handleError(400, "List not found"));
    }
    next(handleError(500, "Error updating list, try again."));
  }
};

// Delete todo
const deleteList = async (req, res, next) => {
  let list;
  try {
    list = await List.findById(req.params.id);

    if (!req.user) {
      return next(handleError(401, "User not found"));
    }

    if (list.user.toString() !== req.user.id) {
      return next(handleError(401, "Not authorized"));
    }

    await Todo.deleteMany({ list: list });
    await list.remove();
    res.status(200).json(null);
  } catch (e) {
    console.log(e.message);
    if (!list) {
      return next(handleError(400, "List not found"));
    }
    next(handleError(500, "Error deleting list, try again."));
  }
};

module.exports = {
  getLists,
  createList,
  updateList,
  deleteList,
};
