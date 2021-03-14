import React, {useMemo, useEffect} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import PlaceCard from "../place-card/place-card";
import Preloader from "../preloader/preloader";
import {ActionCreator} from "../../store/favoritesList/actions-favoritesList";

const FavoritesPage = ({favoritesList, onFetchFavoritesList, onFavToggle}) => {
  useEffect(() => {
    onFetchFavoritesList();
  }, []);

  const hasFavorites = useMemo(() => favoritesList && favoritesList.data && Object.keys(favoritesList.data).length !== 0, [favoritesList.data]);
  if (favoritesList.pending) {
    return (
      <div className="container">
        <Preloader />
      </div>
    );
  }
  return (
    <main className={`page__main page__main--favorites ${!hasFavorites && `page__main--favorites-empty`}`}>
      <div className="page__favorites-container container">
        <section className={`favorites ${!hasFavorites && `favorites--empty`}`}>
          {hasFavorites ? (
            <>
              <h1 className="favorites__title">Saved listing</h1>
              <ul className="favorites__list">
                {Object.entries(favoritesList.data).map(([key, fav]) => {
                  return (
                    <li className="favorites__locations-items" key={key}>
                      <div className="favorites__locations locations locations--current">
                        <div className="locations__item">
                          <a className="locations__item-link" href="#">
                            <span>{key}</span>
                          </a>
                        </div>
                      </div>
                      {fav && fav.length > 0 && (
                        <div className="favorites__places">
                          {fav.map((place) => {
                            return (
                              <PlaceCard
                                favTogglePending={favoritesList.favTogglePending}
                                onFavToggle={onFavToggle}
                                place="favorites"
                                cardData={place}
                                key={place.id} />
                            );
                          })}
                        </div>
                      )}
                    </li>
                  );
                })}
              </ul>
            </>
          ) : (
            <>
              <h1 className="visually-hidden">Favorites (empty)</h1>
              <div className="favorites__status-wrapper">
                <b className="favorites__status">Nothing yet saved.</b>
                <p className="favorites__status-description">Save properties to narrow down search or plan your future
                    trips.</p>
              </div>
            </>
          )}
        </section>
      </div>
    </main>
  );
};

FavoritesPage.propTypes = {
  onFetchFavoritesList: PropTypes.func,
  onFavToggle: PropTypes.func,
  favoritesList: PropTypes.shape({
    pending: PropTypes.bool,
    favTogglePending: PropTypes.bool,
    data: PropTypes.object,
  })
};

const mapStateToProps = ({favoritesList}) => ({
  favoritesList
});

const mapDispatchToProps = (dispatch) => ({
  onFetchFavoritesList() {
    dispatch(ActionCreator.fetchFavoritesList());
  },
  onFavToggle(params) {
    dispatch(ActionCreator.toggleFav(params));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(FavoritesPage);
