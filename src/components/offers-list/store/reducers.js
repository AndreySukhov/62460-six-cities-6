import {createSlice} from '@reduxjs/toolkit';
import {ActionCreator} from './actions';
import {CITIES_LIST} from '../../../util/constants';

const initialState = {
  items: [],
  favoriteTogglePending: false,
  pending: true,
  currentCity: {
    sort: {},
    name: CITIES_LIST[0],
  }
};

const offersListReducer = createSlice({
  name: `offersListReducer`,
  initialState,
  extraReducers: (builder) => {
    builder.addCase(ActionCreator.setCity, (state, action) => {
      state.currentCity.name = action.payload;
    })
      .addCase(ActionCreator.setOffersListData, (state, action) => {
        state.currentCity.sort = action.payload;
      })
      .addCase(ActionCreator.fetchOffersList.pending, (state) => {
        state.items = [];
        state.pending = true;
      })
      .addCase(ActionCreator.fetchOffersList.fulfilled, (state, action) => {
        state.items = action.payload;
        state.pending = false;
      })
      .addCase(ActionCreator.toggleFavorite.pending, (state) => {
        state.favoriteTogglePending = true;
      })
      .addCase(ActionCreator.toggleFavorite.fulfilled, (state, action) => {
        state.favoriteTogglePending = false;
        state.items = state.items.map((listItem) => {
          if (listItem.id === action.payload.id) {
            return action.payload;
          }
          return listItem;
        });
      })
      .addDefaultCase((state) => state);
  }
});

export default offersListReducer;
