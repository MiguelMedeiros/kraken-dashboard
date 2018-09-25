import React, { Component } from "react";
import { Card, CardBody, CardHeader, Col, Table } from "reactstrap";
import isEmpty from "../../helpers/is-empty";
import unixTime from "../../helpers/time";
import SpinnerSquare from "../Spinners/SpinnerSquare";

import "spinkit/css/spinkit.css";

function DataListRow(props) {
  const data = props.data;
  let date = unixTime(data.time);
  let buy = "";
  let sell = "";
  let limit = "";
  let market = "";
  if (data.type === "buy") {
    buy = "Buy";
  } else {
    sell = "Sell";
  }
  if (data.ordertype === "limit") {
    limit = "Limit";
  } else {
    market = "Market";
  }
  return (
    <tr>
      <td>{data.ordertxid}</td>
      <td className="">{data.pair}</td>
      <td className="text-center">
        {buy && <span className="badge badge-success">{buy}</span>}
        {sell && <span className="badge badge-danger">{sell}</span>}
      </td>
      <td className="text-center">
        {limit && <span className="badge badge-success">{limit}</span>}
        {market && <span className="badge badge-warning">{market}</span>}
      </td>
      <td className="text-right">{data.price}</td>
      <td className="text-right">{data.vol}</td>
      <td className="text-right">{data.cost}</td>
      <td className="text-right">{data.fee}</td>
      <td className="text-right">{data.margin}</td>
      {/* <td className="text-right">{data.misc}</td>
      <td className="text-right">{data.postxid}</td> */}
      <td className="text-right">{date}</td>
    </tr>
  );
}

class TradeHistory extends Component {
  render() {
    let data = this.props.data;
    let loading = "";
    let dataList = [];
    if (isEmpty(data)) {
      loading = <SpinnerSquare />;
    } else {
      let keys = Object.keys(data.trades);
      for (let i = 0; i < keys.length; i++) {
        dataList.push(data.trades[keys[i]]);
      }
    }

    return (
      <Col lg={12}>
        <Card>
          <CardHeader>
            <strong>
              <i className="fas fa-history" /> Trade History
            </strong>
          </CardHeader>
          <CardBody>
            {loading}
            {!loading && (
              <Table responsive size="sm" id="pair-info">
                <thead>
                  <tr>
                    <td>
                      <b>Order ID</b>
                    </td>
                    <td className="">
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
                      <b>Volume</b>
                    </td>
                    <td className="text-right">
                      <b>Cost</b>
                    </td>
                    <td className="text-right">
                      <b>Fee</b>
                    </td>
                    <td className="text-right">
                      <b>Margin</b>
                    </td>
                    {/* {/* <td className="text-right">
                      <b>Misc:</b>
                    </td>
                    <td className="text-right">
                      <b>Postxid:</b> 
                    </td>*/}
                    <td className="text-right">
                      <b>Date</b>
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

export default TradeHistory;
