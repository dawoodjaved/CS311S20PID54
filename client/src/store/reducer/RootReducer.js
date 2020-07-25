import { combineReducers } from "redux";
import errorReducer from "../reducer/ErrorReducer";
import userAuthReducer from "../reducer/UserAuthReducer";
import recordsReducer from "../reducer/RecordsReducer";

const RootReducer = combineReducers({
  //ES6 Refactoring.
  recordsReducer,
  errorReducer,
  userAuthReducer,
});

export default RootReducer;
