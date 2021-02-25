const CITY_CHANGE = `city/change`;

const OFFERS_LIST_SET = `offersList/set`;

const OFFERS_LIST_FETCH_START = `offersList/fetchStart`;
const OFFERS_LIST_FETCH_SUCCESS = `offersList/fetchSuccess`;

const setCity = (city) => ({
  type: CITY_CHANGE,
  payload: city,
});

const fetchOffers = () => {
  return (dispatch, _getState, api) => {
    api.get(`hotels`)
      .then((res) => {
        if (res.status === 200) {
          dispatch({
            type: OFFERS_LIST_FETCH_SUCCESS,
            payload: res.data
          });
        }
      });

    dispatch({
      type: OFFERS_LIST_FETCH_START
    });
  };
};

const setOffersData = (params) => ({
  type: OFFERS_LIST_SET,
  payload: params,
});


export {
  CITY_CHANGE,
  OFFERS_LIST_SET,

  OFFERS_LIST_FETCH_START,
  OFFERS_LIST_FETCH_SUCCESS,

  setCity,
  setOffersData,
  fetchOffers,
};
