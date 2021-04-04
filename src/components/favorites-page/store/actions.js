import {createAsyncThunk} from '@reduxjs/toolkit';

import {API_ENDPOITS} from '../../../util/constants';
import postFavorite from '../../../util/post-favorite';

const ActionTypes = {
  FAVORITES_LIST: `favoritesList/fetch`,

  TOGGLE_FAVORITE_START: `favoritesList/toggleFavorite`,
};

const ActionCreator = {
  fetchFavoritesList: createAsyncThunk(ActionTypes.FAVORITES_LIST,
      async (_, thunkAPI) => {
        const {extra: {api}} = thunkAPI;
        const result = await api.get(`${API_ENDPOITS.favorite}`);

        return result.data;
      }),
  toggleFavorite: createAsyncThunk(ActionTypes.TOGGLE_FAVORITE_START,
      async ({status, id}, thunkAPI) => {
        const {extra: {api}} = thunkAPI;
        const favoriteRequest = await postFavorite({status, id, api});

        return favoriteRequest.data;
      }),
};

export {
  ActionTypes,
  ActionCreator,
};
