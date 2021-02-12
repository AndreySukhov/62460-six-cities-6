import React from 'react';
import PropTypes from 'prop-types';

import {Link} from 'react-router-dom';

import {hotelShape} from '../../propTypes/hotel';

const FavoritesCard = ({
  id,
  // eslint-disable-next-line camelcase
  preview_image,
  // eslint-disable-next-line camelcase
  is_favorite,
  rating,
  price,
  title,
  type,
}) => {
  return (
    <article className="favorites__card place-card">
      <div className="favorites__image-wrapper place-card__image-wrapper">
        <Link to={`/offer/${id}`}>
          <img
            className="place-card__image"
            // eslint-disable-next-line camelcase
            src={preview_image}
            width="150"
            height="110"
            alt="Place image"
          />
        </Link>
      </div>
      <div className="favorites__card-info place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;${price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button
            className="place-card__bookmark-button place-card__bookmark-button--active button"
            type="button">
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref={`#icon-bookmark`} />
            </svg>
            {/* eslint-disable-next-line camelcase */}
            {is_favorite && (
              <span className="visually-hidden">In bookmarks</span>
            )}
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{width: `${Number(rating / 5)}`}} />
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <a href="#">{title}</a>
        </h2>
        <p className="place-card__type">{type}</p>
      </div>
    </article>
  );
};

FavoritesCard.propTypes = {
  ...hotelShape,

  onMouseEnter: PropTypes.func,
  onMouseLeave: PropTypes.func,
};

export default FavoritesCard;
