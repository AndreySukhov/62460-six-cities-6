import {API_ENDPOITS} from '../../../util/constants';
import postFavorite from '../../../util/post-favorite';

const ActionTypes = {
  OFFER_DETAILS_FETCH_START: `offerDetails/fetchDetailsStart`,
  OFFER_DETAILS_FETCH_SUCCESS: `offerDetails/fetchDetailsSuccess`,
  OFFER_DETAILS_FETCH_ERROR: `offerDetails/fetchDetailsError`,

  OFFER_DETAILS_NEARBY_FETCH_START: `offerDetails/fetchDetailsNearbyStart`,
  OFFER_DETAILS_NEARBY_FETCH_SUCCESS: `offerDetails/fetchDetailsNearbySuccess`,

  TOGGLE_FAVORITE_START: `offerDetails/toggleFavoriteStart`,
  TOGGLE_FAVORITE_SUCCESS_PAGE: `offerDetails/toggleFavoriteSuccessPage`,
  TOGGLE_FAVORITE_SUCCESS_CARD: `offerDetails/toggleFavoriteSuccessCard`,
};

const FAVORITE_PLACES = {
  page: ActionTypes.TOGGLE_FAVORITE_SUCCESS_PAGE,
  card: ActionTypes.TOGGLE_FAVORITE_SUCCESS_CARD,
};

const ActionCreator = {
  fetchOfferDetails: (id) => {
    return async (dispatch, _getState, api) => {
      dispatch({
        type: ActionTypes.OFFER_DETAILS_FETCH_START
      });

      try {
        const offerDetails = await api.get(`${API_ENDPOITS.hotels}/${id}`);
        dispatch({
          type: ActionTypes.OFFER_DETAILS_FETCH_SUCCESS,
          payload: offerDetails.data,
        });
      } catch (e) {
        dispatch({
          type: ActionTypes.OFFER_DETAILS_FETCH_ERROR,
        });
      }
    };
  },
  fetchOfferDetailsNearby: (id) => {
    return async (dispatch, _getState, api) => {
      dispatch({
        type: ActionTypes.OFFER_DETAILS_NEARBY_FETCH_START
      });

      const offersNearby = await api.get(`${API_ENDPOITS.hotels}/${id}/nearby`);
      if (offersNearby.status === 200) {
        dispatch({
          type: ActionTypes.OFFER_DETAILS_NEARBY_FETCH_SUCCESS,
          payload: offersNearby.data
        });
      }
    };
  },
  toggleFavorite: ({status, id, place}) => {
    return async (dispatch, _getState, api) => {
      dispatch({
        type: ActionTypes.TOGGLE_FAVORITE_START
      });

      const favoriteRequest = await postFavorite({status, id, api});
      if (favoriteRequest.status === 200) {
        dispatch({
          type: FAVORITE_PLACES[place],
          payload: favoriteRequest.data
        });
      }
    };
  },
};

export {
  ActionTypes,
  ActionCreator,
};
