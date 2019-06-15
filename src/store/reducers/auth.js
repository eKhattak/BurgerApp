import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utilities'

const initialState = {
    error: null,
    loading: false,
    token: null,
    localID: null,
    authRedirectPath: '/'
}

const authStart = (state, actions) => {
    return updateObject(state, {error: null, loading: true })
}

const authSuccess = (state, actions) => {
    return updateObject(state, {
        token: actions.idToken, 
        localID: actions.loadID,
        error: null,
        loading: false});
}

const authFail = (state, actions) => {
    return updateObject(state, {error: actions.error , loading: false})
}

const authLogout = (state, actions) => {
    return updateObject(state, {token: null, localID: null})
}

const authRedirectPath = (state, actions) => {
    return updateObject(state, {authRedirectPath: actions.path})
}

const reducer = (state = initialState, actions) => {
    switch(actions.type) {
        case actionTypes.AUTH_START: return authStart(state, actions);
        case actionTypes.AUTH_SUCCESS: return authSuccess(state, actions);
        case actionTypes.AUTH_FAIL: return authFail(state, actions);
        case actionTypes.AUTH_LOGOUT: return authLogout(state, actions);
        case actionTypes.AUTH_REDIRECT_PATH: return authRedirectPath(state, actions);
        default: return state;
    }
}


export default reducer;