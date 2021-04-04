import {combineReducers} from 'redux';

import authReducer from '../components/sign-in-page/store/reducers';
import offerDetailsReducer from '../components/offer-details-page/store/reducers';
import offersListReducer from '../components/offers-list/store/reducers';
import favoritesListReducer from '../components/favorites-page/store/reducers';
import reviewsReducer from '../components/reviews-list/store/reducers';

const rootReducer = combineReducers({
  authentication: authReducer.reducer,
  offerDetails: offerDetailsReducer.reducer,
  offersList: offersListReducer.reducer,
  favoritesList: favoritesListReducer.reducer,
  reviews: reviewsReducer.reducer,
});

export default rootReducer;
