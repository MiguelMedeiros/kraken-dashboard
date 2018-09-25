// import axios from "axios";
import { GET_MESSAGE, CLEAR_MESSAGE } from "./types";

export const clearMessage = () => {
  return {
    type: CLEAR_MESSAGE
  };
};

export const getMessage = () => {
  return {
    type: GET_MESSAGE
  };
};
