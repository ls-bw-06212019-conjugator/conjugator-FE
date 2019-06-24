import axios from 'axios';

const LOGIN_ENDPOINT = 'http://localhost:3000/api/login';

// ACTIONS WILL GO HERE
export const LOGIN_START = 'LOGIN_START';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

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
    console.log(err.response.data.message);
    dispatch ({
      type: LOGIN_FAILURE,
      payload: err.response.data.message
    }) 
  })
}