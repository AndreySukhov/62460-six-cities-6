import {ActionTypes} from './actions-offersList';
import {CITIES_LIST} from '../../util/constants';

const defaultState = {
  items: [],
  favTogglePending: false,
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
    case ActionTypes.TOGGLE_FAV_START:
      return {
        ...state,
        favTogglePending: true,
      };
    case ActionTypes.TOGGLE_FAV_SUCCESS:
      return {
        ...state,
        favTogglePending: false,
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
