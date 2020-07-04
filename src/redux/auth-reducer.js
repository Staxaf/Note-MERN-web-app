import {API_URL, SET_IS_SIGNING_UP, SET_IS_USER_LOADED, SET_MESSAGE, SET_TOKEN, SET_USER} from "./types";
import * as axios from "axios";

const initialState = {
    token: '', // token of authorized user
    user: null, // authorized user
    message: { // message of error or success in login and signUp
        isError: false,
        messagePlace: '',
        messageText: ''
    },
    isSigningUp: false,
    isUserLoaded: false // fetched the user ot still not
}

export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER:
            return {...state, user: action.user}
        case SET_TOKEN:
            return {...state, token: action.token}
        case SET_MESSAGE:
            return {...state, message: action.message}
        case SET_IS_SIGNING_UP:
            return {...state, isSigningUp: action.isSigningUp}
        case SET_IS_USER_LOADED:
            return {...state, isUserLoaded: action.isUserLoaded}
        default:
            return state
    }
}

export const setUser = (user) => ({type: SET_USER, user})
export const setToken = (token) => ({type: SET_TOKEN, token})
export const setMessage = (message) => ({type: SET_MESSAGE, message})

export const setIsSigningUp = (isSigningUp) => ({type: SET_IS_SIGNING_UP, isSigningUp})
export const setIsUserLoaded = (isUserLoaded) => ({type: SET_IS_USER_LOADED, isUserLoaded})

// Redux thunks

export const login = (email, password) => async (dispatch) => {
    axios.post(`${API_URL}/auth`, {email, password})
        .then(response => {
            console.log(response.data)
            dispatch(setToken(response.data.accessToken))
            localStorage.setItem('token', response.data.accessToken)
            axios.get(`${API_URL}/users/user`, {
                headers: {
                    Authorization: response.data.accessToken
                }
            }).then(response => {
                dispatch(setUser(response.data.user))
            })
        })
        .catch(err => {
            dispatch(setMessage({
                isError: true,
                messagePlace: 'login',
                messageText: 'Check the correctness of email or password'
            }))
        })
}

export const getUserWithToken = (token) => (dispatch) => {
    dispatch(setToken(token))
    axios.get(`${API_URL}/users/user`, {
        headers: {
            Authorization: token
        }
    }).then(response => {
        dispatch(setUser(response.data.user))
        dispatch(setIsUserLoaded(true))
    }).catch(() => dispatch(setIsUserLoaded(true)))
}

export const signUp = (email, password, name) => (dispatch) => {
    dispatch(setIsSigningUp(true))
    axios.post(`${API_URL}/users/register`, {email, password, name})
        .then(() => {
            dispatch(setMessage({
                isError: false,
                messagePlace: 'signUp',
                messageText: 'Registration was successful!'
            }))
            dispatch(setIsSigningUp(false))
        }).catch(() => {
            dispatch(setMessage({
                isError: true,
                messagePlace: 'signUp',
                messageText: 'Errors occurred during registration. Check the correctness of the entered data'
            }))
            dispatch(setIsSigningUp(false))
        }
    )
}

export const logout = () => (dispatch) => {
    localStorage.removeItem('token')
    dispatch(setUser(null))
    dispatch(setToken(''))
}

export const updateUser = (user, tagContent, token) => (dispatch) => {
    const generateColor = () => '#' + parseInt(Math.random() * 0xffffff).toString(16)
    const newTag = {
        color: generateColor(),
        tagContent
    }
    axios.post(`${API_URL}/users/update-user-info`, {name: user.name, tags: [...user.tags, newTag]}, {
        headers: {
            Authorization: token
        }
    }).then(() => {
        dispatch(setUser({
            ...user,
            tags: [...user.tags, newTag]
        }))
    })
}