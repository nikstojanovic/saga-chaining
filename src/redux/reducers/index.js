import { combineReducers } from "redux";
import init from "./init";
import status from "./status";

const rootReducer = combineReducers({
  init: init,
  status: status
});

export default rootReducer;
