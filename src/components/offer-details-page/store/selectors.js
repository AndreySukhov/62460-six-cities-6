import {createSelector} from 'reselect';

const getNearbyOffers = (offers) => offers;

const getNearbyLocations = createSelector(
    [getNearbyOffers],
    (offers) => {
      return offers.map((offer) => {
        return {
          lat: offer.location.latitude,
          lng: offer.location.longitude,
          offerId: offer.id
        };
      });
    }

);

export {
  getNearbyLocations,
};
