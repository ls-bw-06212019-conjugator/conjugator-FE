import axios from 'axios';

const LOGIN_ENDPOINT = 'http://localhost:3000/api/login';
const REGISTRATION_ENDPOINT = 'http://localhost:3000/api/register';

// ACTIONS WILL GO HERE
export const LOGIN_START = 'LOGIN_START';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const SIGNUP_START = 'SIGNUP_START';
export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS';
export const SIGNUP_FAILURE = 'SIGNUP_FAILURE';

export const login = (username, password) => dispatch => {
  dispatch({
    type: LOGIN_START,
  })
  return axios.post(LOGIN_ENDPOINT, {
    username, password
  })
  .then ( res => {
    console.log(res.data);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data
    })
  })
  .catch ( err => {
    dispatch ({
      type: LOGIN_FAILURE,
      payload: err.response.data.message
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
    console.log(res.data);
    dispatch({
      type: SIGNUP_SUCCESS,
      payload: res.data
    })
  })
  .catch(err => {
    console.log(err.response);
    dispatch({
      type: SIGNUP_FAILURE,
      payload: err.response.data.message
    })
  });
}