import React, {useMemo} from 'react';
import PropTypes from 'prop-types';

import {hotelShape} from '../../propTypes/hotel';

import PlaceCard from "../place-card/place-card";

const FavoritesPage = ({favorites}) => {

  const hasFavorites = useMemo(() => favorites && favorites.length > 0, [favorites]);

  return (
    <main className={`page__main page__main--favorites ${!hasFavorites && `page__main--favorites-empty`}`}>
      <div className="page__favorites-container container">
        <section className={`favorites ${!hasFavorites && `favorites--empty`}`}>
          {hasFavorites ? (
            <>
              <h1 className="favorites__title">Saved listing</h1>
              <ul className="favorites__list">
                {favorites.map((fav) => {
                  return (
                    <li className="favorites__locations-items" key={fav.city}>
                      <div className="favorites__locations locations locations--current">
                        <div className="locations__item">
                          <a className="locations__item-link" href="#">
                            <span>{fav.city}</span>
                          </a>
                        </div>
                      </div>
                      {fav.places && fav.places.length > 0 && (
                        <div className="favorites__places">
                          {fav.places.map((place) => {
                            return (
                              <PlaceCard view="favorites" {...place} key={place.id}/>
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
  favorites: PropTypes.arrayOf(PropTypes.shape({
    city: PropTypes.string,
    places: PropTypes.arrayOf(hotelShape)
  }))
};

export default FavoritesPage;
