import axios from "axios";
import {SET_PROFILE_LOADING, SET_PROFILE_ERRORS, SET_PROFILE, SET_SEARCH_PROFILES} from "./types";
import {addAlert, addErrors} from "./toastActions";

//private route , requires a token
//res.data = {name, username, photo}
//called when navigating to "/home"
export const getCurrentProfile = () => dispatch => {
    dispatch({type: SET_PROFILE_LOADING});
    axios
       .get("/api/profile")
       .then(res => {
           dispatch({type: SET_PROFILE, payload: res.data})
       })
       .catch(err => console.log(err))
}

//not a private route
//res.data = {username, name, photo}
//called when path is "/profile/:id"
export const getProfileById = id => dispatch => {
    dispatch({type: SET_PROFILE_LOADING})
    axios
       .get(`/api/profile/${id}`)
       .then(res => {
           dispatch({type: SET_PROFILE, payload: res.data})
       })
       .catch(err => dispatch({type: SET_PROFILE_ERRORS, payload: err.response.data}))
}

//private route
//newProfileData = {name, usernmae, photo};
export const editCurrentProfile = newProfileData => dispatch => {
    axios
      .put("/api/profile/edit", newProfileData)
      .then(res => {
          let {username, photo, name} = res.data.edittedUser;
          dispatch({type: SET_PROFILE, payload: {username, name, photo}});
          localStorage.setItem("jwt", res.data.edittedUser.token)
          dispatch(addAlert("profile editted"))
      })
      .catch(err => addErrors(err.response.data.errors, dispatch))
}

export const searchUsers = handler => dispatch => {
    dispatch({type: SET_PROFILE_LOADING})
    axios
       .get(`/api/profile/search/${handler}`)
       .then(res => {
           dispatch({type: SET_SEARCH_PROFILES, payload: res.data.users})
       })
       .catch(err => dispatch({type: SET_PROFILE_ERRORS, payload: err.response.data}))
}