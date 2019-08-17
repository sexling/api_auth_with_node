import axios from 'axios';
import { AUTH_SIGN_UP, AUTH_ERROR, AUTH_LOG_OUT } from './types';

export const oauthGoogle = data => {
  return async dispatch => {
    try {
      const body = {
        access_token: data,
      };

      const res = await axios.post(
        'http://localhost:5000/users/auth/google',
        body
      );

      dispatch({
        type: AUTH_SIGN_UP,
        payload: res.data.token,
      });

      localStorage.setItem('JWT_TOKEN', res.data.token);
    } catch (err) {
      console.log('TCL: err', err);
      dispatch({
        type: AUTH_ERROR,
        payload: 'Email is already in use',
      });
    }
  };
};

export const oauthFacebook = data => {
  return async dispatch => {
    try {
      console.log('TCL: data', data);
      const body = {
        access_token: data,
      };

      const res = await axios.post(
        'http://localhost:5000/users/auth/facebook',
        body
      );

      dispatch({
        type: AUTH_LOG_OUT,
        payload: res.data.token,
      });

      localStorage.setItem('JWT_TOKEN', res.data.token);
    } catch (err) {
      console.log('TCL: err', err);
      dispatch({
        type: AUTH_ERROR,
        payload: 'Email is already in use',
      });
    }
  };
};

export const signUp = data => {
  return async dispatch => {
    try {
      const res = await axios.post('http://localhost:5000/users/signup', data);
      console.log('TCL: res', res);
      dispatch({
        type: AUTH_SIGN_UP,
        payload: res.data.token,
      });

      localStorage.setItem('JWT_TOKEN', res.data.token);
    } catch (err) {
      console.log('TCL: err', err);
      dispatch({
        type: AUTH_ERROR,
        payload: 'Email is already in use',
      });
    }
  };
};

export const logOut = () => {
  return dispatch => {
    localStorage.removeItem('JWT_TOKEN');
    dispatch({
      type: AUTH_LOG_OUT,
      payload: '',
    });
  };
};
