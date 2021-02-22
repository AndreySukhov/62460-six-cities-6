import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {useLocation, useHistory} from 'react-router-dom';

import {CITIES_LIST} from '../../store/reducer';
import {setCity, setOffersData} from '../../store/action';

import OffersList from '../offers-list/offers-list';
import Map from '../map/map';
import CitiesList from '../cities-list/cities-list';

const MainPage = (props) => {
  const {currentCity, onSetCity, onSetOffersData} = props;
  const location = useLocation();
  const history = useHistory();
  useEffect(() => {
    let newCity = null;
    const params = new URLSearchParams(location.search);
    const cityParam = params.get(`city`);
    if (!cityParam && CITIES_LIST[0]) {
      newCity = CITIES_LIST[0];
      params.append(`city`, CITIES_LIST[0]);
      history.push({search: params.toString()});
    } else {
      newCity = cityParam;
    }

    onSetCity(newCity);
    onSetOffersData(newCity);
  }, [location.search]);

  const hasOffers = currentCity.offers.list.length && currentCity.offers.locations.length;

  return (
    <main className="page__main page__main--index">
      <h1 className="visually-hidden">Cities</h1>
      <div className="tabs">
        <CitiesList cities={CITIES_LIST} currentCity={currentCity.name}/>
      </div>
      <div className="cities">
        <div className={`cities__places-container container ${hasOffers ? `` : `cities__places-container--empty`}`}>
          {hasOffers ? (
            <>
              <section className="cities__places places">
                <h2 className="visually-hidden">Places</h2>
                <b className="places__found">{currentCity.offers.list.length} places to stay in Amsterdam</b>
                <form className="places__sorting" action="#" method="get">
                  <span className="places__sorting-caption">Sort by</span>
                  <span className="places__sorting-type" tabIndex="0">
                  Popular
                    <svg className="places__sorting-arrow" width="7" height="4">
                      <use xlinkHref={`#icon-arrow-select`}/>
                    </svg>
                  </span>
                  <ul className="places__options places__options--custom places__options--opened">
                    <li className="places__option places__option--active" tabIndex="0">Popular</li>
                    <li className="places__option" tabIndex="0">Price: low to high</li>
                    <li className="places__option" tabIndex="0">Price: high to low</li>
                    <li className="places__option" tabIndex="0">Top rated first</li>
                  </ul>
                </form>
                <div className="cities__places-list places__list tabs__content">
                  <OffersList offers={currentCity.offers.list}/>
                </div>
              </section>
              <div className="cities__right-section">
                <Map points={currentCity.offers.locations}/>
              </div>
            </>
          ) : (
            <>
              <section className="cities__no-places">
                <div className="cities__status-wrapper tabs__content">
                  <b className="cities__status">No places to stay available</b>
                  <p className="cities__status-description">We could not find any property available at the moment in
                    Dusseldorf</p>
                </div>
              </section>
              <div className="cities__right-section" />
            </>
          )}
        </div>
      </div>
    </main>
  );
};

const mapStateToProps = ({currentCity}) => ({
  currentCity,
});

const mapDispatchToProps = (dispatch) => ({
  onSetCity(city) {
    dispatch(setCity(city));
  },
  onSetOffersData(city) {
    dispatch(setOffersData(city));
  },
});

MainPage.propTypes = {
  currentCity: PropTypes.object,

  onSetCity: PropTypes.func,
  onSetOffersData: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);
