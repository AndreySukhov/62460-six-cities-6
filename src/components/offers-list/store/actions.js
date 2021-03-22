import {API_ENDPOITS} from "../../../util/constants";
import postFavorite from "../../../util/post-favorite";

const ActionTypes = {
  CITY_CHANGE: `city/change`,
  OFFERS_LIST_SET: `offersList/set`,

  OFFERS_LIST_FETCH_START: `offersList/fetchStart`,
  OFFERS_LIST_FETCH_SUCCESS: `offersList/fetchSuccess`,

  TOGGLE_FAVORITE_START: `offersList/toggleFavoriteStart`,
  TOGGLE_FAVORITE_SUCCESS: `offersList/toggleFavoriteSuccess`,
};

const ActionCreator = {
  setCity: (city) => ({
    type: ActionTypes.CITY_CHANGE,
    payload: city,
  }),
  setOffersListData: (params) => ({
    type: ActionTypes.OFFERS_LIST_SET,
    payload: params,
  }),
  fetchOffersList: () => {
    return async (dispatch, _getState, api) => {

      dispatch({
        type: ActionTypes.OFFERS_LIST_FETCH_START
      });

      const res = await api.get(API_ENDPOITS.hotels);

      if (res.status === 200) {
        dispatch({
          type: ActionTypes.OFFERS_LIST_FETCH_SUCCESS,
          payload: res.data
        });
      }
    };
  },
  toggleFavorite: ({status, id}) => {
    return async (dispatch, _getState, api) => {
      dispatch({
        type: ActionTypes.TOGGLE_FAVORITE_START
      });

      const favoriteRequest = await postFavorite({status, id, api});
      if (favoriteRequest.status === 200) {
        dispatch({
          type: ActionTypes.TOGGLE_FAVORITE_SUCCESS,
          payload: favoriteRequest.data
        });
      }
    };
  },
};

export {
  ActionTypes,
  ActionCreator
};
