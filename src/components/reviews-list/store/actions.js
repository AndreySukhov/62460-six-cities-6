import {createAsyncThunk} from '@reduxjs/toolkit';
import {API_ENDPOITS} from "../../../util/constants";

const ActionTypes = {
  REVIEW_POST: `reviews/post`,

  REVIEWS_FETCH: `reviews/fetch`
};

const ActionCreator = {
  sendReview: createAsyncThunk(ActionTypes.REVIEW_POST,
      async ({params, id}, thunkAPI) => {
        const {extra: {api}} = thunkAPI;
        try {
          const result = await api.post(`${API_ENDPOITS.comments}/${id}`, {
            ...params
          });

          return result.data;
        } catch (e) {
        // eslint-disable-next-line no-alert
          alert(e.response.data.error);
          return null;
        }
      }),
  fetchReviews: createAsyncThunk(ActionTypes.REVIEWS_FETCH,
      async (id, thunkAPI) => {
        const {extra: {api}} = thunkAPI;

        const reviews = await api.get(`${API_ENDPOITS.comments}/${id}`);
        return reviews.data;
      }
  ),
};

export {
  ActionTypes,
  ActionCreator,
};
