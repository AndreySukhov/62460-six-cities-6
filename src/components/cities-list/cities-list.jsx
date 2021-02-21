import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {withRouter} from 'react-router-dom';

const CitiesList = (props) => {

  const {cities, currentCity, location} = props;

  return (
    <section className="locations container">
      <ul className="locations__list tabs__list">
        {cities.map((city) => (
          <li className="locations__item" key={city}>
            <Link
              to={{
                pathname: location.pathname,
                search: `?city=${city}`,
              }}
              className={`locations__item-link tabs__item
               ${city === currentCity ? `tabs__item tabs__item--active` : ``}`}>
              <span>{city}</span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
};

CitiesList.propTypes = {
  currentCity: PropTypes.string,
  basePath: PropTypes.string,

  location: PropTypes.object,
  cities: PropTypes.arrayOf(PropTypes.string),
};

export default withRouter(CitiesList);
