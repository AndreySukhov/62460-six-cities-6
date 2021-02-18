import React from 'react';
import PropTypes from 'prop-types';
import PlaceCard from '../place-card/place-card';

import {hotelShape} from '../../propTypes/hotel';

const OffersList = ({offers}) => {
  return (
    <>
      {offers.map((offer) => {
        return (
          <PlaceCard
            view="cities"
            key={offer.id}
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
  }))
};

export default OffersList;
