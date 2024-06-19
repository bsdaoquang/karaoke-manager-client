import axios from 'axios';
import queryString from 'query-string';


const axiosClient = axios.create({
  baseURL: 'http://192.168.1.5:3001',
  paramsSerializer: params => queryString.stringify(params),
});

axiosClient.interceptors.request.use(async (config) => {

  config.headers = {
    Authorization: '',
    Accept: 'application/json',
    ...config.headers,
  };

  config.data;
  return config;
});

axiosClient.interceptors.response.use(
  res => {
    if (res.data && res.status >= 200 && res.status < 299) {
      return res.data;
    }
    throw new Error('Error');
  },
  error => {
    console.log(`Error api ${JSON.stringify(error)}`);
    throw new Error(error.response);
  },
);

export default axiosClient;
