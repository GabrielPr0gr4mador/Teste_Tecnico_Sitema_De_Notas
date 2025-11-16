import axios from "axios";

const api = axios.create({
  baseURL: 'http://localhost:3000/api', //url local npm run dev
  headers: {
    'Content-Type': 'application/json',
  },
});

// Tratar erros 
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // Erro com resposta
      console.error('Erro na requisição:', error.response.data);
    } else if (error.request) {
      // Erro sem resposta 
      console.error('Servidor não respondeu:', error.request);
    } else {
      // Erro 
      console.error('Erro na requisição:', error.message);
    }
    return Promise.reject(error);
  }
);

export default api;