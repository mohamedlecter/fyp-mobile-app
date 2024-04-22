import { combineReducers } from "redux";
import userReducer from "./userReducer";
import plantReducer from "./plantReducer";
import chatBotReducer from "./chatBotReducer";

const rootReducer = combineReducers({
  userReducer,
  plantReducer,
  chatBotReducer,
});

export default rootReducer;
