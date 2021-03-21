import {createSelector} from 'reselect';
import camelcaseKeys from 'camelcase-keys';

const getFavoritesList = (favorites) => favorites;

const formatFavoritesList = createSelector(
    [getFavoritesList],
    (favorites) => {
      return favorites.reduce((acc, curr) => {
        if (!acc[curr.city.name]) {
          return {
            ...acc,
            [curr.city.name]: [camelcaseKeys(curr, {deep: true})]
          };
        } else {
          return {
            ...acc,
            [curr.city.name]: [...acc[curr.city.name], camelcaseKeys(curr, {deep: true})]
          };
        }
      }, {});
    });

export {
  formatFavoritesList
};
