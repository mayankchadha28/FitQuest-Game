const express = require("express");
const router = express.Router();
const { followUser, getFollowCount } = require("../controllers/follow");
const verifyToken = require("../middleware/auth");

router.post("/", verifyToken, followUser);

router.get("/count", verifyToken, getFollowCount);

module.exports = router;
