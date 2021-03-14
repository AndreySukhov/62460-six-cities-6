const SORT_OPTIONS = [
  {
    label: `Popular`
  },
  {
    label: `Price: low to high`,
    name: `price`,
    direction: `desc`
  },
  {
    label: `Price: high to low`,
    name: `price`,
    direction: `asc`
  },
  {
    label: `Top rated first`,
    name: `rating`,
    direction: `asc`
  },
];

const ROUTES = {
  main: `/`,
  login: `/login`,
  favorites: `/favorites`,
  offer: `/offer/`,
};

const API_ENDPOITS = {
  hotels: `hotels`,
  login: `login`,
  comments: `comments`,
  favorite: `favorite`,
};

const LISTS_LIMITS = {
  ROOM_GALLERY: 6,
  REVIEWS_LIST: 10
};

const MAP_DATA = {
  CENTER: [52.38333, 4.9],
  DEFAULT_ZOOM: 12,
  ICONS: {
    default: `img/pin.svg`,
    active: `img/pin-active.svg`,
  }
};

const CITIES_LIST = [`Paris`, `Cologne`, `Brussels`, `Amsterdam`, `Hamburg`, `Dusseldorf`];

export {
  SORT_OPTIONS,
  ROUTES,
  API_ENDPOITS,
  LISTS_LIMITS,
  MAP_DATA,
  CITIES_LIST,
};
