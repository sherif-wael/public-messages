import axios from "axios";
import {addAlert, addErrors} from "./toastActions";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";
import {SET_CURRENT_USER} from "./types";


//POST request
//data = {username, name, email, password}
//setError message to display errors, expects an error object;
export const signup = (signupData, history, setError) => dispatch => {
    axios
       .post("/api/auth/signup", signupData)
       .then(res => {
           dispatch(addAlert("successfully signed up"))
           history.push("/")
       })
       .catch(err => addErrors(err.response.data.errors, dispatch));
}

//POST request
//data = {email, password}
//navigates to home path "a private route";
export const login = (loginData, history) => dispatch => {
    axios
      .post("/api/auth/login", loginData)
      .then(res => {
          localStorage.setItem("jwt", res.data.token);
          setAuthToken(res.data.token);
          dispatch({type: SET_CURRENT_USER, payload: jwt_decode(res.data.token)})
          history.push("/home");
      })
      .catch(err =>  addErrors(err.response.data.errors, dispatch))
}


export const logout = (history) => dispatch =>{
    localStorage.removeItem("jwt");
    setAuthToken(null);
    dispatch({type: SET_CURRENT_USER, payload: {}})
    history.push("/")
}
