import {createSlice} from '@reduxjs/toolkit';
import {ActionCreator} from './actions';

const initialState = {
  pending: true,
  data: null,
  nearby: [],
  favoriteTogglePending: false,
  reviews: [],
};

const offerDetailsReducer = createSlice({
  initialState,
  name: `offerDetailsReducer`,
  extraReducers: (builder) => {
    builder.addCase(ActionCreator.fetchOfferDetails.pending, (state) => {
      state.pending = true;
      state.data = null;
    }).addCase(ActionCreator.fetchOfferDetails.fulfilled, (state, action) => {
      state.pending = false;
      state.data = action.payload;
    }).addCase(ActionCreator.fetchOfferDetails.rejected, (state, action) => {
      state.pending = false;
      state.data = action.payload;
    }).addCase(ActionCreator.fetchOfferDetailsNearby.pending, (state) => {
      state.nearby = [];
    }).addCase(ActionCreator.fetchOfferDetailsNearby.fulfilled, (state, action) => {
      state.nearby = action.payload;
    }).addCase(ActionCreator.fetchOfferDetailsNearby.rejected, (state, action) => {
      state.pending = false;
      state.data = action.payload;
    }).addCase(ActionCreator.toggleFavorite.pending, (state) => {
      state.favoriteTogglePending = true;
    }).addCase(ActionCreator.toggleFavorite.fulfilled, (state, action) => {
      const {payload} = action;
      state.favoriteTogglePending = false;
      if (payload.place === `page`) {
        state.data = payload.data;
      } else if (state.data === `card`) {
        state.nearby = state.nearby.map((listItem) => {
          if (listItem.id === payload.data.id) {
            return payload;
          }
          return listItem;
        });
      }
    })
      .addDefaultCase((state) => state);
  },
});


export default offerDetailsReducer;
