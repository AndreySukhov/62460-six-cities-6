import {API_ENDPOITS} from './constants';

const postFavorite = async ({api, id, status}) => {
  return api.post(`${API_ENDPOITS.favorite}/${id}/${status}`);
};

export default postFavorite;
