import React from 'react';
import PropTypes from 'prop-types';

import './style.css';

const Preloader = ({size = 80}) => {
  const itemsSize = size * 0.8;
  return (
    <div className="lds-ring" style={{width: `${size}px`, height: `${size}px`}}>
      {[...Array(10)].map((_, i) => {
        return (
          <div key={i} style={{width: `${itemsSize}px`, height: `${itemsSize}px`}}/>
        );
      })}
    </div>
  );
};

Preloader.propTypes = {
  size: PropTypes.number,
};

export default Preloader;
