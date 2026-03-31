// import axios from 'axios';

// const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

// const api = axios.create({
//   baseURL: API_BASE_URL,
//   headers: {
//     'Content-Type': 'application/json',
//   },
// });

// export const categoryAPI = {
//   generate: (data) => api.post('/category/generate', data),
//   getRecent: () => api.get('/category/recent'),
// };

// export const proposalAPI = {
//   generate: (data) => api.post('/proposal/generate', data),
//   getRecent: () => api.get('/proposal/recent'),
//   getById: (id) => api.get(`/proposal/${id}`),
// };


import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';


const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});


api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.code === 'ECONNABORTED') {
      console.error('Request timeout');
    } else if (!error.response) {
      console.error('Network error - Backend might not be running');
    }
    return Promise.reject(error);
  }
);

export const categoryAPI = {
  generate: (data) => api.post('/category/generate', data),
  getRecent: () => api.get('/category/recent'),
};

export const proposalAPI = {
  generate: (data) => api.post('/proposal/generate', data),
  getRecent: () => api.get('/proposal/recent'),
  getById: (id) => api.get(`/proposal/${id}`),
};