import React, { Component } from "react";
import { Card, CardBody, CardHeader, Col, Row, Table } from "reactstrap";
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
import Spinner from "../../components/Spinners/Spinner";
import Orderbook from "../../components/Orderbook/Orderbook";
import Trades from "../../components/Trades/Trades";
import Widget02 from "../../components/Widgets/Widget02";
import TradingViewWidget, { Themes } from "react-tradingview-widget";

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
      this.props.getPair(this.props.match.params.id);
      this.props.getTicker(this.props.match.params.id);
      this.props.getOrderbook(this.props.match.params.id);
      this.props.getTrades(this.props.match.params.id);
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

      this.props.getPair(nextProps.match.params.id);
      this.props.getTicker(nextProps.match.params.id);
      this.props.getOrderbook(nextProps.match.params.id);
      this.props.getTrades(nextProps.match.params.id);
      this.interval = setInterval(() => {
        this.props.getPair(nextProps.match.params.id);
        this.props.getTicker(nextProps.match.params.id);
        this.props.getOrderbook(nextProps.match.params.id);
        this.props.getTrades(nextProps.match.params.id);
      }, clock);
    }
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

    let ask = <Spinner />;
    let bid = <Spinner />;
    let lastTrade = <Spinner />;
    let volume = <Spinner />;
    let volumeAverage = <Spinner />;
    let numberTrades = <Spinner />;
    let low = <Spinner />;
    let high = <Spinner />;
    let spread = <Spinner />;
    let spreadCurrent = <Spinner />;
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
    }

    if (
      !isEmpty(ticker) &&
      !isEmpty(currentPair) &&
      !isEmpty(ticker[currentPair]) &&
      this.props.match.params.id === currentPair
    ) {
      ask = parseFloat(ticker[currentPair].a[0]).toFixed(pairDecimals);
      bid = parseFloat(ticker[currentPair].b[0]).toFixed(pairDecimals);
      lastTrade = parseFloat(ticker[currentPair].c[0]).toFixed(pairDecimals);
      volume = parseFloat(ticker[currentPair].v[1]).toFixed(pairDecimals);
      volumeAverage = parseFloat(ticker[currentPair].p[1]).toFixed(
        pairDecimals
      );
      numberTrades = ticker[currentPair].t[1];
      low = parseFloat(ticker[currentPair].l[1]).toFixed(pairDecimals);
      high = parseFloat(ticker[currentPair].h[1]).toFixed(pairDecimals);
      spread = parseFloat(
        ticker[currentPair].h[1] - ticker[currentPair].l[1]
      ).toFixed(pairDecimals);
      spreadCurrent = parseFloat(
        ticker[currentPair].a[0] - ticker[currentPair].b[0]
      ).toFixed(pairDecimals);
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
      tradesBook = trades[currentPair];
      tradesBook = [].concat(tradesBook).reverse();
    }
    return (
      <div className="animated fadeIn">
        <h1>{this.props.match.params.id}</h1>
        <Row id="featured-cards">
          <Col xs="12" sm="12" lg="6" xl="3">
            <Widget02
              header={lastTrade}
              mainText="Last Trade"
              icon="fas fa-handshake"
              color="primary"
              variant="2"
            />
          </Col>
          <Col xs="12" sm="12" lg="6" xl="3">
            <Widget02
              header={volume}
              mainText="Volume"
              icon="fas fa-fill"
              color="warning"
              variant="2"
            />
          </Col>
          <Col xs="12" sm="12" lg="6" xl="3">
            <Widget02
              header={bid}
              mainText="Last Bid"
              icon="fa fa-arrow-up"
              color="success"
              variant="2"
            />
          </Col>
          <Col xs="12" sm="12" lg="6" xl="3">
            <Widget02
              header={ask}
              mainText="Last Ask"
              icon="fa fa-arrow-down"
              color="danger"
              variant="2"
            />
          </Col>
        </Row>
        <Row>
          <Col lg={6}>
            <Card>
              <CardHeader>
                <strong>
                  <i className="fa fa-info-circle" /> More Informations
                </strong>
              </CardHeader>
              <CardBody>
                <Table responsive size="sm" id="pair-info">
                  <tbody>
                    <tr>
                      <td>High (24h):</td>
                      <td>
                        <strong>{high}</strong>
                      </td>
                    </tr>
                    <tr>
                      <td>Low (24h):</td>
                      <td>
                        <strong>{low}</strong>
                      </td>
                    </tr>
                    <tr>
                      <td>Spread (24h):</td>
                      <td>
                        <strong>{spread}</strong>
                      </td>
                    </tr>
                    <tr>
                      <td>Current Spread:</td>
                      <td>
                        <strong>{spreadCurrent}</strong>
                      </td>
                    </tr>
                    <tr>
                      <td>Weighted Average Price (24h):</td>
                      <td>
                        <strong>{volumeAverage}</strong>
                      </td>
                    </tr>
                    <tr>
                      <td>Volume (24h):</td>
                      <td>
                        <strong>{volume}</strong>
                      </td>
                    </tr>
                    <tr>
                      <td>Number of Trades (24h):</td>
                      <td>
                        <strong>{numberTrades}</strong>
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
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
