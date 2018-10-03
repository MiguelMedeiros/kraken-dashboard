import axios from "axios";
import axiosCancel from "axios-cancel";
import {
  //CANCEL_ORDER,
  GET_ERRORS
} from "./types";

axiosCancel(axios, {
  debug: false // default
});

export const cancelOrder = orderID => dispatch => {
  axios({
    method: "get",
    requestId: "cancelOrder",
    url: "/api/privateUserTrading/CancelOrder/" + orderID
  })
    .then(res => console.log(res))
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err
      });
    });
};
