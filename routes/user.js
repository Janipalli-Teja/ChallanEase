const express = require('express');
const path = require('path');
const router = express.Router();
// imported functions
const { handleUserSignup, handleUserLogin } = require("../controllers/user");

router.get("/signup", (req, res) => {
    return res.sendFile(path.join(__dirname, "../public/pages/signup.html"));
});

router.get("/login", (req, res) => {
    return res.sendFile(path.join(__dirname, "../public/pages/login.html"));
});

router.post("/signup", handleUserSignup); // Signup Route
router.post("/login", handleUserLogin); // Login Route

module.exports = router;


