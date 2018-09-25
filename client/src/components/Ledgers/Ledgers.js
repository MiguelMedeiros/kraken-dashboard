import React, { Component } from "react";
import { Card, CardBody, CardHeader, Col, Table } from "reactstrap";
import isEmpty from "../../helpers/is-empty";
import unixTime from "../../helpers/time";
import SpinnerSquare from "../Spinners/SpinnerSquare";

import "spinkit/css/spinkit.css";

function DataListRow(props) {
  const data = props.data;
  let date = unixTime(data.info.time);
  return (
    <tr>
      {/* <td>{data.ledgerId}</td> */}
      <td>{data.info.refid}</td>
      <td className="text-right">{data.info.aclass}</td>
      <td className="text-right">{data.info.asset}</td>
      <td className="text-right">{data.info.type}</td>
      <td className="text-right">{data.info.amount}</td>
      <td className="text-right">{data.info.balance}</td>
      <td className="text-right">{data.info.fee}</td>
      <td className="text-right">{date}</td>
    </tr>
  );
}

class Orderbook extends Component {
  render() {
    let data = this.props.data;
    let loading = "";
    let dataList = [];
    if (isEmpty(data)) {
      loading = <SpinnerSquare />;
    } else {
      let keys = Object.keys(data.ledger);
      for (let i = 0; i < keys.length; i++) {
        dataList.push({
          ledgerId: keys[i],
          info: data.ledger[keys[i]]
        });
      }
    }
    return (
      <Col lg={12}>
        <Card>
          <CardHeader>
            <strong>
              <i className="fas fa-book" /> Ledger
            </strong>
          </CardHeader>
          <CardBody>
            {loading}
            {!loading && (
              <Table responsive size="sm" id="pair-info">
                <thead>
                  <tr>
                    {/* <td>
                      <b>Reference ID</b>
                    </td> */}
                    <td>
                      <b>Reference ID</b>
                    </td>
                    <td className="text-right">
                      <b>Asset Class:</b>
                    </td>
                    <td className="text-right">
                      <b>Asset:</b>
                    </td>
                    <td className="text-right">
                      <b>Type:</b>
                    </td>
                    <td className="text-right">
                      <b>Amount:</b>
                    </td>
                    <td className="text-right">
                      <b>Resulting Balance:</b>
                    </td>
                    <td className="text-right">
                      <b>Transaction Fee:</b>
                    </td>
                    <td className="text-right">
                      <b>Date:</b>
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

export default Orderbook;
