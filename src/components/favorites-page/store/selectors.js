import {createSelector} from 'reselect';

const getFavoritesList = (favorites) => favorites;

const formatFavoritesList = createSelector(
    [getFavoritesList],
    (favorites) => {
      return favorites.reduce((acc, curr) => {
        if (!acc[curr.city.name]) {
          return {
            ...acc,
            [curr.city.name]: [curr]
          };
        } else {
          return {
            ...acc,
            [curr.city.name]: [...acc[curr.city.name], curr]
          };
        }
      }, {});
    });

export {
  formatFavoritesList
};
