import React, { Component } from 'react';
import axios from 'axios';
// import ApiService from './js/api-service';
import { Modal } from './Modal/Modal';
// import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';

const API_KEY = '32552782-0d4c86680018457e820f20492';
const perPage = 12;

axios.defaults.baseURL = 'https://pixabay.com/api';

// const apiService = new ApiService();

export class App extends Component {
  state = {
    searchQuery: 'cat',
    page: 1,
    images: [],
    showModal: false,
  };

  async componentDidMount() {
    const response = await axios.get(
      `/?key=${API_KEY}&q=${this.state.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&per_page=${perPage}&page=${this.state.page}`
    );
    this.setState({ images: response.data.hits });
  }

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  render() {
    const { showModal } = this.state;
    const { images } = this.state;

    return (
      <div>
        {/* <Searchbar /> */}
        {images.length > 0 ? <ImageGallery images={images} /> : null}
        <button type="button" onClick={this.toggleModal}>
          Open modal window
        </button>
        {showModal && <Modal></Modal>}
      </div>
    );
  }
}
