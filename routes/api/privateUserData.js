const express = require("express");
const router = express.Router();

// Load Controllers
const privateUserDataController = require("../../controllers/privateUserData");

router.get("/Balance", privateUserDataController.getBalance);
router.get("/TradeBalance", privateUserDataController.getTradeBalance);
router.get("/Ledgers", privateUserDataController.getLedgers);
router.get("/OpenOrders", privateUserDataController.getOpenOrders);
router.get("/ClosedOrders", privateUserDataController.getClosedOrders);
router.get("/TradesHistory", privateUserDataController.getTradesHistory);
router.get("/OpenPositions", privateUserDataController.getOpenPositions);

module.exports = router;
