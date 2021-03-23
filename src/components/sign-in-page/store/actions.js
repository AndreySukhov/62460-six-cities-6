import {API_ENDPOITS} from "../../../util/constants";

const ActionTypes = {
  AUTHENTICATION_SUBMIT_START: `authentication/submitStart`,
  AUTHENTICATION_SUBMIT_SUCCESS: `authentication/submitSuccess`,
  AUTHENTICATION_SUBMIT_ERROR: `authentication/submitError`,

  AUTHENTICATION_STATUS_FETCH_START: `authenticationStatus/fetchStart`,
  AUTHENTICATION_STATUS_FETCH_SUCCESS: `authenticationStatus/fetchSuccess`,
};

const ActionCreator = {
  checkAuth: () => {
    return async (dispatch, _getState, api) => {
      dispatch({
        type: ActionTypes.AUTHENTICATION_STATUS_FETCH_START
      });
      try {
        const authRequest = await api.get(API_ENDPOITS.login);
        dispatch({
          type: ActionTypes.AUTHENTICATION_STATUS_FETCH_SUCCESS,
          payload: authRequest.data
        });
      } catch (e) {
        dispatch({
          type: ActionTypes.AUTHENTICATION_STATUS_FETCH_SUCCESS,
          payload: null
        });
      }
    };
  },
  login: (params) => {
    return async (dispatch, _getState, api) => {
      dispatch({
        type: ActionTypes.AUTHENTICATION_SUBMIT_START
      });

      try {
        const res = await api.post(API_ENDPOITS.login, {...params});
        if (res.status === 200) {
          dispatch({
            type: ActionTypes.AUTHENTICATION_SUBMIT_SUCCESS,
            payload: res.data.email
          });
        }
      } catch (e) {
        // eslint-disable-next-line no-alert
        alert(e.response.data.error);
        dispatch({
          type: ActionTypes.AUTHENTICATION_SUBMIT_ERROR,
          payload: null
        });
      }
    };
  },
};

export {
  ActionTypes,
  ActionCreator,
};
