import PropTypes from 'prop-types';

const locationShape = PropTypes.shape({
  latitude: PropTypes.number,
  longitude: PropTypes.number,
  zoom: PropTypes.number,
});

const hotelShape = PropTypes.shape({
  bedrooms: PropTypes.number,
  city: PropTypes.shape({
    location: locationShape,
    name: PropTypes.string,
  }),
  description: PropTypes.string,
  goods: PropTypes.arrayOf(PropTypes.string),
  host: PropTypes.shape({
    // eslint-disable-next-line camelcase
    avatar_url: PropTypes.string,
    id: PropTypes.number,
    // eslint-disable-next-line camelcase
    is_pro: PropTypes.bool,
    name: PropTypes.string,
  }),
  id: PropTypes.number,
  images: PropTypes.arrayOf(PropTypes.string),
  // eslint-disable-next-line camelcase
  is_favorite: PropTypes.bool,
  // eslint-disable-next-line camelcase
  is_premium: PropTypes.bool,
  location: locationShape,
  // eslint-disable-next-line camelcase
  max_adults: PropTypes.number,
  // eslint-disable-next-line camelcase
  preview_image: PropTypes.string,
  price: PropTypes.number,
  rating: PropTypes.number,
  title: PropTypes.string,
  type: PropTypes.string,
});

export {
  hotelShape
};
