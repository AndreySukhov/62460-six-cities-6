import {createSelector} from 'reselect';

const getReviewsList = (list) => list;

const getSortedReviewsList = createSelector(
    [getReviewsList],
    (list) => {

      if (list.length) {
        return [...list].sort((a, b) => {
          return new Date(b.date) - new Date(a.date);
        });
      }

      return list;
    }
);

export {
  getSortedReviewsList,
};
