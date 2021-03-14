import {API_ENDPOITS} from "../../util/constants";
import postFavorite from "../../util/post-favorite";

const ActionTypes = {
  CITY_CHANGE: `city/change`,
  OFFERS_LIST_SET: `offersList/set`,

  OFFERS_LIST_FETCH_START: `offersList/fetchStart`,
  OFFERS_LIST_FETCH_SUCCESS: `offersList/fetchSuccess`,

  TOGGLE_FAV_START: `offersList/toggleFavStart`,
  TOGGLE_FAV_SUCCESS: `offersList/toggleFavSuccess`,
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
  toggleFav: ({status, id}) => {
    return async (dispatch, _getState, api) => {
      dispatch({
        type: ActionTypes.TOGGLE_FAV_START
      });

      const favRequest = await postFavorite({status, id, api});
      if (favRequest.status === 200) {
        dispatch({
          type: ActionTypes.TOGGLE_FAV_SUCCESS,
          payload: favRequest.data
        });
      }
    };
  },
};

export {
  ActionTypes,
  ActionCreator
};
