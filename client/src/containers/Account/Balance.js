import React, { Component } from "react";
import { Row } from "reactstrap";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  getBalance,
  getTradeBalance,
  clearBalance,
  clearTradeBalance,
  clearAccount
} from "../../actions/privateUserDataActions";
import { TradeBalance, Balance } from "../../components/Balance";

const clock = 20000;

class AccountBalance extends Component {
  constructor(props) {
    super(props);
    this.state = {
      privateUserData: {},
      errors: {},
      message: {}
    };
  }

  componentDidMount() {
    // this.props.clearAccount();
    this.props.getBalance();

    setTimeout(() => {
      this.props.getTradeBalance();
    }, 1000);

    this.intervalTradeBalance = setInterval(() => {
      this.props.getTradeBalance();
    }, clock + 1000);

    this.intervalBalance = setInterval(() => {
      this.props.getBalance();
    }, clock + 2000);
  }

  componentWillUnmount() {
    clearInterval(this.intervalBalance);
    clearInterval(this.intervalTradeBalance);
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
    let { balance, tradeBalance } = this.state.privateUserData;
    return (
      <div className="animated fadeIn">
        <h1>Balance</h1>
        <Row>
          <TradeBalance data={tradeBalance} />
          <Balance data={balance} />
        </Row>
      </div>
    );
  }
}

AccountBalance.propTypes = {
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
    getBalance,
    getTradeBalance,
    clearBalance,
    clearTradeBalance,
    clearAccount
  }
)(AccountBalance);
