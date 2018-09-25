import React, { Component } from "react";
import { Card, CardBody, CardHeader, Col, Table } from "reactstrap";
import isEmpty from "../../helpers/is-empty";
import unixTime from "../../helpers/time";
import SpinnerSquare from "../Spinners/SpinnerSquare";

import "spinkit/css/spinkit.css";

function DataListRow(props) {
  const data = props.data;
  let opentm = unixTime(data.opentm);
  let closetm = unixTime(data.closetm);
  let buy = "";
  let sell = "";
  let limit = "";
  let market = "";
  if (data.descr.type === "buy") {
    buy = "Buy";
  } else {
    sell = "Sell";
  }
  if (data.descr.ordertype === "limit") {
    limit = "Limit";
  } else {
    market = "Market";
  }
  return (
    <tr>
      <td>{data.descr.pair}</td>
      <td className="text-center">
        {buy && <span className="badge badge-success">{buy}</span>}
        {sell && <span className="badge badge-danger">{sell}</span>}
      </td>
      <td className="text-center">
        {limit && <span className="badge badge-success">{limit}</span>}
        {market && <span className="badge badge-warning">{market}</span>}
      </td>
      <td className="text-right">{data.descr.price}</td>
      <td className="text-right">{data.descr.leverage}</td>
      <td className="text-right">{data.vol}</td>
      <td className="text-right">{data.vol_exec}</td>
      <td className="text-right">{data.stopprice}</td>
      <td className="text-right">{data.limitprice}</td>
      <td className="text-right">{opentm}</td>
      <td className="text-right">{closetm}</td>
      <td className="text-center">{data.status}</td>
    </tr>
  );
}

class ClosedOrders extends Component {
  render() {
    let data = this.props.data;
    let loading = "";
    let dataList = [];
    if (isEmpty(data)) {
      loading = <SpinnerSquare />;
    } else {
      let keys = Object.keys(data.closed);
      for (let i = 0; i < keys.length; i++) {
        dataList.push(data.closed[keys[i]]);
      }
    }

    return (
      <Col lg={12}>
        <Card>
          <CardHeader>
            <strong>
              <i className="fas fa-door-closed" /> Closed Orders
            </strong>
          </CardHeader>
          <CardBody>
            {loading}
            {!loading && (
              <Table responsive size="sm" id="pair-info">
                <thead>
                  <tr>
                    <td>
                      <b>Pair</b>
                    </td>
                    <td className="text-center">
                      <b>Side</b>
                    </td>
                    <td className="text-center">
                      <b>Type</b>
                    </td>
                    <td className="text-right">
                      <b>Price</b>
                    </td>
                    <td className="text-right">
                      <b>Leverage</b>
                    </td>
                    <td className="text-right">
                      <b>Volume</b>
                    </td>
                    <td className="text-right">
                      <b>Volume Executed</b>
                    </td>
                    <td className="text-right">
                      <b>Stop Price</b>
                    </td>
                    <td className="text-right">
                      <b>Limit Price</b>
                    </td>
                    <td className="text-right">
                      <b>Open Date</b>
                    </td>
                    <td className="text-right">
                      <b>Close Date</b>
                    </td>
                    <td className="text-center">
                      <b>Status</b>
                    </td>
                  </tr>
                </thead>
                <tbody>
                  {dataList &&
                    dataList.map((data, index) => (
                      <DataListRow key={index} data={data} />
                    ))}
                </tbody>
              </Table>
            )}
          </CardBody>
        </Card>
      </Col>
    );
  }
}

export default ClosedOrders;
