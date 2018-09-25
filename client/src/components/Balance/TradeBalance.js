import React, { Component } from "react";
import { Card, CardBody, CardHeader, Col, Table } from "reactstrap";
import isEmpty from "../../helpers/is-empty";
import Spinner from "../Spinners/Spinner";

import "spinkit/css/spinkit.css";

class TradeBalance extends Component {
  render() {
    let { data } = this.props;
    let eb = <Spinner />;
    let tb = <Spinner />;
    let m = <Spinner />;
    let n = <Spinner />;
    let c = <Spinner />;
    let v = <Spinner />;
    let e = <Spinner />;
    let mf = <Spinner />;

    if (!isEmpty(data)) {
      eb = data.eb;
      tb = data.tb;
      m = data.m;
      n = data.n;
      c = data.c;
      v = data.v;
      e = data.e;
      mf = data.mf;
    }

    return (
      <Col lg={6}>
        <Card>
          <CardHeader>
            <strong>
              <i className="fas fa-balance-scale" /> Trade Balance
            </strong>
          </CardHeader>
          <CardBody>
            <Table responsive size="sm" id="pair-info">
              <tbody>
                <tr>
                  <td>Equivalent Balance:</td>
                  <td>
                    <strong>{eb}</strong>
                  </td>
                </tr>
                <tr>
                  <td>Trade Balance:</td>
                  <td>
                    <strong>{tb}</strong>
                  </td>
                </tr>
                <tr>
                  <td>Equity:</td>
                  <td>
                    <strong>{e}</strong>
                  </td>
                </tr>
                <tr>
                  <td>Free Margin:</td>
                  <td>
                    <strong>{mf}</strong>
                  </td>
                </tr>
                <tr>
                  <td>Margin amount of open positions:</td>
                  <td>
                    <strong>{m}</strong>
                  </td>
                </tr>
                <tr>
                  <td>Unrealized net profit/loss of open positions:</td>
                  <td>
                    <strong>{n}</strong>
                  </td>
                </tr>
                <tr>
                  <td>Cost basis of open positions:</td>
                  <td>
                    <strong>{c}</strong>
                  </td>
                </tr>
                <tr>
                  <td>Current floating valuation of open positions:</td>
                  <td>
                    <strong>{v}</strong>
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

export default TradeBalance;
