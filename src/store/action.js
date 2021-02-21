const CITY_CHANGE = `city/change`;

const OFFERS_LIST_SET = `offersList/set`;

const setCity = (city) => ({
  type: CITY_CHANGE,
  payload: city,
});

const setOffersData = (city) => ({
  type: OFFERS_LIST_SET,
  payload: city,
});


export {
  CITY_CHANGE,
  OFFERS_LIST_SET,

  setCity,
  setOffersData,
};
