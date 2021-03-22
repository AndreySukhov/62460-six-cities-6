import {ActionTypes} from './actions';

const defaultState = {
  pending: true,
  favoriteTogglePending: false,
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
    case ActionTypes.TOGGLE_FAVORITE_START:
      return {
        ...state,
        favoriteTogglePending: true,
      };
    case ActionTypes.TOGGLE_FAVORITE_SUCCESS:
      return {
        favoriteTogglePending: false,
        data: state.data.filter((place) => {
          return place.id !== payload.id;
        })
      };
    default:
      return state;
  }
};

export default favoritesListReducer;
