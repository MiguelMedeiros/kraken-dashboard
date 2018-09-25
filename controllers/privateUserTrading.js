const keys = require("../config/keys");
const KrakenClient = require("kraken-api");

const kraken = new KrakenClient(keys.apiKey, keys.apiSecret);

let cancelOrder = (req, res) => {
  (async () => {
    try {
      let cancelOrderInfo = await kraken.api("CancelOrder");
      console.log("aeeeee");
      return res.json(cancelOrderInfo.result);
    } catch (err) {
      console.log("Error Request Trading (cancelOrder): " + err);
    }
  })();
};

module.exports = {
  cancelOrder
};
