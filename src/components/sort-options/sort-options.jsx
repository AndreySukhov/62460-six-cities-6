import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';

import sortOptionShape from '../../propTypes/sortOption';

const SortOption = ({onOptionChoice, chosenOption, options, currentGroup}) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(false);
  }, [currentGroup]);

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by</span>
      <span className="places__sorting-type" tabIndex="0" onClick={() => setIsOpen(!isOpen)}>
        {chosenOption.label || `не выбрано`}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref={`#icon-arrow-select`}/>
        </svg>
      </span>
      <ul className={`places__options places__options--custom ${isOpen ? `places__options--opened` : ``}`}>
        {options.map(({label, name, direction}) => {
          return (
            <li
              key={label}
              className={`places__option ${chosenOption.label === label ? `places__option--active` : ``}`}
              tabIndex="0"
              onClick={() => {
                onOptionChoice({
                  name,
                  direction,
                });
                setIsOpen(false);
              }}
            >
              {label}
            </li>
          );
        })}
      </ul>
    </form>
  );
};

SortOption.propTypes = {
  currentGroup: PropTypes.string,
  options: PropTypes.arrayOf(sortOptionShape),
  chosenOption: sortOptionShape,
  onOptionChoice: PropTypes.func,
};

export default SortOption;
