import {CITY_CHANGE, OFFERS_LIST_SET} from './action';

const CITIES_LIST = [`Paris`, `Cologne`, `Brussels`, `Amsterdam`, `Hamburg`, `Dusseldorf`];
import OFFER_DATA from '../mocks/offers';
import {sortManager} from "../util";

const defaultState = {
  citiesList: CITIES_LIST,
  currentCity: {
    sort: {},
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
  }

  return state;
};

export {
  CITIES_LIST,
};

export default reducer;
