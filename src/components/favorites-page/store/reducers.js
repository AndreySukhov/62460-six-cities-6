import {createSlice} from '@reduxjs/toolkit';
import {ActionCreator} from './actions';

const initialState = {
  pending: true,
  favoriteTogglePending: false,
  data: []
};

const favoritesListReducer = createSlice({
  name: `favoritesListReducer`,
  initialState,
  extraReducers: (builder) => {
    builder.addCase(ActionCreator.fetchFavoritesList.pending, ((state) => {
      state.pending = true;
    })).addCase(ActionCreator.fetchFavoritesList.fulfilled, ((state, action) => {
      state.pending = false;
      state.data = action.payload;
    })).addCase(ActionCreator.toggleFavorite.pending, ((state) => {
      state.favoriteTogglePending = true;
    })).addCase(ActionCreator.toggleFavorite.fulfilled, ((state, action) => {
      state.favoriteTogglePending = false;
      state.data = state.data.filter((place) => {
        return place.id !== action.payload.id;
      });
    })).addDefaultCase((state) => state);
  },
});

export default favoritesListReducer;
