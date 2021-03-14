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

const PLACE_CARD_PREVIEW_IMG_PARAMS = {
  'place-card': {width: 150, height: 110},
  'near-places': {width: 260, height: 200},
  'default': {width: 260, height: 200},
};

const BOOKMARK_ICON_IMG_PARAMS = {
  'property': {width: 31, height: 33},
  'place-card': {width: 18, height: 19},
  'default': {width: 18, height: 19},
};

const IMAGE_SIZE_TYPES = {
  placeCardPreview: `placeCardPreview`,
  bookmarkIcon: `bookmarkIcon`
};

/**
 * @desc возвращает размеры иконок/картинок в соответствии с конфигом
 * @param {string} imageType
 * @param {string} place
 * @return {{}|*|{width: number, height: number}}
 */
const getImageSizeFromConfig = (imageType, place) => {
  if (imageType === IMAGE_SIZE_TYPES.placeCardPreview) {
    return PLACE_CARD_PREVIEW_IMG_PARAMS[place] || PLACE_CARD_PREVIEW_IMG_PARAMS.default;
  }

  if (imageType === IMAGE_SIZE_TYPES.bookmarkIcon) {
    return BOOKMARK_ICON_IMG_PARAMS[place] || BOOKMARK_ICON_IMG_PARAMS.default;
  }

  return {};
};

export {
  mergeSearchWithParam,
  sortManager,
  getImageSizeFromConfig,
  IMAGE_SIZE_TYPES,
};
