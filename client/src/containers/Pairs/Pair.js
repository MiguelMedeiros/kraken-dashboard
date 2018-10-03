import React, { Component } from "react";
import { Col, Row } from "reactstrap";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  getPair,
  getTicker,
  getOrderbook,
  getTrades,
  clearPair,
  clearTicker,
  clearOrderbook,
  clearTrades
} from "../../actions/publicMarketDataActions";

import isEmpty from "../../helpers/is-empty";
import Orderbook from "../../components/Orderbook/Orderbook";
import Trades from "../../components/Trades/Trades";
import TradingViewWidget, { Themes } from "react-tradingview-widget";
import PairInfo from "../../components/Pair/PairInfo";
import PairMoreInfo from "../../components/Pair/PairMoreInfo";

const clock = 3500;

class Pair extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPair: "",
      publicMarketData: {}
    };
  }

  componentDidMount() {
    this.props.clearPair();
    this.setState({ currentPair: this.props.match.params.id });
    this.interval = setInterval(() => {
      this.getData(this.props.match.params.id);
    }, clock);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
    if (nextProps.message) {
      this.setState({ message: nextProps.message });
    }
    if (nextProps.publicMarketData) {
      this.setState({ publicMarketData: nextProps.publicMarketData });
    }
    if (nextProps.match.params.id !== this.state.currentPair) {
      clearInterval(this.interval);
      this.props.clearPair();
      this.props.clearTicker();
      this.props.clearOrderbook();
      this.props.clearTrades();

      // Current Pair
      this.setState({ currentPair: nextProps.match.params.id });
      this.getData(nextProps.match.params.id);
      this.interval = setInterval(() => {
        this.getData(nextProps.match.params.id);
      }, clock);
    }
  }

  async getData(id) {
    await this.props.getPair(id);
    await this.props.getTicker(id);
    await this.props.getOrderbook(id);
    await this.props.getTrades(id);
  }
  render() {
    let currentPair = this.state.currentPair;
    let {
      ticker,
      orderbook,
      pair,
      pairs,
      trades
    } = this.state.publicMarketData;

    let orderbookAsks = "";
    let orderbookBids = "";
    let tradingViewCode = "";
    let tradesBook = "";
    let pairDecimals = 2;

    if (
      !isEmpty(pairs) &&
      !isEmpty(currentPair) &&
      !isEmpty(pairs[currentPair]) &&
      !isEmpty(pairs[currentPair].altname)
    ) {
      tradingViewCode = "KRAKEN:" + pairs[currentPair].altname;
    }

    if (
      !isEmpty(pair) &&
      !isEmpty(currentPair) &&
      !isEmpty(pair[currentPair]) &&
      !isEmpty(pair[currentPair].pair_decimals)
    ) {
      pairDecimals = pair[currentPair].pair_decimals;
      if (pairDecimals > 4) {
        pairDecimals = 4;
      }
    }

    if (
      !isEmpty(orderbook) &&
      !isEmpty(currentPair) &&
      !isEmpty(orderbook[currentPair]) &&
      this.props.match.params.id === currentPair
    ) {
      orderbookAsks = orderbook[currentPair].asks;
      orderbookBids = orderbook[currentPair].bids;
    }

    if (
      !isEmpty(trades) &&
      !isEmpty(currentPair) &&
      !isEmpty(trades[currentPair]) &&
      this.props.match.params.id === currentPair
    ) {
      tradesBook = [].concat(trades[currentPair]).reverse();
    }

    return (
      <div className="animated fadeIn">
        <h1>{this.props.match.params.id}</h1>
        <PairInfo
          ticker={ticker}
          currentPair={currentPair}
          pairDecimals={pairDecimals}
        />
        <Row>
          <PairMoreInfo
            ticker={ticker}
            currentPair={currentPair}
            pairDecimals={pairDecimals}
          />
          <Col lg={6} id="pair-trading-view">
            {tradingViewCode && (
              <TradingViewWidget
                symbol={tradingViewCode}
                theme={Themes.LIGHT}
                locale="en"
                autosize
              />
            )}
          </Col>
        </Row>
        <Row>
          <Orderbook
            icon="fa fa-arrow-up"
            name="Bids Orderbook"
            data={orderbookBids}
            decimals={pairDecimals}
          />
          <Orderbook
            icon="fa fa-arrow-down"
            name="Asks Orderbook"
            data={orderbookAsks}
            decimals={pairDecimals}
          />
          <Trades
            icon="far fa-handshake"
            name="Last Trades"
            data={tradesBook}
            decimals={pairDecimals}
          />
        </Row>
      </div>
    );
  }
}

Pair.propTypes = {
  publicMarketData: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  publicMarketData: state.publicMarketData
});

export default connect(
  mapStateToProps,
  {
    getPair,
    getTicker,
    getTrades,
    getOrderbook,
    clearPair,
    clearTicker,
    clearTrades,
    clearOrderbook
  }
)(Pair);
