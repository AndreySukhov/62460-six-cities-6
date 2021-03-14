import {ActionTypes} from './actions-reviews';

const defaultState = {
  formPending: false,
  pending: true,
  list: [],
};

const reviewsReducer = (state = defaultState, action) => {
  const {type, payload} = action;
  switch (type) {
    case ActionTypes.REVIEWS_FETCH_START:
      return {
        ...state,
        pending: true,
        list: [],
      };
    case ActionTypes.REVIEWS_FETCH_SUCCESS: {
      return {
        ...state,
        pending: false,
        list: payload,
      };
    }
    case ActionTypes.REVIEW_POST_START: {
      return {
        ...state,
        formPending: true,
      };
    }
    case ActionTypes.REVIEW_POST_SUCCESS:
      return {
        ...state,
        formPending: false,
        list: payload,
      };
    default:
      return state;
  }
};

export default reviewsReducer;
