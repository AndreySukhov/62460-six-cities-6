import {createSlice} from '@reduxjs/toolkit';
import {ActionCreator} from './actions';

const initialState = {
  formPending: false,
  pending: true,
  list: [],
};

const reviewsReducer = createSlice({
  name: `reviewsReducer`,
  initialState,
  extraReducers: (builder) => {
    builder.addCase(ActionCreator.fetchReviews.pending, (state) => {
      state.pending = true;
      state.list = [];
    }).
    addCase(ActionCreator.fetchReviews.fulfilled, (state, action) => {
      state.pending = false;
      state.list = action.payload;
    }).
    addCase(ActionCreator.sendReview.pending, (state) => {
      state.formPending = true;
    }).addCase(ActionCreator.sendReview.fulfilled, (state, action) => {
      state.formPending = false;
      state.list = action.payload;
    }).addCase(ActionCreator.sendReview.rejected, (state) => {
      state.formPending = false;
    }).addDefaultCase((state) => state);
  }
});

export default reviewsReducer;
