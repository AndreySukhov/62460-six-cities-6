import React from 'react';
import {Switch, Route, BrowserRouter} from 'react-router-dom';

import Header from "../Header/header";
import Footer from "../Footer/footer";

import MainPage from "../main-page/main-page";
import FavoritesPage from "../favorites-page/favorites-page";
import PlaceCard from "../place-card/place-card";
import SignInPage from "../sign-in-page/sign-in-page";
import NotFound from "../not-found/not-found";

const App = () => {
  return (
    <BrowserRouter>
      <div className="page">
        <Header />
        <Switch>
          <Route path="/" exact>
            <MainPage offersNum={312} />
          </Route>
          <Route path="/login" exact>
            <SignInPage />
          </Route>
          <Route path="/favorites" exact>
            <FavoritesPage />
          </Route>
          <Route path="/offer/:id" exact>
            <PlaceCard />
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;
