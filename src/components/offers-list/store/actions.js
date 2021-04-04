import {createAction, createAsyncThunk} from '@reduxjs/toolkit';

import {API_ENDPOITS} from "../../../util/constants";
import postFavorite from "../../../util/post-favorite";

const ActionTypes = {
  CITY_CHANGE: `city/change`,
  OFFERS_LIST_SET: `offersList/set`,

  OFFERS_LIST_FETCH: `offersList/fetch`,

  TOGGLE_FAVORITE: `offersList/toggleFavorite`,
};

const ActionCreator = {
  setCity: createAction(ActionTypes.CITY_CHANGE, (city) => ({
    payload: city,
  })),
  setOffersListData: createAction(ActionTypes.OFFERS_LIST_SET, (params) => ({
    payload: params.sort,
  })),
  fetchOffersList: createAsyncThunk(ActionTypes.OFFERS_LIST_FETCH,
      async (_, thunkAPI) => {
        const {extra: {api}} = thunkAPI;
        const res = await api.get(API_ENDPOITS.hotels);
        if (res.status === 200) {
          return res.data;
        }
        return [];
      }
  ),
  toggleFavorite: createAsyncThunk(ActionTypes.TOGGLE_FAVORITE,
      async ({status, id}, thunkAPI) => {
        const {extra: {api}} = thunkAPI;
        const favoriteRequest = await postFavorite({status, id, api});
        if (favoriteRequest.status === 200) {
          return favoriteRequest.data;
        }
        return null;
      }),
};

export {
  ActionTypes,
  ActionCreator
};
