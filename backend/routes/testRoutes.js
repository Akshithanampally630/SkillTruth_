const express = require("express");
const router = express.Router();
const { startTest, submitTest } = require("../controllers/testController");

router.post("/start", startTest);
router.post("/submit", submitTest);

module.exports = router;