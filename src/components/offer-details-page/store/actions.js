import {createAsyncThunk} from '@reduxjs/toolkit';

import {API_ENDPOITS} from '../../../util/constants';
import postFavorite from '../../../util/post-favorite';

const ActionTypes = {
  OFFER_DETAILS_FETCH: `offerDetails/fetchDetails`,

  OFFER_DETAILS_NEARBY_FETCH: `offerDetails/fetchDetailsNearby`,

  TOGGLE_FAVORITE: `offerDetails/toggleFavorite`,
};

const ActionCreator = {
  fetchOfferDetails: createAsyncThunk(ActionTypes.OFFER_DETAILS_FETCH,
      async (id, thunkAPI) => {
        const {extra: {api}} = thunkAPI;
        try {
          const offerDetails = await api.get(`${API_ENDPOITS.hotels}/${id}`);
          return offerDetails.data;
        } catch (e) {
          return null;
        }
      }),
  fetchOfferDetailsNearby: createAsyncThunk(ActionTypes.OFFER_DETAILS_NEARBY_FETCH,
      async (id, thunkAPI) => {
        const {extra: {api}} = thunkAPI;
        const offersNearby = await api.get(`${API_ENDPOITS.hotels}/${id}/nearby`);

        if (offersNearby.status === 200) {
          return offersNearby.data;
        }
        return null;
      }),
  toggleFavorite: createAsyncThunk(ActionTypes.TOGGLE_FAVORITE,
      async ({status, id, place}, thunkAPI) => {
        const {extra: {api}} = thunkAPI;
        const favoriteRequest = await postFavorite({status, id, api});
        return {
          data: favoriteRequest.data,
          place
        };
      })
};

export {
  ActionTypes,
  ActionCreator,
};
