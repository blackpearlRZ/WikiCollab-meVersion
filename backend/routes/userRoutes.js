const express = require("express");
const router = express.Router();

const {
  register,
  login,
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser
} = require("../controllers/userController");
const { getMe } = require("../controllers/authController");

const protect = require("../middleware/authMiddleware");
//
// 🔐 AUTH ROUTES (MUST BE FIRST)
//
router.post("/register", register);
router.post("/login", login);

// 👤 USER PROFILE
router.get("/me", protect, getMe);

//
// CRUD ROUTES
//
router.post("/", createUser);
router.get("/", protect, getUsers);

// 👇 IMPORTANT: dynamic route must be LAST
router.get("/:id", getUserById);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

module.exports = router;