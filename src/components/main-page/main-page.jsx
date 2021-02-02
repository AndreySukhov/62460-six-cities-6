import React from 'react';
import PropTypes from 'prop-types';

import PlaceCard from "../place-card/place-card";

const MainPage = ({offersNum}) => {
  return (
    <div className="cities">
      <div className="cities__places-container container">
        <section className="cities__places places">
          <h2 className="visually-hidden">Places</h2>
          <b className="places__found">{offersNum} places to stay in Amsterdam</b>
          <div className="cities__places-list places__list tabs__content">
            {[...Array(10).keys()].map((item) => {
              return (
                <PlaceCard key={item} />
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
};

MainPage.propTypes = {
  offersNum: PropTypes.number
};

export default MainPage;
