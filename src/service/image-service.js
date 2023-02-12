import axios from 'axios';

const API_KEY = 'mbqawbQoBmq3xDmsPegAu5WsMTUbwvAXFCf0ORRkBVa6kLJZVeeW00in';
axios.defaults.baseURL = 'https://api.pexels.com/v1/';
axios.defaults.headers.common['Authorization'] = API_KEY;
axios.defaults.params = {
  orientation: 'landscape',
  per_page: 15,
};

export const getImages = async (query, page = 1) => {
  const { data } = await axios.get(`search?query=${query}&page=${page}`);
  return data;
};
