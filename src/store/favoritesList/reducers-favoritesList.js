import {ActionTypes} from './actions-favoritesList';

const defaultState = {
  pending: true,
  favTogglePending: false,
  data: {}
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
      let favByCities = payload.reduce((acc, curr) => {
        if (!acc[curr.city.name]) {
          return {
            ...acc,
            [curr.city.name]: [curr]
          };
        } else {
          return {
            ...acc,
            [curr.city.name]: [...acc[curr.city.name], curr]
          };
        }
      }, {});

      return {
        ...state,
        data: favByCities,
        pending: false,
      };
    }
    case ActionTypes.TOGGLE_FAV_START:
      return {
        ...state,
        favTogglePending: true,
      };
    case ActionTypes.TOGGLE_FAV_SUCCESS:

      const newFavItems = {
        ...state.data,
        [payload.city.name]: state.data[payload.city.name].filter((place) => {
          return place.id !== payload.id;
        })
      };

      if (!newFavItems[payload.city.name].length) {
        delete newFavItems[payload.city.name];
      }

      return {
        favTogglePending: false,
        data: newFavItems,
      };
    default:
      return state;
  }
};

export default favoritesListReducer;
