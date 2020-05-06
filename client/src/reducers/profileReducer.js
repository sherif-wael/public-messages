import {SET_PROFILE_LOADING, SET_PROFILE, SET_SEARCH_PROFILES,
     SET_PROFILE_ERRORS, CLEAR_PROFILE_ERRORS} from "../actions/types";

const initialState = {
    profile: null,
    searchProfiles: [],
    loading: true,
    errors: {}
}

function profileReducer(state = initialState, action){
    switch(action.type){
        case SET_PROFILE_LOADING: 
            return {...state, loading: true};
        case SET_PROFILE: 
            return {...state, profile: action.payload, loading: false};
        case SET_SEARCH_PROFILES:
            return {...state, searchProfiles: action.payload, loading: false};
        case SET_PROFILE_ERRORS: 
            return {...state, errors: action.payload};
        case CLEAR_PROFILE_ERRORS:
            return {...state, errors: {}};
        default: 
            return state;
    }
}

export default profileReducer;