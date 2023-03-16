const express = require("express");
const {
  createPost,
  likePost,
  dislikePost,
  getAllPost,
  deletePost,
  getAllTitle,
  bookMarkPost,
  getSinglePost,
  commentPost,
  updatePost,
} = require("../controllers/postController");
const { isAuthenticatedUser } = require("../middlewares/auth");
const router = express.Router();

router.post("/create", isAuthenticatedUser, createPost);
router.get("/titles", getAllTitle);
router.get("/all", getAllPost);
router.get("/:id", getSinglePost);
router.put("/like/:id", isAuthenticatedUser, likePost);
router.put("/comment/:id", isAuthenticatedUser, commentPost);
router.put("/update/:id", isAuthenticatedUser, updatePost);
router.delete("/:id", isAuthenticatedUser, deletePost);
router.put("/bookmark/:id", isAuthenticatedUser, bookMarkPost);

module.exports = router;
