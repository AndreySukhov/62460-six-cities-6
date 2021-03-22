import React from 'react';
import PropTypes from 'prop-types';
import PlaceCard from '../place-card/place-card';
import {connect} from 'react-redux';
import {ActionCreator} from './store/actions';

import hotelShape from '../../propTypes/hotel';

const OffersList = ({offers, setActiveOffer, favoriteTogglePending, onFavoriteToggle}) => (
  <>
    {offers.map((offer) => {
      return (
        <PlaceCard
          place="cities"
          key={offer.id}
          favoriteTogglePending={favoriteTogglePending}
          onFavoriteToggle={onFavoriteToggle}
          domEvents={{
            onMouseEnter: () => setActiveOffer(offer.id),
            onMouseLeave: () => setActiveOffer(null)
          }}
          cardData={offer}
        />
      );
    })}
  </>
);

OffersList.propTypes = {
  favoriteTogglePending: PropTypes.bool,

  offers: PropTypes.arrayOf(PropTypes.shape({
    hotelShape
  })),

  onFavoriteToggle: PropTypes.func,
  setActiveOffer: PropTypes.func
};

const mapStateToProps = ({offersList}) => ({
  favoriteTogglePending: offersList.favoriteTogglePending,
});

const mapDispatchToProps = (dispatch) => ({
  onFavoriteToggle(params) {
    dispatch(ActionCreator.toggleFavorite(params));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(OffersList);
