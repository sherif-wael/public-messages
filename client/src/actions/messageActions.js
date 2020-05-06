import axios from "axios";
import {SET_MESSAGES, SET_MESSAGE_LOADING, SET_MESSAGE_ERRORS, ADD_MESSAGE, REMOVE_MESSAGE, SET_MESSAGES_COUNT} from "../actions/types";
import {addAlert, addErrors} from "./toastActions";

//get all messages
//when navigating to "/messages";
//doesn't require a token
export const getAllMessages = (skip, limit) => dispatch => {
    dispatch({type: SET_MESSAGE_LOADING})
    axios
      .get(`/api/message/all/?skip=${skip}&limit=${limit}`)
      .then(res => {
          dispatch({type: SET_MESSAGES_COUNT, payload: res.data.count})
          dispatch({type: SET_MESSAGES, payload: res.data.messages});
      })
      .catch(err => addErrors(err.response.data.errors, dispatch))
}

//get messages sent by current user , require a token
// path = "/home"
export const getMessagesSentByUser = () => dispatch => {
    dispatch({type: SET_MESSAGE_LOADING})
    axios
       .get(`/api/message/user/sent`)
       .then(res => {
           dispatch({type: SET_MESSAGES, payload: res.data.messages})
       })
       .catch(err => addErrors(err.response.data.errors, dispatch))
}

//get messages recieved by current user , require a token
// path = "/home"
export const getMessagesRecievedByUser = () => dispatch =>{
    dispatch({type: SET_MESSAGE_LOADING})
    axios
      .get(`/api/message/user/recieved`)
      .then(res => {
          dispatch({type: SET_MESSAGES, payload: res.data.messages})
      })
      .catch(err => addErrors(err.response.data.errors, dispatch))
}

//messageData = {reciever, body}
//res.data = {message: {reciever, author, body}}
//private route, requires a token
export const createMessage = (messageData) => dispatch => {
    axios
       .post("/api/message/create", messageData)
       .then(res => {
           dispatch({type: ADD_MESSAGE, payload: res.data.message})
           dispatch(addAlert("message created"))
       })
       .catch(err => addErrors(err.response.data.errors, dispatch))
}


export const deleteMessage = id => dispatch => {
    axios
       .get(`/api/message/delete/${id}`)
       .then(res => {
           dispatch({type: REMOVE_MESSAGE, payload: res.data.message._id})
           dispatch(addAlert("message deleted"))
       })
       .catch(err => addErrors(err.response.data.errors, dispatch))
}


export const getMessagesByUsername = username => dispatch => {
    dispatch({type: SET_MESSAGE_LOADING})
    axios
      .get(`/api/message/recieved/${username}`)
      .then(res => {
          dispatch({type: SET_MESSAGES, payload: res.data.messages})
      })
      .catch(err => addErrors(err.response.data.errors, dispatch))
}