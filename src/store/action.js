const CITY_CHANGE = `city/change`;

const OFFERS_LIST_SET = `offersList/set`;

const AUTHENTICATION_STATUS_FETCH_START = `authenticationStatus/fetchStart`;
const AUTHENTICATION_STATUS_FETCH_SUCCESS = `authenticationStatus/fetchSuccess`;

const AUTHENTICATION_POST_START = `authentication/postStart`;
const AUTHENTICATION_POST_SUCCESS = `authentication/postSuccess`;
const AUTHENTICATION_POST_ERROR = `authentication/postError`;

const OFFERS_LIST_FETCH_START = `offersList/fetchStart`;
const OFFERS_LIST_FETCH_SUCCESS = `offersList/fetchSuccess`;

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

    const isAuthenticated = await api.get(`login`)
      .then((res) => {
        return res.status === 200;
      }).catch(() => {
        return false;
      });

    dispatch({
      type: AUTHENTICATION_STATUS_FETCH_SUCCESS,
      payload: isAuthenticated,
    });
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

  setCity,
  setOffersData,
  checkAuth,
  fetchOffers,
  login,
};
