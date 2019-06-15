import * as actionTypes from './actionTypes';
import axios from 'axios';
import logo from '../../components/Logo/Logo';

export const authSuccess = (token, userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: token,
        loadID: userId
    };
};

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    }
}

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}

export const authLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('userID');
    return {
        type: actionTypes.AUTH_LOGOUT
    }
}

export const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        console.log(expirationTime)
        setTimeout(() => {
            dispatch(authLogout())
            
        },expirationTime * 1000)
    }
}

export const auth = (email, password, signup) => {
    return dispatch => {
        dispatch(authStart())
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        }

        let url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyCTmevNbZgTObXLYGkazMgjNxsjEFJ6yHA'

        if(!signup) {
            url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyCTmevNbZgTObXLYGkazMgjNxsjEFJ6yHA'
        }

        axios.post(url, authData)
            .then(response => {
                localStorage.setItem('token', response.data.idToken);
                localStorage.setItem('expirationDate', new Date(new Date().getTime() + response.data.expiresIn * 1000));
                localStorage.setItem('userID', response.data.localId);
                dispatch(authSuccess(response.data.idToken, response.data.localId));
                dispatch(checkAuthTimeout(response.data.expiresIn))
            })
            .catch(err => {
                dispatch(authFail(err.response.data.error))
            });
    }
}

export const authRedirectPath = (path) => {
    return {
        type: actionTypes.AUTH_REDIRECT_PATH,
        path: path
    }
}

export const checkAuthState = () => {
    return dispatch =>{
        const token = localStorage.getItem('token');

        if(!token) {
            dispatch(authLogout());
        } else {
            const expriationDate = new Date(localStorage.getItem('expirationDate'));
            if(expriationDate <= new Date()) {
                dispatch(authLogout())
            } else {
                const userID = localStorage.getItem('userID');
                dispatch(authSuccess(token, userID));
            }
        }
    }
}