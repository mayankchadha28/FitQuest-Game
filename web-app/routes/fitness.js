const express = require("express");
const router = express.Router();
const { addFitnessDetails, getFitnessDetails } = require("../controllers/fitness");
const verifyToken = require("../middleware/auth");

router.post("/", verifyToken, addFitnessDetails);

router.get("/", verifyToken, getFitnessDetails);

module.exports = router;
