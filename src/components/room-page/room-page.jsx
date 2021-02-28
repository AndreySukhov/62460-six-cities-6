import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {useParams} from 'react-router-dom';

import PlaceCard from "../place-card/place-card";
import CommentForm from "../comment-form/comment-form";
import Preloader from "../preloader/preloader";
import Map from "../map/map";
import ReviewsList from "../reviews-list/reviews-list";
import {fetchOfferDetails, fetchOfferReviews, fetchOfferDetailsNearby} from "../../store/action";
import {hotelShape} from "../../propTypes/hotel";
import NotFoundPage from "../not-found-page/not-found-page";
import reviewShape from "../../propTypes/review";
import locationShape from "../../propTypes/location";

const RoomPage = ({
  isAuthenticated,
  onFetchOfferData,
  currentOffer: {pending, data},
  currentOfferReviews,
  currentOfferNearby,
}) => {
  const params = useParams();

  useEffect(() => {
    onFetchOfferData(parseInt(params.id, 10));
  }, [params.id]);

  if (pending) {
    return (
      <main className="page__main page__main--property">
        <section className="property">
          <div className="property__gallery-container container">
            <Preloader />
          </div>
        </section>
      </main>
    );
  }

  if (!pending && !data) {
    return (
      <NotFoundPage />
    );
  }

  return (
    <main className="page__main page__main--property">
      <section className="property">
        {data.images && data.images.length && data.images.length > 0 && (
          <div className="property__gallery-container container">
            <div className="property__gallery">
              {data.images.map((image) => {
                return (
                  <div className="property__image-wrapper" key={image}>
                    <img className="property__image" src={image} alt={`${data.title} location photo`} />
                  </div>
                );
              })}
            </div>
          </div>
        )}
        <div className="property__container container">
          <div className="property__wrapper">
            {data.is_premium && (
              <div className="property__mark">
                <span>Premium</span>
              </div>
            )}
            <div className="property__name-wrapper">
              {data.title && (
                <h1 className="property__name">
                  {data.title}
                </h1>
              )}
              <button
                className={`property__bookmark-button ${data.is_favorite ? `property__bookmark-button--active` : ``} button`}
                type="button"
              >
                <svg className="property__bookmark-icon" width="31" height="33">
                  <use xlinkHref={`#icon-bookmark`} />
                </svg>
                <span className="visually-hidden">{data.is_favorite ? `In bookmarks` : `To bookmarks`}</span>
              </button>
            </div>
            {data.rating && (
              <div className="property__rating rating">
                <div className="property__stars rating__stars">
                  <span style={{width: `${Number(data.rating / 5) * 100}%`}} />
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="property__rating-value rating__value">{data.rating}</span>
              </div>
            )}
            <ul className="property__features">
              <li className="property__feature property__feature--entire">
                {data.type}
              </li>
              <li className="property__feature property__feature--bedrooms">
                {data.bedrooms} Bedrooms
              </li>
              <li className="property__feature property__feature--adults">
                Max {data.max_adults} adults
              </li>
            </ul>
            {data.price && (
              <div className="property__price">
                <b className="property__price-value">&euro;{data.price}</b>
                <span className="property__price-text">&nbsp;night</span>
              </div>
            )}
            {data.goods && (
              <div className="property__inside">
                <h2 className="property__inside-title">What&apos;s inside</h2>
                <ul className="property__inside-list">
                  {data.goods.map((goodsItem) => {
                    return (
                      <li className="property__inside-item" key={goodsItem}>
                        {goodsItem}
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}
            {(data.host || data.description) && (
              <div className="property__host">
                {data.host && (
                  <>
                    <h2 className="property__host-title">Meet the host</h2>
                    <div className="property__host-user user">
                      <div className={`property__avatar-wrapper user__avatar-wrapper ${data.host.is_pro ? `property__avatar-wrapper--pro` : ``}`}>
                        <img
                          className="property__avatar user__avatar"
                          src={data.host.avatar_url} width="74" height="74"
                          alt="Host avatar" />
                      </div>
                      <span className="property__user-name">
                        {data.host.name}
                      </span>
                    </div>
                  </>
                )}
                {data.description && (
                  <div className="property__description">
                    <p className="property__text">
                      {data.description}
                    </p>
                  </div>
                )}
              </div>
            )}
            <section className="property__reviews reviews">
              <h2 className="reviews__title">Reviews &middot;
                <span className="reviews__amount">{currentOfferReviews.length}</span>
              </h2>
              {currentOfferReviews.length > 0 && (
                <ReviewsList reviews={currentOfferReviews} />
              )}
              {isAuthenticated && (
                <CommentForm hotelId={data.id}/>
              )}
            </section>
          </div>
        </div>
        {currentOfferNearby.locations.length > 0 && (
          <section className="property__map map" >
            <Map points={currentOfferNearby.locations} />
          </section>
        )}
      </section>
      {currentOfferNearby.list.length > 0 && (
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">Other places in the neighbourhood</h2>
            <div className="near-places__list places__list">
              {currentOfferNearby.list.map((offer) => {
                return (
                  <PlaceCard key={offer.id} view="near-places" {...offer} />
                );
              })}
            </div>
          </section>
        </div>
      )}
    </main>
  );
};

RoomPage.propTypes = {
  isAuthenticated: PropTypes.bool,

  onFetchOfferData: PropTypes.func,

  currentOfferReviews: PropTypes.arrayOf(reviewShape),
  currentOfferNearby: PropTypes.shape({
    list: PropTypes.arrayOf(hotelShape),
    locations: PropTypes.arrayOf(locationShape)
  }),

  currentOffer: PropTypes.shape({
    pending: PropTypes.bool,
    data: hotelShape,
  })
};

const mapStateToProps = ({isAuthenticated, currentOffer, currentOfferReviews, currentOfferNearby}) => ({
  isAuthenticated,
  currentOffer,
  currentOfferReviews,
  currentOfferNearby,
});

const mapDispatchToProps = (dispatch) => ({
  onFetchOfferData(id) {
    dispatch(fetchOfferDetails(id));
    dispatch(fetchOfferReviews(id));
    dispatch(fetchOfferDetailsNearby(id));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(RoomPage);
