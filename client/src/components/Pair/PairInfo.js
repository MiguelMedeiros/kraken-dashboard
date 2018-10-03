import React, { Component } from "react";
import { Row, Col } from "reactstrap";
import isEmpty from "../../helpers/is-empty";
import Widget02 from "../../components/Widgets/Widget02";
import Spinner from "../../components/Spinners/Spinner";

class PairInfo extends Component {
  render() {
    let { ticker, currentPair, pairDecimals } = this.props;

    let ask = <Spinner />;
    let bid = <Spinner />;
    let lastTrade = <Spinner />;
    let volume = <Spinner />;

    if (
      !isEmpty(ticker) &&
      !isEmpty(currentPair) &&
      !isEmpty(ticker[currentPair])
    ) {
      ask = parseFloat(ticker[currentPair].a[0]).toFixed(pairDecimals);
      bid = parseFloat(ticker[currentPair].b[0]).toFixed(pairDecimals);
      lastTrade = parseFloat(ticker[currentPair].c[0]).toFixed(pairDecimals);
      volume = parseFloat(ticker[currentPair].v[1]).toFixed(pairDecimals);
    }

    return (
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
    );
  }
}

export default PairInfo;
