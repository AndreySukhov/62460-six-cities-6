import axios from 'axios';
import camelcaseKeys from "camelcase-keys";

const BACKEND_URL = `https://6.react.pages.academy/six-cities`;
const REQUEST_TIMEOUT = 5000;


const createApi = () => {
  const api = axios.create({
    baseURL: BACKEND_URL,
    timeout: REQUEST_TIMEOUT,
    withCredentials: true,
  });

  const onSuccess = (response) => {
    return {
      ...response,
      data: camelcaseKeys(response.data, {deep: true})
    };
  };

  api.interceptors.response.use(onSuccess);

  return api;
};

export default createApi;
