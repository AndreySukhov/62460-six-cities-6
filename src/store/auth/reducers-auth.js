import {ActionTypes} from './actions-auth';

const defaultState = {
  status: false,
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
        status: payload,
      };
    case ActionTypes.AUTHENTICATION_STATUS_FETCH_SUCCESS:
      return {
        ...state,
        pending: false,
        status: payload,
      };
    case ActionTypes.AUTHENTICATION_SUBMIT_START:
      return {
        ...state,
        loginFormPending: true,
        status: false,
      };
    case ActionTypes.AUTHENTICATION_SUBMIT_ERROR:
      return {
        ...state,
        loginFormPending: false,
        status: false,
      };
    case ActionTypes.AUTHENTICATION_SUBMIT_SUCCESS:
      return {
        ...state,
        pending: false,
        status: true,
      };
    default:
      return state;
  }
};

export default authReducer;
