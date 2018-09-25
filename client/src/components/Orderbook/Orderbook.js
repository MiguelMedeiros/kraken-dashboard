import React, { Component } from "react";
import { Card, CardBody, CardHeader, Col, Table } from "reactstrap";
import isEmpty from "../../helpers/is-empty";
import SpinnerSquare from "../Spinners/SpinnerSquare";

import "spinkit/css/spinkit.css";

function DataListRow(props) {
  const data = props.data;
  let price = parseFloat(data[0]).toFixed(props.decimals);
  return (
    <tr>
      <td>{price}</td>
      <td className="text-right">{data[1]}</td>
    </tr>
  );
}

class Orderbook extends Component {
  render() {
    let dataList = this.props.data;
    let name = this.props.name;
    let icon = this.props.icon;
    let decimals = this.props.decimals;
    let loading = "";
    if (isEmpty(dataList)) {
      loading = <SpinnerSquare />;
    }
    return (
      <Col lg={3}>
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
                  </tr>
                </thead>
                <tbody>
                  {dataList &&
                    dataList.map((data, index) => (
                      <DataListRow
                        key={index}
                        data={data}
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

export default Orderbook;
