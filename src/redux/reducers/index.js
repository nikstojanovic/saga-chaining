import { combineReducers } from "redux";
import status from "./status";

const rootReducer = combineReducers({
  status: status
});

export default rootReducer;
