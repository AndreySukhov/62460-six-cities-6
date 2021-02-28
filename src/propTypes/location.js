import PropTypes from 'prop-types';

const locationShape = PropTypes.shape({
  lat: PropTypes.number,
  lng: PropTypes.number,
  offerId: PropTypes.number
});

export default locationShape;
