const PLACE_CARD_INFO_CLASSES = {
  favorites: `favorites__card-info`,
  default: ``,
};

const getPlaceCardInfoClass = (view) => PLACE_CARD_INFO_CLASSES[view] || PLACE_CARD_INFO_CLASSES.default;

const getWrapClassName = (view) => {
  if (view === `cities`) {
    return `${view}__place-card`;
  }

  return `${view}__card`;
};

export {
  getPlaceCardInfoClass,
  getWrapClassName
};
