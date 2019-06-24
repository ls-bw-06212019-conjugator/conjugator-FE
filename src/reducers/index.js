import * as actions from '../actions';

const initialState = {
  token: '',
  loggingIn: false,
  authError: ''
}

const reducer = (state = initialState, action) => {
  switch(action.type){
    case actions.LOGIN_START:
      return {
        ... state,
        loggingIn: true,
        authError: ''
      }
    case actions.LOGIN_SUCCESS:
      return {
        ... state,
        loggingIn: false,
        token: action.payload
      }
    case actions.LOGIN_FAILURE:
      return {
        ... state,
        loggingIn: false,
        authError: action.payload
      }
    default:
      return state;
  }
}

export default reducer;