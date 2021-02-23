import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {useLocation, useHistory} from 'react-router-dom';

import {CITIES_LIST} from '../../store/reducer';
import {SORT_OPTIONS} from '../../util/constants';
import {setCity, setOffersData} from '../../store/action';
import {mergeSearchWithParam} from "../../util";

import OffersList from '../offers-list/offers-list';
import Map from '../map/map';
import CitiesList from '../cities-list/cities-list';
import SortOption from '../sort-options/sort-options';

const MainPage = (props) => {
  const {currentCity, onSetCity, onSetOffersData} = props;
  const location = useLocation();
  const history = useHistory();

  const getSortLabel = ({sort, direction}) => {
    const chosenSortLabel = SORT_OPTIONS.find((option) => {
      return option.name === sort && option.direction === direction;
    });
    if (chosenSortLabel) {
      return chosenSortLabel.label;
    }
    return SORT_OPTIONS.find((option) => !option.name && !option.direction).label;
  };

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const searchQuery = {
      city: params.get(`city`),
      sort: params.get(`sort`),
      direction: params.get(`direction`),
    };

    const city = searchQuery.city || CITIES_LIST[0];
    const sort = searchQuery.sort;
    const direction = searchQuery.direction;
    if (!searchQuery.city) {
      params.append(`city`, CITIES_LIST[0]);
      history.push({search: params.toString()});
    }
    onSetCity(city);
    onSetOffersData({city, sort: {
      name: sort,
      direction,
      label: getSortLabel({sort, direction})}
    });
  }, [location.search]);

  const onSortChange = (param) => {
    const params = new URLSearchParams(location.search);
    history.push({search: mergeSearchWithParam(params, {
      sort: param.name, direction: param.direction,
    })
    });
  };

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
                <SortOption
                  options={SORT_OPTIONS}
                  chosenOption={currentCity.sort}
                  onOptionChoice={onSortChange}/>
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
