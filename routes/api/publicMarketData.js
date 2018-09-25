const express = require("express");
const router = express.Router();

// Load Controllers
const publicMarketDataController = require("../../controllers/publicMarketData");

router.get("/Ticker/:id", publicMarketDataController.getTicker);
router.get("/Depth/:id", publicMarketDataController.getOrderbook);
router.get("/Trades/:id", publicMarketDataController.getTrades);
router.get("/AssetPairs", publicMarketDataController.getPairs);
router.get("/AssetPairs/:id", publicMarketDataController.getPairsById);

module.exports = router;
