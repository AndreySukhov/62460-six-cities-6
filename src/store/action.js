const CITY_CHANGE = `city/change`;

const OFFERS_LIST_SET = `offersList/set`;

const AUTHENTICATION_STATUS_FETCH_START = `authenticationStatus/fetchStart`;
const AUTHENTICATION_STATUS_FETCH_SUCCESS = `authenticationStatus/fetchSuccess`;

const AUTHENTICATION_POST_START = `authentication/postStart`;
const AUTHENTICATION_POST_SUCCESS = `authentication/postSuccess`;
const AUTHENTICATION_POST_ERROR = `authentication/postError`;

const OFFERS_LIST_FETCH_START = `offersList/fetchStart`;
const OFFERS_LIST_FETCH_SUCCESS = `offersList/fetchSuccess`;

const OFFER_DETAILS_FETCH_START = `offerDetails/fetchDetailsStart`;
const OFFER_DETAILS_FETCH_SUCCESS = `offerDetails/fetchDetailsSuccess`;
const OFFER_DETAILS_FETCH_ERROR = `offerDetails/fetchDetailsError`;

const OFFER_DETAILS_NEARBY_FETCH_START = `offerDetails/fetchDetailsNearbyStart`;
const OFFER_DETAILS_NEARBY_FETCH_SUCCESS = `offerDetails/fetchDetailsNearbySuccess`;

const REVIEW_POST_START = `review/postStart`;
const REVIEW_POST_SUCCESS = `review/postSuccess`;

const OFFER_REVIEWS_FETCH_START = `offerDetails/fetchReviewsStart`;
const OFFER_REVIEWS_FETCH_SUCCESS = `offerDetails/fetchReviewsSuccess`;

const setCity = (city) => ({
  type: CITY_CHANGE,
  payload: city,
});

const fetchOffers = () => {
  return async (dispatch, _getState, api) => {

    dispatch({
      type: OFFERS_LIST_FETCH_START
    });

    const res = await api.get(`hotels`);

    if (res.status === 200) {
      dispatch({
        type: OFFERS_LIST_FETCH_SUCCESS,
        payload: res.data
      });
    }
  };
};

const login = (params) => {
  return async (dispatch, _getState, api) => {

    dispatch({
      type: AUTHENTICATION_POST_START
    });

    try {
      const res = await api.post(`login`, {...params});
      if (res.status === 200) {
        dispatch({
          type: AUTHENTICATION_POST_SUCCESS
        });
      }
    } catch (e) {
      // eslint-disable-next-line no-alert
      alert(e.response.data.error);
      dispatch({
        type: AUTHENTICATION_POST_ERROR
      });
    }
  };
};

const setOffersData = (params) => ({
  type: OFFERS_LIST_SET,
  payload: params,
});

const checkAuth = () => {
  return async (dispatch, _getState, api) => {
    dispatch({
      type: AUTHENTICATION_STATUS_FETCH_START
    });

    try {
      const isAuthenticated = await api.get(`login`);
      dispatch({
        type: AUTHENTICATION_STATUS_FETCH_SUCCESS,
        payload: isAuthenticated.status === 200,
      });
    } catch (e) {
      dispatch({
        type: AUTHENTICATION_STATUS_FETCH_SUCCESS,
        payload: false,
      });
    }
  };
};

const fetchOfferDetails = (id) => {
  return async (dispatch, _getState, api) => {
    dispatch({
      type: OFFER_DETAILS_FETCH_START
    });

    try {
      const offerDetails = await api.get(`hotels/${id}`);
      dispatch({
        type: OFFER_DETAILS_FETCH_SUCCESS,
        payload: offerDetails.data,
      });
    } catch (e) {
      dispatch({
        type: OFFER_DETAILS_FETCH_ERROR,
      });
    }
  };
};

const fetchOfferDetailsNearby = (id) => {
  return async (dispatch, _getState, api) => {
    dispatch({
      type: OFFER_DETAILS_NEARBY_FETCH_START
    });

    const offersNearby = await api.get(`hotels/${id}/nearby`);
    if (offersNearby.status === 200) {
      dispatch({
        type: OFFER_DETAILS_NEARBY_FETCH_SUCCESS,
        payload: offersNearby.data,
      });
    }
  };
};

const fetchOfferReviews = (id) => {
  return async (dispatch, _getState, api) => {
    dispatch({
      type: OFFER_REVIEWS_FETCH_START
    });

    const reviews = await api.get(`comments/${id}`);
    if (reviews.status === 200) {
      dispatch({
        type: OFFER_REVIEWS_FETCH_SUCCESS,
        payload: reviews.data,
      });
    }
  };
};

const sendReview = ({params, id}) => {
  return async (dispatch, _getState, api) => {
    dispatch({
      type: REVIEW_POST_START
    });

    const result = await api.post(`comments/${id}`, {
      ...params
    });

    if (result.status === 200) {
      dispatch({
        type: REVIEW_POST_SUCCESS,
        payload: result.data,
      });
    }
  };
};

export {
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

  OFFER_REVIEWS_FETCH_START,
  OFFER_REVIEWS_FETCH_SUCCESS,

  REVIEW_POST_START,
  REVIEW_POST_SUCCESS,

  setCity,
  setOffersData,
  checkAuth,
  fetchOffers,
  login,
  fetchOfferDetails,
  fetchOfferReviews,
  fetchOfferDetailsNearby,
  sendReview,
};
