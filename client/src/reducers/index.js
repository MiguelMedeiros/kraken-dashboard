import { combineReducers } from "redux";
import errorReducer from "./errorReducer";
import messageReducer from "./messageReducer";
import privateUserDataReducer from "./privateUserDataReducer";
import publicMarketDataReducer from "./publicMarketDataReducer";

export default combineReducers({
  privateUserData: privateUserDataReducer,
  publicMarketData: publicMarketDataReducer,
  errors: errorReducer,
  message: messageReducer
});
