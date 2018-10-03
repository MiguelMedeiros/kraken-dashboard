import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getPairs, clearPairs } from "../../actions/publicMarketDataActions";
import {
  AppSidebar,
  AppSidebarFooter,
  AppSidebarForm,
  AppSidebarHeader,
  AppSidebarNav
} from "@coreui/react";

import groupBy from "../../helpers/groupBy";
import isEmpty from "../../helpers/is-empty";

class DefaultMenu extends Component {
  constructor(props) {
    super(props);

    this.state = {
      publicMarketData: {},
      menuLoaded: false
    };
    this.props.getPairs();
  }

  componentDidMount() {
    this.intervalPairs = setInterval(() => {
      this.props.getPairs();
    }, 4000);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.publicMarketData) {
      this.setState({ publicMarketData: nextProps.publicMarketData });
      if (
        !isEmpty(nextProps.publicMarketData.pairs) &&
        !this.state.menuLoaded
      ) {
        this.setState({ menuLoaded: true });
        clearInterval(this.intervalPairs);
      }
    }
  }

  render() {
    let key = Object.keys(this.props.publicMarketData.pairs);
    let pairsArray = [];
    let navigation = {
      items: [
        {
          title: true,
          name: "Author"
        },
        {
          name: "Developer",
          url: "https://www.miguelmedeiros.com.br",
          icon: "fa fa-hand-peace-o",
          class: "noActiveClass"
        },
        {
          name: "Github Code",
          url: "https://www.miguelmedeiros.com.br",
          icon: "fa fa-github-alt",
          class: "noActiveClass"
        },
        {
          divider: true,
          class: "m-2"
        },
        {
          title: true,
          name: "Account"
        },
        {
          name: "Balance",
          url: "/account/balance",
          icon: "fas fa-balance-scale"
        },
        {
          name: "Ledger",
          url: "/account/ledger",
          icon: "fas fa-book"
        },
        {
          name: "Orders",
          url: "/account/orders",
          icon: "fas fa-exchange-alt"
        },
        {
          divider: true,
          class: "m-2"
        },
        {
          title: true,
          name: "Cryptocurrencies"
        },
        {
          name: "Loading",
          url: "",
          icon: "fas fa-spinner fa-spin"
        }
      ]
    };

    for (let i = 0; i < key.length; i++) {
      if (!key[i].includes(".d")) {
        this.props.publicMarketData.pairs[key[i]].pairName = key[i];
        pairsArray.push(this.props.publicMarketData.pairs[key[i]]);
      }
    }
    if (!isEmpty(pairsArray)) {
      navigation.items.pop();
    }
    let groupedPairs = groupBy(pairsArray, pair => pair.base);
    groupedPairs.forEach((value, key) => {
      let children = [];
      for (let i = 0; i < value.length; i++) {
        children.push({
          icon: "fas fa-coins",
          name: value[i].altname,
          url: "/pair/" + value[i].pairName
        });
      }
      let item = {
        name: key,
        url: "/pair/" + key,
        icon: "fas fa-donate",
        children: children
      };
      navigation.items.push(item);
    });

    return (
      <AppSidebar fixed display="lg">
        <AppSidebarHeader />
        <AppSidebarForm />
        <AppSidebarNav navConfig={navigation} {...this.props} />
        <AppSidebarFooter />
      </AppSidebar>
    );
  }
}

DefaultMenu.propTypes = {
  publicMarketData: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  publicMarketData: state.publicMarketData
});

export default connect(
  mapStateToProps,
  { getPairs, clearPairs }
)(DefaultMenu);
