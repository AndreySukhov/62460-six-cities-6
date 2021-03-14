import {combineReducers} from 'redux';

import authReducer from './auth/reducers-auth';
import offerDetailsReducer from './offerDetails/reducers-offerDetails';
import offersListReducer from './offersList/reducers-offersList';
import favoritesListReducer from './favoritesList/reducers-favoritesList';
import reviewsReducer from './reviews/reducers-reviews';

const rootReducer = combineReducers({
  authentication: authReducer,
  offerDetails: offerDetailsReducer,
  offersList: offersListReducer,
  favoritesList: favoritesListReducer,
  reviews: reviewsReducer,
});

export default rootReducer;
