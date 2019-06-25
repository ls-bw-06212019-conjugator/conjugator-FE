import axios from 'axios';

const LOGIN_ENDPOINT = 'https://bw-conjugator.herokuapp.com/api/login';
const REGISTRATION_ENDPOINT = 'https://bw-conjugator.herokuapp.com/api/register';
const WORD_ENDPOINT = 'https://bw-conjugator.herokuapp.com/api/words';

// ACTIONS WILL GO HERE
export const LOGIN_START = 'LOGIN_START';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const LOGOUT = 'LOGOUT';
export const SIGNUP_START = 'SIGNUP_START';
export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS';
export const SIGNUP_FAILURE = 'SIGNUP_FAILURE';
export const SET_AUTH_ERROR = 'SET_AUTH_ERROR';
export const GETWORD_START = 'GETWORD_START';
export const GETWORD_SUCCESS = 'GETWORD_SUCCESS';
export const GETWORD_FAILURE = 'GETWORD_FAILURE';
export const CHECKWORD_START = 'CHECKWORD_START';
export const CHECKWORD_SUCCESS = 'CHECKWORD_SUCCESS';
export const CHECKWORD_FAILURE = 'CHECKWORD_FAILURE';

export const login = (username, password) => dispatch => {
  dispatch({
    type: LOGIN_START,
  })
  return axios.post(LOGIN_ENDPOINT, {
    username, password
  })
  .then ( res => {
    dispatch({
      type: LOGIN_SUCCESS,
      payload: {
        token: res.data.token,
        username: username
      }
    })
  })
  .catch ( err => {
    let error = '';
    if(err.response.status >= 500) {
      error = err.response.statusText;
    } else {
      error = err.response.data.message;
    }
    dispatch ({
      type: LOGIN_FAILURE,
      payload: error
    }) 
  })
}

export const signup = (username, password) => dispatch => {
  dispatch ({
    type: SIGNUP_START
  })
  return axios.post(REGISTRATION_ENDPOINT, {
    username,
    password
  })
  .then (res => {
    dispatch({
      type: SIGNUP_SUCCESS,
      payload: {
        token: res.data.token,
        username: username
      }
    })
  })
  .catch(err => {
    let error = '';
    if(err.response.status >= 500) {
      error = err.response.statusText;
    } else {
      error = err.response.data.message;
    }
    dispatch({
      type: SIGNUP_FAILURE,
      payload: error
    })
  });
}

export const setAuthError = error => dispatch => {
  dispatch({
    type: SET_AUTH_ERROR,
    payload: error
  })
  return true;
}

export const logout = () => dispatch => {
  dispatch({
    type: LOGOUT
  })
}

export const getWord = () => dispatch => {
  dispatch({
    type: GETWORD_START
  })
  return axios
    .get(WORD_ENDPOINT)
    .then(res => {
      console.log(res)
      dispatch({
        type: GETWORD_SUCCESS,
        payload: res.data     
      })
    })
    .catch(err => {
      console.log(err)
      dispatch({
        type: GETWORD_FAILURE,
      })
    })
}

export const updateStats = correct => dispatch => {
  dispatch({
    type: CHECKWORD_START
  })
  return axios
    .post(WORD_ENDPOINT, {

    })
    .then()
    .catch()
}