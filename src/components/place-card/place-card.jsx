import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

import BookmarkButton from '../bookmark-button/bookmark-button';

import {getPlaceCardInfoClass, getWrapClassName} from './utils';
import {getImageSizeFromConfig, IMAGE_SIZE_TYPES} from '../../util';

import {hotelShape} from '../../propTypes/hotel';
import {ROUTES} from '../../util/constants';

const PlaceCard = ({
  cardData: {
    id,
    isPremium,
    previewImage,
    isFavorite,
    rating,
    price,
    title,
    type,
  },
  place,
  favTogglePending,
  onFavToggle,
  domEvents
}) => {
  const placeCardInfoClass = getPlaceCardInfoClass(place);
  const placeCardPreviewImgParams = getImageSizeFromConfig(IMAGE_SIZE_TYPES.placeCardPreview, place);
  return (
    <article
      {...domEvents}
      className={`${getWrapClassName(place)} place-card`}>
      {isPremium && (
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
      )}
      <div className={`${place}__image-wrapper place-card__image-wrapper`}>
        <Link to={`${ROUTES.offer}${id}`}>
          <img
            className="place-card__image"
            src={previewImage}
            width={placeCardPreviewImgParams.width}
            height={placeCardPreviewImgParams.height}
            alt="Place image"
          />
        </Link>
      </div>
      <div className={`place-card__info ${placeCardInfoClass}`}>
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <BookmarkButton
            place='place-card'
            isFavorite={isFavorite}
            onClick={onFavToggle}
            disabled={favTogglePending}
            placeId={id}
          />
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{width: `${Number(rating / 5) * 100}%`}} />
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={`${ROUTES.offer}${id}`}>{title}</Link>
        </h2>
        <p className="place-card__type">{type}</p>
      </div>
    </article>
  );
};


PlaceCard.defaultProps = {
  place: `cities`
};

PlaceCard.propTypes = {
  cardData: hotelShape,
  stateDataKey: PropTypes.string,

  favTogglePending: PropTypes.bool,

  domEvents: PropTypes.object,

  onFavToggle: PropTypes.func,

  place: PropTypes.oneOf([`cities`, `favorites`, `near-places`]),
};

export default PlaceCard;

