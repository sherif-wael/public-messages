import {ADD_ALERT, REMOVE_ALERT} from "../actions/types";
import {v4} from "uuid";

export const addAlert = msg => dispatch => {
    let alert = {msg, id: v4()}
    dispatch({type: ADD_ALERT, payload: alert});
    setTimeout(() => {
        dispatch({type: REMOVE_ALERT, payload: alert.id})
    }, 1700)
}

export const addErrors = (errors, dispatch) => {
    errors.forEach(err => dispatch(addAlert(err.msg)))
}