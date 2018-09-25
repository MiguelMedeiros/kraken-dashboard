const keys = require("../config/keys");
const KrakenClient = require("kraken-api");

const kraken = new KrakenClient(keys.apiKey, keys.apiSecret);

let getBalance = (req, res) => {
  (async () => {
    try {
      let balanceInfo = await kraken.api("Balance");
      return res.json(balanceInfo.result);
    } catch (err) {
      console.log("Error Request Account (getBalance): " + err);
    }
  })();
};

let getTradeBalance = (req, res) => {
  (async () => {
    try {
      let balanceInfo = await kraken.api("TradeBalance");
      return res.json(balanceInfo.result);
    } catch (err) {
      console.log("Error Request Account (getTradeBalance): " + err);
    }
  })();
};

let getLedgers = (req, res) => {
  (async () => {
    try {
      let ledgersInfo = await kraken.api("Ledgers");
      return res.json(ledgersInfo.result);
    } catch (err) {
      console.log("Error Request Account (getLedgers): " + err);
    }
  })();
};

let getOpenOrders = (req, res) => {
  (async () => {
    try {
      let openOrdersInfo = await kraken.api("OpenOrders");
      return res.json(openOrdersInfo.result);
    } catch (err) {
      console.log("Error Request Account (getOpenOrders): " + err);
    }
  })();
};

let getClosedOrders = (req, res) => {
  (async () => {
    try {
      let closedOrdersInfo = await kraken.api("ClosedOrders");
      return res.json(closedOrdersInfo.result);
    } catch (err) {
      console.log("Error Request Account (getClosedOrders): " + err);
    }
  })();
};

let getTradesHistory = (req, res) => {
  (async () => {
    try {
      let tradesHistoryInfo = await kraken.api("TradesHistory");
      return res.json(tradesHistoryInfo.result);
    } catch (err) {
      console.log("Error Request Account (getTradesHistory): " + err);
    }
  })();
};

let getOpenPositions = (req, res) => {
  (async () => {
    try {
      let openPositionsInfo = await kraken.api("OpenPositions");
      return res.json(openPositionsInfo.result);
    } catch (err) {
      console.log("Error Request Account (getOpenPositions): " + err);
    }
  })();
};

module.exports = {
  getBalance,
  getTradeBalance,
  getLedgers,
  getOpenOrders,
  getClosedOrders,
  getTradesHistory,
  getOpenPositions
};
