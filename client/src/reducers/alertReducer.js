import {ADD_ALERT, REMOVE_ALERT} from "../actions/types"

function alertReducer(state = [], action){
    switch(action.type){
        case ADD_ALERT:
            return [...state, action.payload];
        case REMOVE_ALERT:
            return state.filter(alert => alert.id !== action.payload);
        default:
            return state;
    }
}

export default alertReducer