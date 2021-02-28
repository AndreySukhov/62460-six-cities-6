import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

import {getPlaceCardInfoClass, getPlaceCardPreviewImgParams, getWrapClassName} from './utils';

import {hotelShape} from '../../propTypes/hotel';

const PlaceCard = ({
  id,
  // eslint-disable-next-line camelcase
  is_premium,
  // eslint-disable-next-line camelcase
  preview_image,
  // eslint-disable-next-line camelcase
  is_favorite,
  rating,
  price,
  title,
  type,
  view,
  events,
}) => {
  const placeCardInfoClass = getPlaceCardInfoClass(view);
  const placeCardPreviewImgParams = getPlaceCardPreviewImgParams(view);

  return (
    <article
      {...events}
      className={`${getWrapClassName(view)} place-card`}>
      {/* eslint-disable-next-line camelcase */}
      {is_premium && (
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
      )}
      <div className={`${view}__image-wrapper place-card__image-wrapper`}>
        <Link to={`/offer/${id}`}>
          {/* eslint-disable camelcase */}
          <img
            className="place-card__image"
            src={preview_image}
            width={placeCardPreviewImgParams.width}
            height={placeCardPreviewImgParams.height}
            alt="Place image"
          />
          {/* eslint-enable camelcase */}
        </Link>
      </div>
      <div className={`place-card__info ${placeCardInfoClass}`}>
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button
            // eslint-disable-next-line camelcase
            className={`place-card__bookmark-button ${is_favorite ? `place-card__bookmark-button--active` : ``} button`}
            type="button">
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark" />
            </svg>
            {/* eslint-disable-next-line camelcase */}
            <span className="visually-hidden">{is_favorite ? `In bookmarks` : `To bookmarks`}</span>
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
  view: `cities`
};

PlaceCard.propTypes = {
  ...hotelShape,
  events: PropTypes.object,
  view: PropTypes.oneOf([`cities`, `favorites`, `near-places`])
};

export default PlaceCard;
