import { AUTH_SIGN_UP, AUTH_ERROR, AUTH_LOG_OUT } from '../actions/types';
const DEFAULT_STATE = {
  isAuthenticated: false,
  token: '',
  errorMessage: '',
};
export default (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case AUTH_SIGN_UP:
      console.log('[AuthReducer] called AUTH_SIGN_UP');
      return {
        ...state,
        token: action.payload,
        isAuthenticated: true,
        errorMessage: '',
      };
    case AUTH_LOG_OUT:
      console.log('[AuthReducer] called AUTH_LOG_OUT');
      return {
        ...state,
        token: action.payload,
        isAuthenticated: false,
        errorMessage: '',
      };
    case AUTH_ERROR:
      console.log('[AuthReducer] called AUTH_ERROR');
      return {
        ...state,
        errorMessage: action.payload,
      };
    default:
      return state;
  }
};
