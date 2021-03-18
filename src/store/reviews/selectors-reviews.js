import {createSelector} from 'reselect';

const getReviewsList = (list) => list;

const getSortedReviewsList = createSelector(
    [getReviewsList],
    (list) => list.sort((a, b) => new Date(b.date) - new Date(a.date))
);

export {
  getSortedReviewsList,
};
