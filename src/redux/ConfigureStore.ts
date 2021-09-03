import { createStore, combineReducers, applyMiddleware } from "redux";
import { accountReducer } from "./AccountReducer";
import { notifReducer } from "./NotificationReducer";
import { postReducer } from "./PostReducer";
import thunk from "redux-thunk";

const rootReducer = combineReducers({
    account: accountReducer,
    post: postReducer,
    notif: notifReducer,
});

export const store = createStore(rootReducer);
export default createStore(rootReducer, applyMiddleware(thunk));
