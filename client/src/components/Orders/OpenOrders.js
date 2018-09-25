import React, { Component } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Table
  //Button
} from "reactstrap";
import isEmpty from "../../helpers/is-empty";
import unixTime from "../../helpers/time";
import SpinnerSquare from "../Spinners/SpinnerSquare";
// import { cancelOrder } from "../../actions/privateUserTradingActions";

import "spinkit/css/spinkit.css";

function DataListRow(props) {
  const { info, orderID } = props.data;
  let opentm = unixTime(info.opentm);
  let buy = "";
  let sell = "";
  let limit = "";
  let market = "";
  if (info.descr.type === "buy") {
    buy = "Buy";
  } else {
    sell = "Sell";
  }
  if (info.descr.ordertype === "limit") {
    limit = "Limit";
  } else {
    market = "Market";
  }
  return (
    <tr id={"order-" + orderID}>
      <td>{info.descr.pair}</td>
      <td className="text-center">
        {buy && <span className="badge badge-success">{buy}</span>}
        {sell && <span className="badge badge-danger">{sell}</span>}
      </td>
      <td className="text-center">
        {limit && <span className="badge badge-success">{limit}</span>}
        {market && <span className="badge badge-warning">{market}</span>}
      </td>
      <td className="text-right">{info.descr.price}</td>
      <td className="text-right">{info.descr.leverage}</td>
      <td className="text-right">{info.vol}</td>
      <td className="text-right">{info.vol_exec}</td>
      <td className="text-right">{info.stopprice}</td>
      <td className="text-right">{info.limitprice}</td>
      <td className="text-right">{opentm}</td>
      <td className="text-center">{info.status}</td>
      {/* <td className="text-center">
        <Button
          color="danger"
          className="btn-pill cancel-order"
          onClick={() => {
            clickCancelOrder(orderID);
          }}
        >
          <i className="fas fa-times" />
        </Button>
      </td> */}
    </tr>
  );
}

// function clickCancelOrder(orderID) {
//   console.log("order-" + orderID);
//   cancelOrder(orderID);
//   document.getElementById("order-" + orderID).style.display = "none";
// }

class OpenOrders extends Component {
  render() {
    let data = this.props.data;
    let loading = "";
    let dataList = [];
    if (isEmpty(data)) {
      loading = <SpinnerSquare />;
    } else {
      let keys = Object.keys(data.open);
      for (let i = 0; i < keys.length; i++) {
        let dataOrder = {
          info: data.open[keys[i]],
          orderID: keys[i]
        };
        dataList.push(dataOrder);
      }
    }

    return (
      <Col lg={12}>
        <Card>
          <CardHeader>
            <strong>
              <i className="fas fa-door-open" /> Open Orders
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
                    <td className="text-center">
                      <b>Status</b>
                    </td>
                    {/* <td className="text-center">
                      <b>Cancel</b>
                    </td> */}
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

export default OpenOrders;
