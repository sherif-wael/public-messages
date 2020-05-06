import React from "react";
import store from "../reducers/index";
import {BrowserRouter as Router} from "react-router-dom";
import {Provider} from "react-redux";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";
import {SET_CURRENT_USER} from "../actions/types";
import Routes from "./routes/Routes";
import Navbar from "./layout/Navbar";

let token;
if(token = localStorage.getItem("jwt")){
    let decoded = jwt_decode(token)
    setAuthToken(token);
    store.dispatch({type: SET_CURRENT_USER, payload: decoded});
}

const App = () => {
    return (
        <Router>
            <Provider store={store}>
                    <Navbar />
                    <Routes />
            </Provider>
        </Router>
    )
}

export default App