import React, {useState, useMemo, Fragment} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {ActionCreator} from "../../store/reviews/actions-reviews";

const ReviewForm = ({
  ratingOptionsLength,
  commentLength,
  hotelId,
  pending,
  onSendReview
}) => {
  const [rating, setRating] = useState(null);
  const [comment, setComment] = useState(``);

  const ratingOptions = useMemo(() => {
    return [...Array(ratingOptionsLength).keys()].reverse().map((i) => i + 1);
  }, []);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    onSendReview({params: {comment, rating}, id: hotelId});
    setRating(null);
    setComment(``);
  };

  return (
    <form className="reviews__form form" action="#" method="post" onSubmit={handleFormSubmit}>
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className="reviews__rating-form form__rating">
        {ratingOptions.map((index) => {
          return (
            <Fragment key={index}>
              <input
                className="form__rating-input visually-hidden"
                name="rating"
                checked={rating === index}
                disabled={pending}
                value={index}
                id={`${index}-stars`}
                type="radio"
                onChange={() => setRating(index)}
              />
              <label
                htmlFor={`${index}-stars`}
                className="reviews__rating-label form__rating-label" title="perfect">
                <svg className="form__star-image" width="37" height="33">
                  <use xlinkHref={`#icon-star`} />
                </svg>
              </label>
            </Fragment>
          );
        })}
      </div>
      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        disabled={pending}
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        placeholder="Tell how was your stay, what you like and what can be improved" />
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and describe
          your stay with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button
          disabled={
            comment.trim().length < commentLength.min ||
            comment.trim().length >= commentLength.max ||
            !rating ||
            pending
          }
          className="reviews__submit form__submit button"
          type="submit">
          Submit
        </button>
      </div>
    </form>
  );
};

ReviewForm.defaultProps = {
  ratingOptionsLength: 5,
  commentLength: {
    max: 300,
    min: 50,
  },
};

ReviewForm.propTypes = {
  ratingOptionsLength: PropTypes.number,
  hotelId: PropTypes.number,

  onSendReview: PropTypes.func,

  pending: PropTypes.bool,

  commentLength: PropTypes.shape({
    max: PropTypes.number,
    min: PropTypes.number,
  })
};

const mapStateToProps = ({reviews}) => ({
  pending: reviews.pending
});

const mapDispatchToProps = (dispatch) => ({
  onSendReview({params, id}) {
    dispatch(ActionCreator.sendReview({params, id}));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ReviewForm);
