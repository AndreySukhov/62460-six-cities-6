import {
  CITY_CHANGE,

  OFFERS_LIST_SET,
  OFFERS_LIST_FETCH_START,
  OFFERS_LIST_FETCH_SUCCESS,

  AUTHENTICATION_STATUS_FETCH_START,
  AUTHENTICATION_STATUS_FETCH_SUCCESS,

  AUTHENTICATION_POST_START,
  AUTHENTICATION_POST_SUCCESS,
  AUTHENTICATION_POST_ERROR,

  OFFER_DETAILS_FETCH_START,
  OFFER_DETAILS_FETCH_SUCCESS,
  OFFER_DETAILS_FETCH_ERROR,

  OFFER_DETAILS_NEARBY_FETCH_START,
  OFFER_DETAILS_NEARBY_FETCH_SUCCESS,

  REVIEW_POST_START,
  REVIEW_POST_SUCCESS,

  OFFER_REVIEWS_FETCH_START,
  OFFER_REVIEWS_FETCH_SUCCESS,
} from './action';

const CITIES_LIST = [`Paris`, `Cologne`, `Brussels`, `Amsterdam`, `Hamburg`, `Dusseldorf`];
import {sortManager} from "../util";

const defaultState = {
  isAuthenticated: false,
  loginState: {
    pending: false,
  },
  currentOffer: {
    pending: true,
    data: null,
  },
  reviewForm: {
    pending: false,
  },
  currentOfferReviews: [],
  currentOfferNearby: {
    list: [],
    locations: []
  },
  offersList: {
    cities: [],
    pending: true,
  },
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
    case AUTHENTICATION_STATUS_FETCH_START:
    case AUTHENTICATION_STATUS_FETCH_SUCCESS:
      return {
        ...state,
        isAuthenticated: payload
      };
    case AUTHENTICATION_POST_START:
      return {
        ...state,
        loginState: {
          pending: true,
        },
      };
    case AUTHENTICATION_POST_ERROR:
      return {
        ...state,
        loginState: {
          pending: false
        },
      };
    case AUTHENTICATION_POST_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        loginState: {
          pending: false
        },
      };
    case CITY_CHANGE:
      return {
        ...state,
        currentCity: {
          ...state.currentCity,
          name: payload
        }
      };
    case OFFERS_LIST_FETCH_START:
      return {
        ...state,
        offersList: {
          cities: [],
          pending: true,
        }
      };
    case OFFERS_LIST_FETCH_SUCCESS:
      return {
        ...state,
        offersList: {
          cities: payload,
          pending: false,
        }
      };
    case OFFERS_LIST_SET:
      const newOffers = state.offersList.cities.reduce((acc, curr) => {
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
    case OFFER_DETAILS_FETCH_START:
      return {
        ...state,
        currentOffer: {
          ...state.currentOffer,
          pending: true,
          data: null
        },
      };
    case OFFER_DETAILS_FETCH_SUCCESS:
      return {
        ...state,
        currentOffer: {
          ...state.currentOffer,
          pending: false,
          data: payload
        },
      };
    case OFFER_DETAILS_FETCH_ERROR:
      return {
        ...state,
        currentOffer: {
          pending: false,
          data: null
        },
      };
    case OFFER_REVIEWS_FETCH_START:
      return {
        ...state,
        currentOfferReviews: [],
      };
    case OFFER_REVIEWS_FETCH_SUCCESS:
      return {
        ...state,
        currentOfferReviews: payload,
      };
    case OFFER_DETAILS_NEARBY_FETCH_START: {
      return {
        ...state,
        currentOfferNearby: {
          list: [],
          locations: []
        }
      };
    }
    case OFFER_DETAILS_NEARBY_FETCH_SUCCESS: {
      return {
        ...state,
        currentOfferNearby: {
          list: payload,
          locations: payload.map((offer) => {
            return {
              lat: offer.location.latitude,
              lng: offer.location.longitude,
              offerId: offer.id
            };
          })
        }
      };
    }
    case REVIEW_POST_START: {
      return {
        ...state,
        reviewForm: {
          pending: true,
        },
      };
    }
    case REVIEW_POST_SUCCESS: {
      return {
        ...state,
        reviewForm: {
          pending: false,
        },
        currentOfferReviews: payload,
      };
    }
  }

  return state;
};

export {
  CITIES_LIST,
};

export default reducer;
