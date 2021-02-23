import PropTypes from "prop-types";

const sortOptionShape = PropTypes.shape({
  label: PropTypes.string,
  name: PropTypes.string,
  direction: PropTypes.string,
});

export default sortOptionShape;
