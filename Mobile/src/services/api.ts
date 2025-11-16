import axios from 'axios';

const api = axios.create({
  baseURL: 'http://192.168.1.110:3000/api', // celular/expo
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

// pegar log de requisições
api.interceptors.request.use(
  (config) => {
    console.log(` ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    console.error(' Request Error:', error);
    return Promise.reject(error);
  }
);

// pegar para tratamento de erros
api.interceptors.response.use(
  (response) => {
    console.log(`${response.config.method?.toUpperCase()} ${response.config.url} - ${response.status}`);
    return response;
  },
  (error) => {
    if (error.response) {
      console.error(' Response Error:', error.response.data);
    } else if (error.request) {
      console.error('Network Error:', error.message);
    } else {
      console.error(' Error:', error.message);
    }
    return Promise.reject(error);
  }
);

export default api;