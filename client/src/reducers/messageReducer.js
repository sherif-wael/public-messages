import {SET_MESSAGE_LOADING, SET_MESSAGES, REMOVE_MESSAGE,
        ADD_MESSAGE, SET_MESSAGE_ERRORS, CLEAR_MESSAGE_ERRORS, SET_MESSAGES_COUNT} from "../actions/types";

const initialState = {
    messages: [],
    loading: true,
    count: null,
    errors: {}
}

function messageReducer(state = initialState, action){
    switch(action.type){
        case SET_MESSAGE_LOADING:
            return {...state, loading: true};
        case SET_MESSAGES:
            return {...state, messages: action.payload, loading: false};
        case REMOVE_MESSAGE:
            return {...state, 
                   messages: state.messages.filter(msg => msg._id !== action.payload)}
        case ADD_MESSAGE: 
            return {...state, messages: [...state.messages, action.payload]};
        case SET_MESSAGE_ERRORS:
            return {...state, errors: action.payload};
        case CLEAR_MESSAGE_ERRORS:
            return {...state, errors: {}};
        case SET_MESSAGES_COUNT:
            return {...state, count: action.payload}
        default:
            return state
    }
}

export default messageReducer