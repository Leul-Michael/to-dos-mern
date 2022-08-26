const { Router } = require("express");
const router = Router();
const {
  getLists,
  createList,
  updateList,
  deleteList,
} = require("../controllers/listController");

const { protect } = require("../middleware/authMiddleware");

//
router.route("/").get(protect, getLists).post(protect, createList);
router.route("/:id").delete(protect, deleteList).put(protect, updateList);

module.exports = router;
