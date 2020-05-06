import {createStore, combineReducers, applyMiddleware} from "redux";
import thunk from "redux-thunk";
import authReducer from "./authReducer";
import profileReducer from "./profileReducer";
import messageReducer from "./messageReducer";
import alertReducer from "./alertReducer";

const middleware = applyMiddleware(thunk)
const rootReducer = combineReducers({
    auth: authReducer,
    profile: profileReducer,
    message: messageReducer,
    alert: alertReducer
})

const store = createStore(rootReducer, middleware);

export default store