import {combineReducers} from 'redux';

import authReducer from '../components/sign-in-page/store/reducers';
import offerDetailsReducer from '../components/offer-details-page/store/reducers';
import offersListReducer from '../components/offers-list/store/reducers';
import favoritesListReducer from '../components/favorites-page/store/reducers';
import reviewsReducer from '../components/reviews-list/store/reducers';

const rootReducer = combineReducers({
  authentication: authReducer,
  offerDetails: offerDetailsReducer,
  offersList: offersListReducer,
  favoritesList: favoritesListReducer,
  reviews: reviewsReducer,
});

export default rootReducer;
