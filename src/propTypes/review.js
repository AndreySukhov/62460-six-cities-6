import PropTypes from 'prop-types';

const reviewShape = PropTypes.shape({
  comment: PropTypes.string,
  date: PropTypes.string,
  id: PropTypes.number,
  rating: PropTypes.number,
  user: PropTypes.shape({
    // eslint-disable-next-line camelcase
    avatar_url: PropTypes.string,
    id: PropTypes.number,
    // eslint-disable-next-line camelcase
    is_pro: PropTypes.bool,
    name: PropTypes.string
  })
});

export default reviewShape;
