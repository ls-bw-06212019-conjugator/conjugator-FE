import * as actions from "../actions";

const initialState = {
  token: localStorage.getItem("token"),
  username: localStorage.getItem("username"),
  loggingIn: false,
  authError: "",
  getWordError: "",
  gettingWord: false,
  word: {},
  globalStats: localStorage.getItem('globalStats'),
  personalStats: localStorage.getItem('personalStats')
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
    case actions.LOGOUT:
      localStorage.setItem('token', '');
      localStorage.setItem('username', '');
      return {
        ...state,
        loggingIn: false,
        authError: '',
        token: '',
        username: ''
      }
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
    case actions.GETWORD_START:
      return {
        ...state,
        getWordError: "",
        gettingWord: true,
      }
    case actions.GETWORD_SUCCESS:
      return {
        ...state,
        gettingWord: false,
        word: action.payload
      }
    case actions.GETWORD_FAILURE:
      return {
        ...state,
        gettingWord: false,
        getWordError: action.payload
      }
    case actions.GETSTATS_START:
      return {
        ...state,
        gettingStats: true,
        globalStats: {},
        personalStats: {}
      }
    case actions.GETSTATS_SUCCESS:
      return {
        ...state,
        gettingStats: false,
        globalStats: action.payload.global,
        personalStats: action.payload.personal
      }
    case actions.GETSTATS_FAILURE:
      return {
        ...state,
        gettingStats: false
      }
    default:
      return state;
  }
};

export default reducer;
