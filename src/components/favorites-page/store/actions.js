import {API_ENDPOITS} from '../../../util/constants';
import postFavorite from '../../../util/post-favorite';

const ActionTypes = {
  FAVORITES_LIST_FETCH_START: `favoritesList/fetchStart`,
  FAVORITES_LIST_FETCH_SUCCESS: `favoritesList/fetchSuccess`,

  TOGGLE_FAVORITE_START: `favoritesList/toggleFavoriteStart`,
  TOGGLE_FAVORITE_SUCCESS: `favoritesList/toggleFavoriteSuccess`,
};

const ActionCreator = {
  fetchFavoritesList: () => {
    return async (dispatch, _getState, api) => {
      dispatch({
        type: ActionTypes.FAVORITES_LIST_FETCH_START
      });

      const result = await api.get(`${API_ENDPOITS.favorite}`);

      if (result.status === 200) {
        dispatch({
          type: ActionTypes.FAVORITES_LIST_FETCH_SUCCESS,
          payload: result.data
        });
      }
    };
  },
  toggleFavorite: ({status, id}) => {
    return async (dispatch, _getState, api) => {
      dispatch({
        type: ActionTypes.TOGGLE_FAVORITE_START
      });

      const favoriteRequest = await postFavorite({status, id, api});
      if (favoriteRequest.status === 200) {
        dispatch({
          type: ActionTypes.TOGGLE_FAVORITE_SUCCESS,
          payload: favoriteRequest.data
        });
      }
    };
  },
};

export {
  ActionTypes,
  ActionCreator,
};
