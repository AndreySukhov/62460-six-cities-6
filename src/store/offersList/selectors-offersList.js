import {createSelector} from 'reselect';
import {sortManager} from '../../util';

const getSortParams = (state) => {
  return state.currentCity.sort;
};

const getCurrentCityName = (state) => {
  return state.currentCity.name;
};

const getOffersList = (state) => {
  return state.items;
};

const getCurrentCityData = createSelector(
    [getSortParams, getCurrentCityName, getOffersList],
    (sortParams, cityName, offersList) => {
      const res = offersList.reduce((acc, curr) => {
        if (curr.city.name === cityName) {
          return {
            locations: [...acc.locations, {
              lat: curr.location.latitude,
              lng: curr.location.longitude,
              offerId: curr.id
            }],
            list: [...acc.list, curr],
          };
        }
        return acc;
      }, {
        locations: [],
        list: [],
      });

      res.list = sortManager({
        arr: res.list,
        direction: sortParams.direction,
        sortParam: sortParams.name
      });

      return res;
    }
);

export {
  getCurrentCityData,
};
