import React from 'react';
import PropTypes from 'prop-types';
import PlaceCard from '../place-card/place-card';
import {connect} from 'react-redux';
import {ActionCreator} from '../../store/offersList/actions-offersList';

import {hotelShape} from '../../propTypes/hotel';

const OffersList = ({offers, setActiveOffer, favTogglePending, onFavToggle}) => {
  return (
    <>
      {offers.map((offer) => {
        return (
          <PlaceCard
            place="cities"
            key={offer.id}
            favTogglePending={favTogglePending}
            onFavToggle={onFavToggle}
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
};

OffersList.propTypes = {
  favTogglePending: PropTypes.bool,

  offers: PropTypes.arrayOf(PropTypes.shape({
    hotelShape
  })),

  onFavToggle: PropTypes.func,
  setActiveOffer: PropTypes.func
};

const mapStateToProps = ({offersList}) => ({
  favTogglePending: offersList.favTogglePending,
});

const mapDispatchToProps = (dispatch) => ({
  onFavToggle(params) {
    dispatch(ActionCreator.toggleFav(params));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(OffersList);
