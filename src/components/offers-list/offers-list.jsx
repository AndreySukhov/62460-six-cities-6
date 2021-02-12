import React, {useState} from 'react';
import PropTypes from 'prop-types';
import PlaceCard from '../place-card/place-card';

import {hotelShape} from '../../propTypes/hotel';

const OffersList = ({offers}) => {
  const [activeCardId, setActiveCardId] = useState(null);
  return (
    <>
      {offers.map((offer) => {
        return (
          <PlaceCard
            key={offer.id}
            onMouseEnter={() => setActiveCardId(offer.id)}
            onMouseLeave={() => setActiveCardId(null)}
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
