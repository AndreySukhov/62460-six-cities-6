import {API_ENDPOITS} from "../../../util/constants";
import {createAsyncThunk} from '@reduxjs/toolkit';

const ActionTypes = {
  AUTHENTICATION_SUBMIT: `authentication/submit`,

  AUTHENTICATION_STATUS_FETCH: `authenticationStatus/fetch`,
};

const ActionCreator = {
  checkAuth: createAsyncThunk(ActionTypes.AUTHENTICATION_STATUS_FETCH,
      async (_, thunkAPI) => {
        const {extra: {api}} = thunkAPI;
        try {
          const authRequest = await api.get(API_ENDPOITS.login);
          return authRequest.data.email;
        } catch (e) {
          return null;
        }
      }),
  login: createAsyncThunk(ActionTypes.AUTHENTICATION_SUBMIT,
      async (params, thunkAPI) => {
        const {extra: {api}} = thunkAPI;
        try {
          const res = await api.post(API_ENDPOITS.login, {...params});

          return res.data.email;
        } catch (e) {
          // eslint-disable-next-line no-alert
          alert(e.response.data.error);
          return null;
        }
      })
};

export {
  ActionTypes,
  ActionCreator,
};
