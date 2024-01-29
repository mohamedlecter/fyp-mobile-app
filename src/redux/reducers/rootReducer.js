import { combineReducers } from "redux";
import userReducer from "./userReducer";
import plantReducer from "./plantReducer";

const rootReducer = combineReducers({
  userReducer,
  plantReducer,
});

export default rootReducer;
