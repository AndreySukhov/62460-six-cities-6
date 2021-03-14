import {ActionTypes} from './actions-offersList';
import {CITIES_LIST} from "../../util/constants";
import {sortManager} from "../../util";

const defaultState = {
  items: [],
  favTogglePending: false,
  pending: true,
  currentCity: {
    sort: {},
    name: CITIES_LIST[0],
    offers: {
      locations: [],
      list: [],
    },
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
      const newOffers = state.items.reduce((acc, curr) => {
        if (curr.city.name === payload.city) {
          return {
            offers: {
              locations: [...acc.offers.locations, {
                lat: curr.location.latitude,
                lng: curr.location.longitude,
                offerId: curr.id
              }],
              list: [...acc.offers.list, curr],
            }
          };
        }
        return acc;
      }, {
        offers: {
          locations: [],
          list: [],
        }});

      newOffers.offers.list = sortManager({
        arr: newOffers.offers.list,
        direction: payload.sort.direction,
        sortParam: payload.sort.name
      });

      return {
        ...state,
        currentCity: {
          ...state.currentCity,
          ...newOffers,
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
        currentCity: {
          ...state.currentCity,
          offers: {
            ...state.currentCity.offers,
            list: state.currentCity.offers.list.map((listItem) => {
              if (listItem.id === payload.id) {
                return payload;
              }
              return listItem;
            })
          }
        }
      };
    default:
      return state;
  }
};

export default offersListReducer;
