import axios from 'axios';
const API_KEY = '32552782-0d4c86680018457e820f20492';
const perPage = 12;

axios.defaults.baseURL = 'https://pixabay.com/api';

export default class ApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }

  async getPictures() {
    const response = await axios.get(
      `/?key=${API_KEY}&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&per_page=${perPage}&page=${this.page}`
    );
    this.incrementPage();
    return response;
  }

  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}
