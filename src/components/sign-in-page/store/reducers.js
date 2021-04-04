import {createSlice} from '@reduxjs/toolkit';
import {ActionCreator} from './actions';

const initialState = {
  user: null,
  pending: true,
  loginFormPending: false
};

const authReducer = createSlice({
  name: `authReducer`,
  initialState,
  extraReducers: ((builder) => {
    builder.addCase(ActionCreator.checkAuth.pending, (state, action) => {
      state.pending = true;
      state.user = action.payload;
    })
      .addCase(ActionCreator.checkAuth.fulfilled, (state, action) => {
        state.pending = false;
        state.user = action.payload;
      })
      .addCase(ActionCreator.checkAuth.rejected, (state, action) => {
        state.pending = false;
        state.user = action.payload;
      })
      .addCase(ActionCreator.login.pending, (state) => {
        state.loginFormPending = true;
        state.user = null;
      })
      .addCase(ActionCreator.login.fulfilled, (state, action) => {
        state.pending = false;
        state.loginFormPending = null;
        state.user = action.payload;
      })
      .addCase(ActionCreator.login.rejected, (state, action) => {
        state.pending = false;
        state.loginFormPending = null;
        state.user = action.payload;
      })
      .addDefaultCase((state) => state);
  })
});

export default authReducer;
