import {CITY_CHANGE, OFFERS_LIST_SET} from './action';

const CITIES_LIST = [`Paris`, `Cologne`, `Brussels`, `Amsterdam`, `Hamburg`, `Dusseldorf`];
import OFFER_DATA from '../mocks/offers';

const defaultState = {
  citiesList: CITIES_LIST,
  currentCity: {
    name: CITIES_LIST[0],
    offers: {
      locations: [],
      list: [],
    },
  }
};

const reducer = (state = defaultState, action) => {
  const {type, payload} = action;
  switch (type) {
    case CITY_CHANGE:
      return {
        ...state,
        currentCity: {
          ...state.currentCity,
          name: payload
        }
      };

    case OFFERS_LIST_SET:
      const newOffers = OFFER_DATA.reduce((acc, curr) => {
        if (curr.city.name === payload) {
          return {
            offers: {
              locations: [...acc.offers.locations, {
                lat: curr.location.latitude,
                lng: curr.location.longitude,
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
      return {
        ...state,
        currentCity: {
          ...state.currentCity,
          ...newOffers
        }
      };
  }

  return state;
};

export {
  CITIES_LIST,
};

export default reducer;
