import {API_ENDPOITS} from "../../util/constants";

const ActionTypes = {
  REVIEW_POST_START: `reviews/postStart`,
  REVIEW_POST_SUCCESS: `reviews/postSuccess`,

  REVIEWS_FETCH_START: `reviews/fetchStart`,
  REVIEWS_FETCH_SUCCESS: `reviews/fetchSuccess`,
};

const ActionCreator = {
  sendReview: ({params, id}) => {
    return async (dispatch, _getState, api) => {
      dispatch({
        type: ActionTypes.REVIEW_POST_START
      });

      const result = await api.post(`${API_ENDPOITS.comments}/${id}`, {
        ...params
      });

      if (result.status === 200) {
        dispatch({
          type: ActionTypes.REVIEW_POST_SUCCESS,
          payload: result.data,
        });
      }
    };
  },
  fetchReviews: (id) => {
    return async (dispatch, _getState, api) => {
      dispatch({
        type: ActionTypes.REVIEWS_FETCH_START
      });

      const reviews = await api.get(`${API_ENDPOITS.comments}/${id}`);
      if (reviews.status === 200) {
        dispatch({
          type: ActionTypes.REVIEWS_FETCH_SUCCESS,
          payload: reviews.data,
        });
      }
    };
  },
};

export {
  ActionTypes,
  ActionCreator,
};
