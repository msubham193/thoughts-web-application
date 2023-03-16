const express = require("express");
const {
  register,
  login,
  logout,
  getUserDetails,
  updateUser,
  getSingleUser,
  addFollow,
} = require("../controllers/userController");
const { isAuthenticatedUser } = require("../middlewares/auth");
const router = express.Router();

router.route("/register").post(register);
router.post("/login", login);
router.put("/update", isAuthenticatedUser, updateUser);
router.get("/logout", logout);
router.get("/me", isAuthenticatedUser, getUserDetails);
router.put("/follow/:id", isAuthenticatedUser, addFollow);
router.get("/:id", getSingleUser);

module.exports = router;
