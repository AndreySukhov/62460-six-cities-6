import React, {useMemo, useEffect} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import PlaceCard from '../place-card/place-card';
import Preloader from '../preloader/preloader';
import {formatFavoritesList} from './store/selectors';
import {ActionCreator} from './store/actions';

const FavoritesPage = ({
  favoritesList,
  favoritesListMeta,
  onFetchFavoritesList,
  onFavoriteToggle
}) => {
  useEffect(() => {
    onFetchFavoritesList();
  }, []);

  const hasFavorites = useMemo(() => favoritesList && Object.keys(favoritesList).length !== 0, [favoritesList]);
  if (favoritesListMeta.pending) {
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
                {Object.entries(favoritesList).map(([key, fav]) => {
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
                                favTogglePending={favoritesListMeta.favoriteTogglePending}
                                onFavoriteToggle={onFavoriteToggle}
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
  onFavoriteToggle: PropTypes.func,
  favoritesListMeta: PropTypes.shape({
    pending: PropTypes.bool,
    favoriteTogglePending: PropTypes.bool,
  }),
  favoritesList: PropTypes.object
};

const mapStateToProps = ({favoritesList}) => ({
  favoritesListMeta: {
    pending: favoritesList.pending,
    favoriteTogglePending: favoritesList.favoriteTogglePending,
  },
  favoritesList: formatFavoritesList(favoritesList.data)
});

const mapDispatchToProps = (dispatch) => ({
  onFetchFavoritesList() {
    dispatch(ActionCreator.fetchFavoritesList());
  },
  onFavoriteToggle(params) {
    dispatch(ActionCreator.toggleFavorite(params));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(FavoritesPage);
