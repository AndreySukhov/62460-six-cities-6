/**
 * @desc мерж или добавиление параметра в строку search
 * @param{string} search
 * @param {object} params
 * @return {string}
 */
const mergeSearchWithParam = (search, params) => {
  let urlParams = new URLSearchParams();
  for (const key in params) {
    if (params[key] !== undefined) {
      urlParams.set(key, params[key].trim());
    }
  }
  return urlParams.toString();
};


/**
 * @desc сортирует массив по заданному свойству и направлению
 * @param {array} arr
 * @param {string} sortParam
 * @param {string} direction
 * @return {this|*[]} вернет отсортированный массив
 */
const sortManager = ({arr, sortParam, direction}) => {
  const SORT_DIRECTIONS = {
    asc: `asc`,
    desc: `desc`,
  };
  if (!direction || !SORT_DIRECTIONS[direction] || !sortParam) {
    return [...arr];
  }
  return [...arr].sort((a, b) => {
    if (direction === `asc`) {
      return b[sortParam] - a[sortParam];
    }
    return a[sortParam] - b[sortParam];
  });
};

export {
  mergeSearchWithParam,
  sortManager,
};
