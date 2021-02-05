import React from 'react';
import {Switch, Route, BrowserRouter} from 'react-router-dom';

import Header from "../Header/header";
import Footer from "../Footer/footer";

import MainPage from "../main-page/main-page";
import FavoritesPage from "../favorites-page/favorites-page";
import RoomPage from "../room-page/room-page";
import SignInPage from "../sign-in-page/sign-in-page";
import NotFoundPage from "../not-found-page/not-found-page";

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
            <RoomPage />
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
