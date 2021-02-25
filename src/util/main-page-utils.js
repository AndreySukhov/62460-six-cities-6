import {SORT_OPTIONS} from './constants';

/**
 * @desc: поиск лейбла для компонента с фильтром
 * @param {string} sort
 * @param {string} direction
 * @return {string}
 */
const getSortLabel = ({sort, direction}) => {
  const chosenSortLabel = SORT_OPTIONS.find((option) => {
    return option.name === sort && option.direction === direction;
  });
  if (chosenSortLabel) {
    return chosenSortLabel.label;
  }
  return SORT_OPTIONS.find((option) => !option.name && !option.direction).label;
};

export {
  getSortLabel
};
