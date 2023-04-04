import React, { Component } from 'react';
import axios from 'axios';
import { ThreeDots } from 'react-loader-spinner';
// import ApiService from './js/api-service';
import { Modal } from './Modal/Modal';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { ApiContainer } from './App.styled';

const API_KEY = '32552782-0d4c86680018457e820f20492';
const perPage = 12;

axios.defaults.baseURL = 'https://pixabay.com/api';

// const apiService = new ApiService();

export class App extends Component {
  state = {
    searchQuery: '',
    page: 1,
    images: [],
    totalHits: 0,
    largeImageURL: '',
    showModal: false,
    isLoading: false,
  };

  async componentDidMount() {}

  async componentDidUpdate(prevProps, prevState) {
    if (this.state.searchQuery !== prevState.searchQuery) {
      this.reset();
      this.fetchImages();
    }
  }

  async fetchImages() {
    this.setState({ isLoading: true });
    const response = await axios.get(
      `/?key=${API_KEY}&q=${this.state.searchQuery}&image_type=photo&orientation=horizontal&per_page=${perPage}&page=${this.state.page}`
    );
    this.setState(prevState => {
      const newImages = [...prevState.images, ...response.data.hits];
      return {
        page: prevState.page + 1,
        images: newImages,
        totalHits: response.data.totalHits,
      };
    });
    this.setState({ isLoading: false });
  }

  loadMore = () => {
    this.fetchImages();
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  reset = () => {
    this.setState({ page: 1, images: [] });
  };

  handleSubmit = searchQuery => {
    this.setState({
      searchQuery: searchQuery,
    });
  };

  imageClickHandler = event => {
    this.toggleModal();
    this.setState({ largeImageURL: event.currentTarget.dataset.url });
  };

  isLoadMoreButton = () => {
    return this.state.totalHits / perPage > this.state.page - 1;
  };

  render() {
    const { showModal } = this.state;
    const { images } = this.state;
    const { largeImageURL } = this.state;
    const { isLoading } = this.state;

    return (
      <ApiContainer>
        <Searchbar submitHandler={this.handleSubmit} />
        {images.length > 0 ? (
          <ImageGallery
            images={images}
            imageClickHandler={this.imageClickHandler}
          />
        ) : null}
        {isLoading && (
          <ThreeDots
            height="80"
            width="80"
            radius="9"
            color="#3f51b5"
            ariaLabel="three-dots-loading"
          />
        )}
        {images.length > 0 && this.isLoadMoreButton() ? (
          <Button loadMore={this.loadMore} />
        ) : null}
        {showModal && (
          <Modal url={largeImageURL} onClose={this.toggleModal}></Modal>
        )}
      </ApiContainer>
    );
  }
}
