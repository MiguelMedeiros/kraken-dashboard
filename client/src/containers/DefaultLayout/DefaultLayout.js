import React, { Component } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { Container } from "reactstrap";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getPairs, clearPairs } from "../../actions/publicMarketDataActions";
import {
  AppAside,
  AppBreadcrumb,
  AppFooter,
  AppHeader,
  AppSidebar,
  AppSidebarFooter,
  AppSidebarForm,
  AppSidebarHeader,
  AppSidebarNav
} from "@coreui/react";
// routes config
import routes from "../../routes";

import DefaultAside from "./DefaultAside";
import DefaultFooter from "./DefaultFooter";
import DefaultHeader from "./DefaultHeader";

function groupBy(list, keyGetter) {
  const map = new Map();
  list.forEach(item => {
    const key = keyGetter(item);
    const collection = map.get(key);
    if (!collection) {
      map.set(key, [item]);
    } else {
      collection.push(item);
    }
  });
  return map;
}

class DefaultLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      publicMarketData: {}
    };
  }
  componentDidMount() {
    this.props.getPairs();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.publicMarketData) {
      this.setState({ publicMarketData: nextProps.publicMarketData });
    }
  }

  render() {
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
        }
      ]
    };

    let key = Object.keys(this.props.publicMarketData.pairs);
    let pairsArray = [];
    for (let i = 0; i < key.length; i++) {
      if (!key[i].includes(".d")) {
        this.props.publicMarketData.pairs[key[i]].pairName = key[i];
        pairsArray.push(this.props.publicMarketData.pairs[key[i]]);
      }
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
      <div className="app">
        <AppHeader fixed>
          <DefaultHeader />
        </AppHeader>
        <div className="app-body">
          <AppSidebar fixed display="lg">
            <AppSidebarHeader />
            <AppSidebarForm />
            <AppSidebarNav navConfig={navigation} {...this.props} />
            <AppSidebarFooter />
          </AppSidebar>
          <main className="main">
            <AppBreadcrumb appRoutes={routes} />
            <Container fluid>
              <Switch>
                {routes.map((route, idx) => {
                  return route.component ? (
                    <Route
                      key={idx}
                      path={route.path}
                      exact={route.exact}
                      name={route.name}
                      render={props => <route.component {...props} />}
                    />
                  ) : null;
                })}
                <Redirect from="/" to="/account/balance" />
              </Switch>
            </Container>
          </main>
          <AppAside fixed hidden>
            <DefaultAside />
          </AppAside>
        </div>
        <AppFooter>
          <DefaultFooter />
        </AppFooter>
      </div>
    );
  }
}

DefaultLayout.propTypes = {
  publicMarketData: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  publicMarketData: state.publicMarketData
});

export default connect(
  mapStateToProps,
  { getPairs, clearPairs }
)(DefaultLayout);
