const express = require("express");
const router = express.Router();

// Load Controllers
const privateUserTradingController = require("../../controllers/privateUserTrading");

router.get("/CancelOrder", privateUserTradingController.cancelOrder);

module.exports = router;
