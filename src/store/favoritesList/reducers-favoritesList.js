import {ActionTypes} from './actions-favoritesList';

const defaultState = {
  pending: true,
  favTogglePending: false,
  data: []
};

const favoritesListReducer = (state = defaultState, action) => {
  const {type, payload} = action;
  switch (type) {
    case ActionTypes.FAVORITES_LIST_FETCH_START: {
      return {
        ...state,
        pending: true,
      };
    }
    case ActionTypes.FAVORITES_LIST_FETCH_SUCCESS: {
      return {
        ...state,
        data: payload,
        pending: false,
      };
    }
    case ActionTypes.TOGGLE_FAV_START:
      return {
        ...state,
        favTogglePending: true,
      };
    case ActionTypes.TOGGLE_FAV_SUCCESS:
      return {
        favTogglePending: false,
        data: state.data.filter((place) => {
          return place.id !== payload.id;
        })
      };
    default:
      return state;
  }
};

export default favoritesListReducer;
