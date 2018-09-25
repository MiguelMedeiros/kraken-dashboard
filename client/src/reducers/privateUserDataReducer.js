import {
  GET_BALANCE,
  GET_TRADE_BALANCE,
  GET_LEDGERS,
  GET_OPEN_ORDERS,
  GET_CLOSED_ORDERS,
  GET_TRADES_HISTORY,
  GET_OPEN_POSITIONS,
  CLEAR_OPEN_ORDERS,
  CLEAR_CLOSED_ORDERS,
  CLEAR_TRADES_HISTORY,
  CLEAR_OPEN_POSITIONS,
  CLEAR_LEDGERS,
  CLEAR_BALANCE,
  CLEAR_TRADE_BALANCE,
  CLEAR_ACCOUNT
} from "../actions/types";

const initialState = {
  balance: {},
  tradeBalance: {},
  ledgers: {},
  openOrders: {},
  closedOrders: {},
  tradesHistory: {},
  openPositions: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_BALANCE:
      return {
        ...state,
        balance: action.payload
      };
    case GET_TRADE_BALANCE:
      return {
        ...state,
        tradeBalance: action.payload
      };
    case GET_LEDGERS:
      return {
        ...state,
        ledgers: action.payload
      };
    case GET_OPEN_ORDERS:
      return {
        ...state,
        openOrders: action.payload
      };
    case GET_CLOSED_ORDERS:
      return {
        ...state,
        closedOrders: action.payload
      };
    case GET_TRADES_HISTORY:
      return {
        ...state,
        tradesHistory: action.payload
      };
    case GET_OPEN_POSITIONS:
      return {
        ...state,
        openPositions: action.payload
      };
    case CLEAR_BALANCE:
      return {
        ...state,
        balance: {}
      };
    case CLEAR_TRADE_BALANCE:
      return {
        ...state,
        tradeBalance: {}
      };
    case CLEAR_LEDGERS:
      return {
        ...state,
        ledgers: {}
      };
    case CLEAR_OPEN_ORDERS:
      return {
        ...state,
        openOrders: {}
      };
    case CLEAR_CLOSED_ORDERS:
      return {
        ...state,
        closedOrders: {}
      };
    case CLEAR_TRADES_HISTORY:
      return {
        ...state,
        tradesHistory: {}
      };
    case CLEAR_OPEN_POSITIONS:
      return {
        ...state,
        openPositions: {}
      };
    case CLEAR_ACCOUNT:
      return initialState;
    default:
      return state;
  }
}
