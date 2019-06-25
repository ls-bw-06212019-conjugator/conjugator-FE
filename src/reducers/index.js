import * as actions from "../actions";

const initialState = {
  token: localStorage.getItem("token"),
  username: localStorage.getItem("username"),
  loggingIn: false,
  authError: ""
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.LOGIN_START:
      return {
        ...state,
        loggingIn: true,
        authError: ""
      };
    case actions.LOGIN_SUCCESS:
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("username", action.payload.username);
      return {
        ...state,
        loggingIn: false,
        token: action.payload.token,
        username: action.payload.username
      };
    case actions.LOGIN_FAILURE:
      return {
        ...state,
        loggingIn: false,
        authError: action.payload
      };
    case actions.SIGNUP_START:
      return {
        ...state,
        loggingIn: true,
        authError: ""
      };
    case actions.SIGNUP_SUCCESS:
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("username", action.payload.username);
      return {
        ...state,
        loggingIn: false,
        token: action.payload.token,
        username: action.payload.username
      };
    case actions.SIGNUP_FAILURE:
      return {
        ...state,
        loggingIn: false,
        authError: action.payload
      };
    case actions.SET_AUTH_ERROR:
      return {
        ...state,
        authError: action.payload
      };
    default:
      return state;
  }
};

export default reducer;
