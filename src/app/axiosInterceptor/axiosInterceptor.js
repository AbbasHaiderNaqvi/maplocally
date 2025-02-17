import axios from 'axios';

const api= axios.create({
  baseURL: 'https://maplocally-be.vercel.app' 
});

export default api;
