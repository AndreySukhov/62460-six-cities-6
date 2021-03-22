import PropTypes from 'prop-types';

const userShape = PropTypes.shape({
  avatarUrl: PropTypes.string,
  email: PropTypes.string,
  id: PropTypes.number,
  isPro: PropTypes.bool,
  name: PropTypes.string
});

export default userShape;
