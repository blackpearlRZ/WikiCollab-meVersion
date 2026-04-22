const express = require("express")
const router = express.Router()
const { createSpace } = require("../controllers/spaceController")
const protect = require("../middleware/authMiddleware")

router.post("/", protect, createSpace)

module.exports = router