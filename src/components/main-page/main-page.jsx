import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {useLocation, useHistory} from 'react-router-dom';

import {CITIES_LIST} from '../../util/constants';
import {SORT_OPTIONS} from '../../util/constants';
import {ActionCreator} from '../../store/offersList/actions-offersList';
import {getCurrentCityData} from '../../store/offersList/selectors-offersList';
import {mergeSearchWithParam} from '../../util';
import {getSortLabel} from '../../util/main-page-utils';
import hotelShape from '../../propTypes/hotel';
import locationShape from '../../propTypes/location';

import OffersList from '../offers-list/offers-list';
import Map from '../map/map';
import CitiesList from '../cities-list/cities-list';
import SortOption from '../sort-options/sort-options';
import MainPageEmpty from '../main-page-empty/main-page-empty';
import Preloader from '../preloader/preloader';

const MainPage = ({
  onSetCity,
  onSetOffersData,
  pending,
  items,
  currentCity,
  currentCityOffers,
  onFetchOffers
}) => {
  const location = useLocation();
  const history = useHistory();
  const [activeOffer, setActiveOffer] = useState(null);

  useEffect(() => {
    onFetchOffers();
  }, []);

  useEffect(() => {
    if (items && items.length && !pending) {
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
    }
  }, [items, pending, location.search]);

  const onSortChange = (param) => {
    const params = new URLSearchParams(location.search);
    history.push({search: mergeSearchWithParam(params, {
      sort: param.name, direction: param.direction, city: params.get(`city`)
    })
    });
  };

  const hasOffers = currentCityOffers.list.length && currentCityOffers.locations.length;

  return (
    <main className="page__main page__main--index">
      <h1 className="visually-hidden">Cities</h1>
      <div className="tabs">
        <CitiesList cities={CITIES_LIST} currentCity={currentCity.name}/>
      </div>
      {pending && (
        <div className="cities">
          <div className="container">
            <Preloader />
          </div>
        </div>
      )}
      {!pending && (
        <div className="cities">
          <div className={`cities__places-container container ${hasOffers ? `` : `cities__places-container--empty`}`}>
            {hasOffers ? (
              <>
                <section className="cities__places places">
                  <h2 className="visually-hidden">Places</h2>
                  <b className="places__found">{currentCityOffers.list.length} places to stay in {currentCity.name}</b>
                  <SortOption
                    options={SORT_OPTIONS}
                    currentGroup={currentCity.name}
                    chosenOption={currentCity.sort}
                    onOptionChoice={onSortChange}/>
                  <div className="cities__places-list places__list tabs__content">
                    <OffersList offers={currentCityOffers.list} setActiveOffer={setActiveOffer}/>
                  </div>
                </section>
                <div className="cities__right-section">
                  <Map points={currentCityOffers.locations} activeMarkerId={activeOffer} />
                </div>
              </>
            ) : (
              <MainPageEmpty city={currentCity.name} />
            )}
          </div>
        </div>
      )}

    </main>
  );
};

MainPage.propTypes = {
  pending: PropTypes.bool,
  items: PropTypes.arrayOf(hotelShape),
  currentCity: PropTypes.shape({
    name: PropTypes.string,
    sort: PropTypes.shape({
      direction: PropTypes.string,
      label: PropTypes.string,
      name: PropTypes.string,
    }),
  }),
  currentCityOffers: PropTypes.shape({
    list: PropTypes.arrayOf(hotelShape),
    locations: PropTypes.arrayOf(locationShape),
  }),

  onSetCity: PropTypes.func,
  onSetOffersData: PropTypes.func,
  onFetchOffers: PropTypes.func,
};

const mapStateToProps = (state) => {
  return {
    items: state.offersList.items,
    pending: state.offersList.pending,
    currentCityOffers: getCurrentCityData(state.offersList),
    currentCity: state.offersList.currentCity,
  };
};

const mapDispatchToProps = (dispatch) => ({
  onSetCity(city) {
    dispatch(ActionCreator.setCity(city));
  },
  onFetchOffers() {
    dispatch(ActionCreator.fetchOffersList());
  },
  onSetOffersData(city) {
    dispatch(ActionCreator.setOffersListData(city));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);
