import PropTypes from 'prop-types';

const reviewShape = PropTypes.shape({
  id: PropTypes.number,
  avatar: PropTypes.string,
  userName: PropTypes.string,
  rating: PropTypes.number,
  text: PropTypes.string,
  date: PropTypes.string
});

export default reviewShape;
