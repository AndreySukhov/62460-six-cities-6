import React from 'react';
import reviewShape from "../../propTypes/review";

const getDate = (dateSting) => {
  const splitDate = dateSting.split(`-`);
  return new Date(splitDate[0], splitDate[1] - 1, splitDate[2]);
};

const Review = ({avatar, userName, rating, text, date }) => (
  <li className="reviews__item">
    <div className="reviews__user user">
      {avatar && (
        <div className="reviews__avatar-wrapper user__avatar-wrapper">
          <img
            className="reviews__avatar user__avatar"
            src={avatar} width="54" height="54"
            alt="Reviews avatar" />
        </div>
      )}
      {userName && (
        <span className="reviews__user-name">
          {userName}
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
      {text && (
        <p className="reviews__text">
          {text}
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
  ...reviewShape
};

export default Review
