import React, {useState, useMemo, Fragment} from 'react';
import PropTypes from 'prop-types';

const CommentForm = ({ratingOptionsLength}) => {
  const [rating, setRating] = useState(null);
  const [reviewText, setReviewText] = useState(``);

  const ratingOptions = useMemo(() => {
    return [...Array(ratingOptionsLength).keys()].reverse().map((i) => i + 1);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setRating(null);
    setReviewText(``);
  };

  return (
    <form className="reviews__form form" action="#" method="post" onSubmit={handleSubmit}>
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className="reviews__rating-form form__rating">
        {ratingOptions.map((index) => {
          return (
            <Fragment key={index}>
              <input
                className="form__rating-input visually-hidden"
                name="rating"
                checked={rating === index}
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
        value={reviewText}
        onChange={(e) => setReviewText(e.target.value)}
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        placeholder="Tell how was your stay, what you like and what can be improved" />
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and describe
          your stay with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button className="reviews__submit form__submit button" type="submit" >Submit</button>
      </div>
    </form>
  );
};

CommentForm.defaultProps = {
  ratingOptionsLength: 5,
};

CommentForm.propTypes = {
  ratingOptionsLength: PropTypes.number
};

export default CommentForm;
