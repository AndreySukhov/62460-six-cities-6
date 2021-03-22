import React from 'react';
import {Switch, Route, BrowserRouter} from 'react-router-dom';

import Header from "../Header/header";
import Footer from "../Footer/footer";

import MainPage from "../main-page/main-page";
import FavoritesPage from "../favorites-page/favorites-page";
import PrivateRoute from "../private-route/private-route";
import OfferDetailsPage from "../offer-details-page/offer-details-page";
import SignInPage from "../sign-in-page/sign-in-page";
import NotFoundPage from "../not-found-page/not-found-page";

import {ROUTES} from '../../util/constants';

const App = () => {
  return (
    <BrowserRouter>
      <div className="page">
        <Header />
        <Switch>
          <Route path={ROUTES.main} exact>
            <MainPage />
          </Route>
          <Route path={ROUTES.login} exact>
            <SignInPage />
          </Route>
          <PrivateRoute
            path={ROUTES.favorites}
            exact
            redirectRoute={ROUTES.login}
          >
            <FavoritesPage />
          </PrivateRoute>
          <Route path={`${ROUTES.offer}:id`} exact>
            <OfferDetailsPage />
          </Route>
          <Route>
            <NotFoundPage />
          </Route>
        </Switch>
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;
