import {
  GET_PAIR,
  GET_PAIRS,
  GET_TICKER,
  GET_TRADES,
  GET_ORDERBOOK,
  CLEAR_PAIR,
  CLEAR_PAIRS,
  CLEAR_TICKER,
  CLEAR_TRADES,
  CLEAR_ORDERBOOK
} from "../actions/types";

const initialState = {
  ticker: {},
  trades: {},
  pairs: {},
  pair: {},
  orderbook: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_TICKER:
      return {
        ...state,
        ticker: action.payload
      };
    case GET_TRADES:
      return {
        ...state,
        trades: action.payload
      };
    case GET_PAIRS:
      return {
        ...state,
        pairs: action.payload
      };
    case GET_PAIR:
      return {
        ...state,
        pair: action.payload
      };
    case GET_ORDERBOOK:
      return {
        ...state,
        orderbook: action.payload
      };
    case CLEAR_PAIRS:
      return {
        ...state,
        pairs: {}
      };
    case CLEAR_PAIR:
      return {
        ...state,
        pair: {}
      };
    case CLEAR_TICKER:
      return {
        ...state,
        ticker: {}
      };
    case CLEAR_TRADES:
      return {
        ...state,
        trades: {}
      };
    case CLEAR_ORDERBOOK:
      return {
        ...state,
        orderbook: {}
      };
    default:
      return state;
  }
}
