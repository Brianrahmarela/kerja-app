import { createStore, combineReducers, applyMiddleware } from "redux";
import { accountReducer } from "./AccountReducer";
import { notifReducer } from "./NotificationReducer";
import { postReducer } from "./PostReducer";
import thunk from "redux-thunk";
import { workerReducer } from "./WorkerReducer";

const rootReducer = combineReducers({
    account: accountReducer,
    post: postReducer,
    notif: notifReducer,
    worker: workerReducer,
});

export const store = createStore(rootReducer);
export default createStore(rootReducer, applyMiddleware(thunk));
