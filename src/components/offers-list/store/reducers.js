import {ActionTypes} from './actions';
import {CITIES_LIST} from '../../../util/constants';

const defaultState = {
  items: [],
  favoriteTogglePending: false,
  pending: true,
  currentCity: {
    sort: {},
    name: CITIES_LIST[0],
  }
};

const offersListReducer = (state = defaultState, action) => {
  const {type, payload} = action;
  switch (type) {
    case ActionTypes.CITY_CHANGE:
      return {
        ...state,
        currentCity: {
          ...state.currentCity,
          name: payload
        }
      };
    case ActionTypes.OFFERS_LIST_FETCH_START:
      return {
        ...state,
        items: [],
        pending: true,
      };
    case ActionTypes.OFFERS_LIST_FETCH_SUCCESS:
      return {
        ...state,
        items: payload,
        pending: false,
      };
    case ActionTypes.OFFERS_LIST_SET:
      return {
        ...state,
        currentCity: {
          ...state.currentCity,
          sort: payload.sort,
        }
      };
    case ActionTypes.TOGGLE_FAVORITE_START:
      return {
        ...state,
        favoriteTogglePending: true,
      };
    case ActionTypes.TOGGLE_FAVORITE_SUCCESS:
      return {
        ...state,
        favoriteTogglePending: false,
        items: state.items.map((listItem) => {
          if (listItem.id === payload.id) {
            return payload;
          }
          return listItem;
        })
      };
    default:
      return state;
  }
};

export default offersListReducer;
