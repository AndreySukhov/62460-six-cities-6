import React from 'react';
import PropTypes from 'prop-types';
import PlaceCard from '../place-card/place-card';

import {hotelShape} from '../../propTypes/hotel';

const OffersList = ({offers, setActiveOffer}) => {
  return (
    <>
      {offers.map((offer) => {
        return (
          <PlaceCard
            view="cities"
            key={offer.id}
            events={{
              onMouseEnter: () => setActiveOffer(offer.id),
              onMouseLeave: () => setActiveOffer(null)
            }}
            {...offer}
          />
        );
      })}
    </>
  );
};

OffersList.propTypes = {
  offers: PropTypes.arrayOf(PropTypes.shape({
    hotelShape
  })),
  setActiveOffer: PropTypes.func
};

export default OffersList;
