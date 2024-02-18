const express = require("express");
const router = express.Router();
const { addUser, updateUser, getUser, login, getUserSelf, searchUsers } = require("../controllers/users");
const verifyToken = require("../middleware/auth");

router.post("/register", addUser);

router.post("/login", login);

router.patch("/", verifyToken, updateUser);

router.get("/", getUser);

router.get("/self", verifyToken, getUserSelf);

router.get("/search/:query", verifyToken, searchUsers)

module.exports = router;
