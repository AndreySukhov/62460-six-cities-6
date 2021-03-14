import React from 'react';
import PropTypes from 'prop-types';
import {useHistory} from 'react-router-dom';
import {connect} from 'react-redux';

import {getImageSizeFromConfig, IMAGE_SIZE_TYPES} from '../../util';

const BookmarkButton = ({
  place,
  isAuthenticated,
  isFavorite,
  disabled,
  onClick,
  placeId,
}) => {
  const history = useHistory();
  const iconSize = getImageSizeFromConfig(IMAGE_SIZE_TYPES.bookmarkIcon, place);

  return (
    <button
      // eslint-disable-next-line camelcase
      className={`${place}__bookmark-button ${isFavorite ? `${place}__bookmark-button--active` : ``} button`}
      type="button"
      disabled={disabled}
      onClick={() => {
        if (!isAuthenticated) {
          history.push(`/login`);
          return;
        }
        onClick({id: placeId, status: isFavorite ? 0 : 1});
      }}>
      <svg className={`${place}__bookmark-icon`} width={iconSize.width} height={iconSize.height}>
        <use xlinkHref="#icon-bookmark" />
      </svg>
      {/* eslint-disable-next-line camelcase */}
      <span className="visually-hidden">{isFavorite ? `In bookmarks` : `To bookmarks`}</span>
    </button>
  );
};

BookmarkButton.defaultProps = {
  place: `place-card`
};

BookmarkButton.propTypes = {
  isAuthenticated: PropTypes.bool,
  isFavorite: PropTypes.bool,
  disabled: PropTypes.bool,

  placeId: PropTypes.number.isRequired,
  place: PropTypes.string,

  onClick: PropTypes.func.isRequired,
};

const mapStateToProps = ({authentication}) => ({
  isAuthenticated: authentication.status,
});

export default connect(mapStateToProps, null)(BookmarkButton);
