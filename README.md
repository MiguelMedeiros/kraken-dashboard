# Kraken Dashboard

[![NPM](https://img.shields.io/david/MiguelMedeiros/kraken-dashboard.svg?style=flat-square)](https://david-dm.org/MiguelMedeiros/kraken-dashboard#info=dependencies)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat-square)](https://github.com/MiguelMedeiros/kraken-dashboard)
[![Known Vulnerabilities](https://snyk.io/test/github/MiguelMedeiros/kraken-dashboard/badge.svg?style=flat-square)](https://snyk.io/test/github/MiguelMedeiros/kraken-dashboard)

## Features

- Balance:
  - Balance
  - Trade Balance
- Ledger:
  - Ledger History
- Orders:
  - Open Orders
  - Closed Orders
  - Trade History
- Cryptocurrencies:
  - Informations: last trade, volume, last bid, last ask, high, low, etc
  - Charts
  - Last Trades
  - Ask Orderbook
  - Bid Orderbook

## Packages

- Kraken REST API
- NodeJS
- Express
- React
- Redux
- SASS
- Bootstrap
- FontAwesome

## Installation

### Clone repo

```bash
# clone the repo
$ git clone https://github.com/MiguelMedeiros/kraken-dashboard.git kraken-dashboard
```

### Install dependencies

```bash
# install back-end dependencies
$ cd kraken-dashboard
$ npm install

# install frond-ent dependencies
$ cd kraken-dashboard/client
$ npm install
```

### Configure Kraken API Credencials

Open the file: **./config/keys.js**

```javascript
module.exports = {
  apiKey: "YOUR-API-KEY",
  apiSecret: "YOUR-SECRET-API"
};
```

### Basic usage

```bash
$ npm run react
```

Navigate to [http://localhost:3000](http://localhost:3000).

## REST API Endpoints

- Public Market Data
  - Get asset info
  - Get tradable asset pairs
  - Get ticker information
  - Get order book
  - Get recent trades
- Private User Data
  - Get account balance
  - Get trade balance
  - Get open orders
  - Get closed orders
  - Get trades history
  - Get open positions
  - Get ledgers info
- Private User Trading
  - Cancel open order (comming soon)
  - Add standard order (comming soon)

## Creator

**Miguel Medeiros**

- <https://www.youtube.com/user/miguelmedeiros>
- <https://www.miguelmedeiros.com.br>
- <https://github.com/miguelmedeirosweb>
- <https://twitter.com/_miguelmedeiros>

## LICENSE [MIT](LICENSE)
