const PLACE_CARD_INFO_CLASSES = {
  favorites: `favorites__card-info`,
  default: ``,
};

const PLACE_CARD_PREVIEW_IMG_PARAMS = {
  'favorites': {width: 150, height: 110},
  'near-places': {width: 260, height: 200},
  'default': {width: 260, height: 200},
};

const getPlaceCardInfoClass = (view) => PLACE_CARD_INFO_CLASSES[view] || PLACE_CARD_INFO_CLASSES.default;

const getPlaceCardPreviewImgParams = (view) => PLACE_CARD_PREVIEW_IMG_PARAMS[view] || PLACE_CARD_PREVIEW_IMG_PARAMS.default;

export {
  getPlaceCardInfoClass,
  getPlaceCardPreviewImgParams
};
