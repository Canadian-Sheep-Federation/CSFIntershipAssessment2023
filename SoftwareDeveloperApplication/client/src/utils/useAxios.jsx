import axios from "axios";

/**
 * Axios package used for making HTTP requests to the API
 */

const useAxios = () => {
  const instance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    withCredentials: true,
  });
  return { axios: instance };
};

export default useAxios;
