import axios from "axios";
import axiosCancel from "axios-cancel";
import {
  GET_LEDGERS,
  GET_BALANCE,
  GET_TRADE_BALANCE,
  GET_OPEN_ORDERS,
  GET_CLOSED_ORDERS,
  GET_TRADES_HISTORY,
  GET_OPEN_POSITIONS,
  GET_ERRORS,
  CLEAR_BALANCE,
  CLEAR_TRADE_BALANCE,
  CLEAR_ACCOUNT,
  CLEAR_LEDGERS,
  CLEAR_OPEN_ORDERS,
  CLEAR_CLOSED_ORDERS,
  CLEAR_TRADES_HISTORY,
  CLEAR_OPEN_POSITIONS
} from "./types";

axiosCancel(axios, {
  debug: false // default
});

export const getBalance = () => dispatch => {
  axios({
    method: "get",
    requestId: "balance",
    url: "/api/privateUserData/Balance"
  })
    .then(res =>
      dispatch({
        type: GET_BALANCE,
        payload: res.data
      })
    )
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err
      });
    });
};

export const getTradeBalance = () => dispatch => {
  axios({
    method: "get",
    requestId: "tradeBalance",
    url: "/api/privateUserData/TradeBalance"
  })
    .then(res =>
      dispatch({
        type: GET_TRADE_BALANCE,
        payload: res.data
      })
    )
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err
      });
    });
};

export const getLedgers = () => dispatch => {
  axios({
    method: "get",
    requestId: "ledgers",
    url: "/api/privateUserData/Ledgers"
  })
    .then(res =>
      dispatch({
        type: GET_LEDGERS,
        payload: res.data
      })
    )
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err
      });
    });
};

export const getOpenOrders = () => dispatch => {
  axios({
    method: "get",
    requestId: "openOrders",
    url: "/api/privateUserData/OpenOrders"
  })
    .then(res =>
      dispatch({
        type: GET_OPEN_ORDERS,
        payload: res.data
      })
    )
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err
      });
    });
};

export const getClosedOrders = () => dispatch => {
  axios({
    method: "get",
    requestId: "closedOrders",
    url: "/api/privateUserData/ClosedOrders"
  })
    .then(res =>
      dispatch({
        type: GET_CLOSED_ORDERS,
        payload: res.data
      })
    )
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err
      });
    });
};

export const getTradesHistory = () => dispatch => {
  axios({
    method: "get",
    requestId: "tradesHistory",
    url: "/api/privateUserData/TradesHistory"
  })
    .then(res =>
      dispatch({
        type: GET_TRADES_HISTORY,
        payload: res.data
      })
    )
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err
      });
    });
};

export const getOpenPositions = () => dispatch => {
  axios({
    method: "get",
    requestId: "openPositions",
    url: "/api/privateUserData/OpenPositions"
  })
    .then(res =>
      dispatch({
        type: GET_OPEN_POSITIONS,
        payload: res.data
      })
    )
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err
      });
    });
};

export const clearOpenOrders = () => {
  return {
    type: CLEAR_OPEN_ORDERS
  };
};

export const clearClosedOrders = () => {
  return {
    type: CLEAR_CLOSED_ORDERS
  };
};

export const clearTradesHistory = () => {
  return {
    type: CLEAR_TRADES_HISTORY
  };
};

export const clearOpenPositions = () => {
  return {
    type: CLEAR_OPEN_POSITIONS
  };
};

export const clearBalance = () => {
  return {
    type: CLEAR_BALANCE
  };
};

export const clearTradeBalance = () => {
  return {
    type: CLEAR_TRADE_BALANCE
  };
};

export const clearLedgers = () => {
  return {
    type: CLEAR_LEDGERS
  };
};

export const clearAccount = () => {
  return {
    type: CLEAR_ACCOUNT
  };
};
