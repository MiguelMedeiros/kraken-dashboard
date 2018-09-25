import React, { Component } from "react";
import { Row } from "reactstrap";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  getOpenOrders,
  getClosedOrders,
  getTradesHistory,
  clearOpenOrders,
  clearClosedOrders,
  clearTradesHistory,
  clearOpenPositions,
  clearAccount
} from "../../actions/privateUserDataActions";
import {
  ClosedOrders,
  OpenOrders,
  TradeHistory
} from "../../components/Orders";

const clock = 20000;

class AccountOrders extends Component {
  constructor(props) {
    super(props);
    this.state = {
      privateUserData: {},
      errors: {},
      message: {}
    };
  }

  componentDidMount() {
    this.props.getOpenOrders();

    setTimeout(() => {
      this.props.getClosedOrders();
    }, 1000);

    setTimeout(() => {
      this.props.getTradesHistory();
    }, 2000);

    this.intervalOpenOrders = setInterval(() => {
      this.props.getOpenOrders();
    }, clock + 1000);

    this.intervalClosedOrders = setInterval(() => {
      this.props.getClosedOrders();
    }, clock + 2000);

    this.intervalTradesHistory = setInterval(() => {
      this.props.getTradesHistory();
    }, clock + 3000);
  }

  componentWillUnmount() {
    clearInterval(this.intervalOpenOrders);
    clearInterval(this.intervalClosedOrders);
    clearInterval(this.intervalTradesHistory);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.privateUserData) {
      this.setState({ privateUserData: nextProps.privateUserData });
    }
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
    if (nextProps.message) {
      this.setState({ message: nextProps.message });
    }
  }
  render() {
    let {
      openOrders,
      tradesHistory,
      closedOrders
    } = this.state.privateUserData;
    return (
      <div className="animated fadeIn">
        <h1>Orders</h1>
        <Row>
          <ClosedOrders data={closedOrders} />
          <OpenOrders data={openOrders} />
          <TradeHistory data={tradesHistory} />
        </Row>
      </div>
    );
  }
}

AccountOrders.propTypes = {
  privateUserData: PropTypes.object.isRequired,
  message: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  privateUserData: state.privateUserData,
  message: state.message,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  {
    getOpenOrders,
    getClosedOrders,
    getTradesHistory,
    clearOpenOrders,
    clearClosedOrders,
    clearTradesHistory,
    clearOpenPositions,
    clearAccount
  }
)(AccountOrders);
