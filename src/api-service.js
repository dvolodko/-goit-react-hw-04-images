import axios from 'axios';
const API_KEY = '32552782-0d4c86680018457e820f20492';
const PER_PAGE = 12;

axios.defaults.baseURL = 'https://pixabay.com/api';

export const getImages = async (query, page) => {
  const { data } = await axios.get(
    `/?key=${API_KEY}&q=${query}&image_type=photo&orientation=horizontal&per_page=${PER_PAGE}&page=${page}`
  );
  return data;
};
