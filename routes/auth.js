const express = require("express");
const router = express.Router();
const { registerUser, loginUser } = require("../controllers/authController");

// @route   POST /api/users/register
// @desc    Register a new user
router.post("/register", registerUser);

// @route   POST /api/users/login
// @desc    Login and return JWT token
router.post("/login", loginUser);

module.exports = router;








/*const express = require("express");
const router = express.Router();

// @route   GET /api/test
// @desc    Test route
router.get("/test", (req, res) => {
  res.send("Auth route working ✅");
});

module.exports = router;
*/