import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import Review from '../review/review';
import Preloader from '../preloader/preloader';
import ReviewForm from '../review-form/review-form';

import {LISTS_LIMITS} from '../../util/constants';
import reviewShape from '../../propTypes/review';
import {ActionCreator} from '../../store/reviews/actions-reviews';

const ReviewsList = ({
  reviews,
  pending,
  hotelId,
  onFetchReviews,
  isAuthenticated,
  maxListLength,
}) => {
  useEffect(() => {
    onFetchReviews(hotelId);
  }, []);

  if (pending) {
    return (
      <Preloader />
    );
  }
  return (
    <section className="property__reviews reviews">
      <h2 className="reviews__title">Reviews &middot;
        <span className="reviews__amount">{reviews.length}</span>
      </h2>
      <ul className="reviews__list">
        {reviews.map((review) => {
          if (review >= maxListLength) {
            return null;
          }
          return (
            <Review data={review} key={review.id} />
          );
        })}
      </ul>
      {isAuthenticated && (
        <ReviewForm hotelId={hotelId}/>
      )}
    </section>
  );
};

ReviewsList.propTypes = {
  pending: PropTypes.bool,
  isAuthenticated: PropTypes.bool,

  hotelId: PropTypes.number,
  maxListLength: PropTypes.number,

  reviews: PropTypes.arrayOf(reviewShape),

  onFetchReviews: PropTypes.func,
};

ReviewsList.defaultProps = {
  maxListLength: LISTS_LIMITS.ROOM_GALLERY,
};

const mapStateToProps = ({reviews, authentication}) => ({
  reviews: reviews.list,
  pending: reviews.pending,
  isAuthenticated: authentication.status,
});

const mapDispatchToProps = (dispatch) => ({
  onFetchReviews(id) {
    dispatch(ActionCreator.fetchReviews(id));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ReviewsList);

