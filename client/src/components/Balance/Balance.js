import React, { Component } from "react";
import { Card, CardBody, CardHeader, Col, Table } from "reactstrap";
import isEmpty from "../../helpers/is-empty";
import SpinnerSquare from "../Spinners/SpinnerSquare";

import "spinkit/css/spinkit.css";

function DataListRow(props) {
  const data = props.data;
  return (
    <tr>
      <td>{data.pairName}</td>
      <td className="text-right">{data.volume}</td>
    </tr>
  );
}

class Balance extends Component {
  render() {
    let data = this.props.data;
    let loading = "";
    let dataList = [];
    if (isEmpty(data)) {
      loading = <SpinnerSquare />;
    } else {
      let keys = Object.keys(data);
      for (let i = 0; i < keys.length; i++) {
        dataList.push({
          pairName: keys[i],
          volume: data[keys[i]]
        });
      }
    }

    return (
      <Col lg={6}>
        <Card>
          <CardHeader>
            <strong>
              <i className="fas fa-balance-scale" /> Balance
            </strong>
          </CardHeader>
          <CardBody>
            {loading}
            {!loading && (
              <Table responsive size="sm" id="pair-info">
                <thead>
                  <tr>
                    <td>
                      <b>Cryptocurrencies</b>
                    </td>
                    <td className="text-right">
                      <b>Volume</b>
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

export default Balance;
