import {API_ENDPOITS} from "../../util/constants";
import postFavorite from "../../util/post-favorite";

const ActionTypes = {
  FAVORITES_LIST_FETCH_START: `favoritesList/fetchStart`,
  FAVORITES_LIST_FETCH_SUCCESS: `favoritesList/fetchSuccess`,

  TOGGLE_FAV_START: `favoritesList/toggleFavStart`,
  TOGGLE_FAV_SUCCESS: `favoritesList/toggleFavSuccess`,
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
          payload: result.data,
        });
      }
    };
  },
  toggleFav: ({status, id}) => {
    return async (dispatch, _getState, api) => {
      dispatch({
        type: ActionTypes.TOGGLE_FAV_START
      });

      const favRequest = await postFavorite({status, id, api});
      if (favRequest.status === 200) {
        dispatch({
          type: ActionTypes.TOGGLE_FAV_SUCCESS,
          payload: favRequest.data
        });
      }
    };
  },
};

export {
  ActionTypes,
  ActionCreator,
};
