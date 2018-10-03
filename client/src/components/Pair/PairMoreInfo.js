import React, { Component } from "react";
import { Card, CardBody, CardHeader, Col, Table } from "reactstrap";
import isEmpty from "../../helpers/is-empty";
import Spinner from "../../components/Spinners/Spinner";

class PairInfo extends Component {
  render() {
    let { ticker, currentPair, pairDecimals } = this.props;

    let volume = <Spinner />;
    let volumeAverage = <Spinner />;
    let numberTrades = <Spinner />;
    let low = <Spinner />;
    let high = <Spinner />;
    let spread = <Spinner />;
    let spreadCurrent = <Spinner />;

    if (
      !isEmpty(ticker) &&
      !isEmpty(currentPair) &&
      !isEmpty(ticker[currentPair])
    ) {
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

    return (
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
    );
  }
}

export default PairInfo;
