import {ActionTypes} from './actions';

const defaultState = {
  user: null,
  pending: true,
  loginFormPending: false
};

const authReducer = (state = defaultState, action) => {
  const {type, payload} = action;
  switch (type) {
    case ActionTypes.AUTHENTICATION_STATUS_FETCH_START:
      return {
        ...state,
        pending: true,
        user: payload,
      };
    case ActionTypes.AUTHENTICATION_STATUS_FETCH_SUCCESS:
      return {
        ...state,
        pending: false,
        user: payload,
      };
    case ActionTypes.AUTHENTICATION_SUBMIT_START:
      return {
        ...state,
        loginFormPending: true,
        user: null,
      };
    case ActionTypes.AUTHENTICATION_SUBMIT_ERROR:
    case ActionTypes.AUTHENTICATION_SUBMIT_SUCCESS:
      return {
        ...state,
        pending: false,
        loginFormPending: false,
        user: payload,
      };
    default:
      return state;
  }
};

export default authReducer;
