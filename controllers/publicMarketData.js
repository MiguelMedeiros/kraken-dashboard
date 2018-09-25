const keys = require("../config/keys");
const KrakenClient = require("kraken-api");

const kraken = new KrakenClient(keys.apiKey, keys.apiSecret);

let getTicker = (req, res) => {
  (async () => {
    try {
      let pair = req.params.id;
      let tickerInfo = await kraken.api("Ticker", { pair: pair });
      return res.json(tickerInfo.result);
    } catch (err) {
      console.log("Error Request Ticker (getTicker): " + err.path);
    }
  })();
};

let getTrades = (req, res) => {
  (async () => {
    try {
      let pair = req.params.id;
      let tradesInfo = await kraken.api("Trades", { pair: pair });
      return res.json(tradesInfo.result);
    } catch (err) {
      console.log("Error Request Trade (getTradesByPairId): " + err.path);
    }
  })();
};

let getPairs = (req, res) => {
  (async () => {
    try {
      let pairsInfo = await kraken.api("AssetPairs");
      return res.json(pairsInfo.result);
    } catch (err) {
      console.log("Error Request Pair (getPairs): " + err.path);
    }
  })();
};

let getPairsById = (req, res) => {
  (async () => {
    try {
      let pair = req.params.id;
      let pairsInfo = await kraken.api("AssetPairs", { pair: pair });
      return res.json(pairsInfo.result);
    } catch (err) {
      console.log("Error Request Pair (getPairsById): " + err.path);
    }
  })();
};

let getOrderbook = (req, res) => {
  (async () => {
    try {
      let pair = req.params.id;
      let orderbookInfo = await kraken.api("Depth", { pair: pair });
      return res.json(orderbookInfo.result);
    } catch (err) {
      console.log("Error Request Orderbook (getOrderbook): " + err.path);
    }
  })();
};

module.exports = {
  getTicker,
  getTrades,
  getPairs,
  getPairsById,
  getOrderbook
};
