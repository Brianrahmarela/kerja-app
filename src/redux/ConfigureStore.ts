import { createStore } from "redux";
import { combineReducers } from "redux";
import { accountReducer } from "./AccountReducer";

const rootReducer = combineReducers({
  account: accountReducer,
});

export const store = createStore(rootReducer);
