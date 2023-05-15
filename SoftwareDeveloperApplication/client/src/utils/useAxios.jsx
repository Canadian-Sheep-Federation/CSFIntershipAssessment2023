import axios from "axios";

/**
 * Axios package used for making HTTP requests to the API
 */

const useAxios = () => {
  const instance = axios.create({
    baseURL: "localhost:8080",
    withCredentials: true,
  });
  return { axios: instance };
};

export default useAxios;
