import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  AUTH_ERROR,
  USER_LOADED,
  USER_ERROR,
  GET_USERNAME,
  LOGIN_USER,
  LOGIN_ERROR,
  LOGOUT
} from '../types';

export default (state, action) => {
  console.log(action);
  switch (action.type) {
    // case GET_USERNAME:
    //   return {
    //     ...state,
    //     username: action.payload,
    //     loading: false
    //   };
    case REGISTER_SUCCESS:
    case LOGIN_USER:
      localStorage.setItem('token', action.payload.token);
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        loading: false
      };
    case LOGOUT:
      return {
        ...state,
        isAuthenticated: false,
        loading: true,
        user: null,
        current: null,
        username: null
      };
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: action.payload
      };
    default:
      return state;
  }
};
