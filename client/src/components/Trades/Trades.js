import React, { Component } from "react";
import { Card, CardBody, CardHeader, Col, Table } from "reactstrap";
import isEmpty from "../../helpers/is-empty";
import unixTime from "../../helpers/time";
import SpinnerSquare from "../Spinners/SpinnerSquare";

import "spinkit/css/spinkit.css";

function DataListRow(props) {
  const data = props.dataTrades;
  let price = parseFloat(data[0]).toFixed(props.decimals);
  let date = unixTime(data[2], false);
  let buy = "";
  let sell = "";
  let limit = "";
  let market = "";
  if (data[3] === "b") {
    buy = "Buy";
  } else {
    sell = "Sell";
  }
  if (data[4] === "l") {
    limit = "Limit";
  } else {
    market = "Market";
  }
  return (
    <tr>
      <td>{price}</td>
      <td className="text-right">{data[1]}</td>
      <td className="text-center">
        {buy && <span className="badge badge-success">{buy}</span>}
        {sell && <span className="badge badge-danger">{sell}</span>}
      </td>
      <td className="text-center">
        {limit && <span className="badge badge-success">{limit}</span>}
        {market && <span className="badge badge-warning">{market}</span>}
      </td>
      <td className="text-center">{date}</td>
    </tr>
  );
}

class Trades extends Component {
  render() {
    let dataList = this.props.data;
    let name = this.props.name;
    let icon = this.props.icon;
    let decimals = this.props.decimals;
    let loading = "";
    if (isEmpty(dataList)) {
      loading = <SpinnerSquare />;
    } else {
      dataList = dataList.slice(0, 100);
    }
    return (
      <Col lg={6}>
        <Card>
          <CardHeader>
            <strong>
              <i className={icon} /> {name}
            </strong>
          </CardHeader>
          <CardBody>
            {loading}
            {!loading && (
              <Table responsive size="sm" id="pair-info">
                <thead>
                  <tr>
                    <td>
                      <b>Price</b>
                    </td>
                    <td className="text-right">
                      <b>Volume</b>
                    </td>
                    <td className="text-center">
                      <b>Buy/Sell</b>
                    </td>
                    <td className="text-center">
                      <b>Market/Limit</b>
                    </td>
                    <td className="text-center">
                      <b>Time</b>
                    </td>
                  </tr>
                </thead>
                <tbody>
                  {dataList &&
                    dataList.map((data, index) => (
                      <DataListRow
                        key={index}
                        dataTrades={data}
                        decimals={decimals}
                      />
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

export default Trades;
