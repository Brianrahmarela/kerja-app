import { createStore } from "redux";
import { combineReducers } from "redux";
import { accountReducer } from "./AccountReducer";
import { notifReducer } from "./NotificationReducer";
import { postReducer } from "./PostReducer";

const rootReducer = combineReducers({
  account: accountReducer,
  post: postReducer,
  notif: notifReducer
});

export const store = createStore(rootReducer);
