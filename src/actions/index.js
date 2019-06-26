import axios from 'axios';

const LOGIN_ENDPOINT = 'https://bw-conjugator.herokuapp.com/api/login';
const REGISTRATION_ENDPOINT = 'https://bw-conjugator.herokuapp.com/api/register';
const WORD_ENDPOINT = 'https://bw-conjugator.herokuapp.com/api/words';
const STATS_ENDPOINT = 'https://bw-conjugator.herokuapp.com/api/stats';
const SETTINGS_ENDPOINT = 'https://bw-conjugator.herokuapp.com/api/settings';

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
export const GETSTATS_START = 'GETSTATS_START';
export const GETSTATS_SUCCESS = 'GETSTATS_SUCCESS';
export const GETSTATS_FAILURE = 'GETSTATS_FAILURE';
export const RECORD_CORRECT = 'RECORD_CORRECT';
export const RECORD_INCORRECT = 'RECORD_INCORRECT';
export const QUEUE_RECORD_CORRECT = 'QUEUE_RECORD_CORRECT';
export const QUEUE_RECORD_INCORRECT = 'QUEUE_RECORD_INCORRECT';
export const CLEAR_QUEUE = 'CLEAR_QUEUE';
export const SET_FILTER = 'SET_FILTER';
export const CLEAR_FILTER = 'CLEAR_FILTER';
export const GET_FILTER = 'GET_FILTER';

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

export const getWord = token => dispatch => {
  dispatch({
    type: GETWORD_START
  })
  return axios
  .create({ headers: {
    token } })  
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

export const getStats = token => dispatch => {
  dispatch({
    type: GETSTATS_START
  })
  console.log(token);
  return axios.create({ headers: {
    token } }).get(STATS_ENDPOINT, { token: token })
    .then(res => {
      console.log(res.data.message);
      dispatch({
        type: GETSTATS_SUCCESS,
        payload: res.data
      })
    })
    .catch(err => {
      console.log(err.response);
    })
}

export const recordCorrect = (word, token) => dispatch => {
  dispatch({
    type: RECORD_CORRECT
  });

  return axios.create({ headers: {
    token } }).post(WORD_ENDPOINT, {
    ...word,
    correct: 1
  })
  .catch(err => {
    console.log(err.message);
  })
}

export const recordIncorrect = (word, token) => dispatch => {
  dispatch({
    type: RECORD_INCORRECT
  });
  console.log({
    ...word,
    correct: 0
  })
  return axios.create({ headers: {
    token } }).post(WORD_ENDPOINT, {
    ...word,
    correct: 0
  })
  .catch(err => {
    console.log(err.message);
  })
}

export const queueRecordCorrect = (word) => dispatch => {
  dispatch({
    type: QUEUE_RECORD_CORRECT,
    payload: word
  })
}

export const queueRecordIncorrect = (word) => dispatch => {
  dispatch({
    type: QUEUE_RECORD_INCORRECT,
    payload: word
  })
}

export const clearQueue = () => dispatch => {
  console.log('clearing queue');
  dispatch({
    type: CLEAR_QUEUE
  })
  return true;
}

export const setFilter = (newFilter, token) => dispatch => {
  dispatch({
    type: SET_FILTER,
    payload: newFilter
  })
  return axios.create({ headers: { token } })
  .post(SETTINGS_ENDPOINT, {
    filter: newFilter
  })
  .catch(err => {
    console.log(err.message);
  })
}

export const clearFilter = (newFilter, token) => dispatch => {
  dispatch({
    type: CLEAR_FILTER,
    payload: newFilter
  })
  return axios.create({ headers: { token } })
  .post(SETTINGS_ENDPOINT, {
    filter: newFilter
  })
  .catch(err => {
    console.log(err.message);
  })
}

export const getFilter = token => dispatch => {
  return axios.create({ headers: { token } })
  .get(SETTINGS_ENDPOINT)
  .then(res => {
    console.log(res.data);
    dispatch({
      type: GET_FILTER,
      payload: res.data
    })
  })
  .catch(err => {
    console.log(err.message);
  })
}