import React, { Component } from "react";
import { Row } from "reactstrap";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  getLedgers,
  clearLedgers,
  clearAccount
} from "../../actions/privateUserDataActions";
import Ledgers from "../../components/Ledgers/Ledgers";

const clock = 20000;

class AccountLedger extends Component {
  constructor(props) {
    super(props);
    this.state = {
      privateUserData: {},
      errors: {},
      message: {}
    };
    this.props.clearAccount();
  }

  componentDidMount() {
    this.props.getLedgers();

    this.intervalLedger = setInterval(() => {
      this.props.getLedgers();
    }, clock);
  }

  componentWillUnmount() {
    clearInterval(this.intervalLedger);
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
    let { ledgers } = this.state.privateUserData;
    return (
      <div className="animated fadeIn">
        <h1>Ledger</h1>
        <Row>
          <Ledgers data={ledgers} />
        </Row>
      </div>
    );
  }
}

AccountLedger.propTypes = {
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
    getLedgers,
    clearLedgers,
    clearAccount
  }
)(AccountLedger);
