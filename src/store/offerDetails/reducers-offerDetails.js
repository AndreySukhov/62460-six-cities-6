import {ActionTypes} from './actions-offerDetails';

const defaultState = {
  pending: true,
  data: null,
  nearby: [],
  reviewFormPending: false,
  favTogglePending: false,
  reviews: [],
};

const offerDetailsReducer = (state = defaultState, action) => {
  const {type, payload} = action;
  switch (type) {
    case ActionTypes.OFFER_DETAILS_FETCH_START:
      return {
        ...state,
        pending: true,
        data: null
      };
    case ActionTypes.OFFER_DETAILS_FETCH_SUCCESS:
      return {
        ...state,
        pending: false,
        data: payload
      };
    case ActionTypes.OFFER_DETAILS_FETCH_ERROR:
      return {
        ...state,
        pending: false,
        data: null
      };
    case ActionTypes.OFFER_DETAILS_NEARBY_FETCH_START: {
      return {
        ...state,
        nearby: []
      };
    }
    case ActionTypes.OFFER_DETAILS_NEARBY_FETCH_SUCCESS: {
      return {
        ...state,
        nearby: payload,
      };
    }
    case ActionTypes.TOGGLE_FAV_SUCCESS_PAGE: {
      return {
        ...state,
        favTogglePending: false,
        data: payload
      };
    }
    case ActionTypes.TOGGLE_FAV_SUCCESS_CARD: {
      return {
        ...state,
        favTogglePending: false,
        nearby: state.nearby.map((listItem) => {
          if (listItem.id === payload.id) {
            return payload;
          }
          return listItem;
        })
      };
    }
    default:
      return state;
  }
};

export default offerDetailsReducer;
