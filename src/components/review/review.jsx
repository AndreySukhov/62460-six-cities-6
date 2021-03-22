import React from 'react';
import reviewShape from "../../propTypes/review";

const getDate = (dateSting) => {
  return new Date(dateSting);
};

const Review = ({
  data: {user, rating, comment, date}
}) => (
  <li className="reviews__item">
    <div className="reviews__user user">
      {user.avatarUrl && (
        <div className="reviews__avatar-wrapper user__avatar-wrapper">
          <img
            className="reviews__avatar user__avatar"
            src={user.avatarUrl} width="54" height="54"
            alt="Reviews avatar" />
        </div>
      )}
      {user.name && (
        <span className="reviews__user-name">
          {user.name}
        </span>
      )}
    </div>
    <div className="reviews__info">
      {rating && (
        <div className="reviews__rating rating">
          <div className="reviews__stars rating__stars">
            <span style={{width: `${Number(rating / 5) * 100}%`}} />
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
      )}
      {comment && (
        <p className="reviews__text">
          {comment}
        </p>
      )}
      {date && (
        <time className="reviews__time" >
          {getDate(date).toLocaleString(`en`, {year: `numeric`, month: `long`})}
        </time>
      )}
    </div>
  </li>
);

Review.propTypes = {
  data: reviewShape,
};

export default Review;
