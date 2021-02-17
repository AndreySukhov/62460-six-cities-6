import React from 'react';
import PropTypes from 'prop-types';

import Review from "../review/review";

import reviewShape from '../../propTypes/review';

const ReviewsList = ({reviews}) => (
  <ul className="reviews__list">
    {reviews.map((review) => <Review {...review} key={review.id} />)}
  </ul>
);

ReviewsList.propTypes = {
  reviews: PropTypes.arrayOf(reviewShape)
};

export default ReviewsList;
