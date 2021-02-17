import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

import {hotelShape} from '../../propTypes/hotel';

const PlaceCard = ({
  id,
  // eslint-disable-next-line camelcase
  is_premium,
  // eslint-disable-next-line camelcase
  preview_image,
  rating,
  price,
  title,
  type,
  onMouseEnter,
  onMouseLeave,
}) => {
  return (
    <article
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className="cities__place-card place-card">
      {/* eslint-disable-next-line camelcase */}
      {is_premium && (
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
      )}
      <div className="cities__image-wrapper place-card__image-wrapper">
        <Link to={`/offer/${id}`}>
          {/* eslint-disable-next-line camelcase */}
          <img className="place-card__image" src={preview_image} width="260" height="200" alt="Place image" />
        </Link>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button className="place-card__bookmark-button button" type="button">
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark" />
            </svg>
            <span className="visually-hidden">To bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{width: `${Number(rating / 5) * 100}%`}} />
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={`offer/${id}`}>{title}</Link>
        </h2>
        <p className="place-card__type">{type}</p>
      </div>
    </article>
  );
};

PlaceCard.defaultProps = {
  onMouseEnter: () => {},
  onMouseLeave: () => {},
};

PlaceCard.propTypes = {
  ...hotelShape,

  onMouseEnter: PropTypes.func,
  onMouseLeave: PropTypes.func,
};

export default PlaceCard;
