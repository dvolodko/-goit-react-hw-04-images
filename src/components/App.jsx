import React, { Component } from 'react';
import { ThreeDots } from 'react-loader-spinner';
import { getImages } from 'api-service';
import { Modal } from './Modal/Modal';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { ApiContainer } from './App.styled';

export class App extends Component {
  state = {
    searchQuery: '',
    page: 1,
    images: [],
    totalHits: 0,
    largeImageURL: '',
    showModal: false,
    isLoading: false,
    error: '',
  };

  async componentDidUpdate(_, prevState) {
    const { page, searchQuery } = this.state;
    if (searchQuery !== prevState.searchQuery || page !== prevState.page) {
      this.fetchImages();
    }
  }

  async fetchImages() {
    const { page, searchQuery } = this.state;
    this.setState({ isLoading: true });
    try {
      const { hits, totalHits } = await getImages(searchQuery, page);

      if (!hits.length) {
        alert('No images found');
        return;
      }

      this.setState(prevState => {
        return {
          images: [...prevState.images, ...hits],
          totalHits,
          error: '',
        };
      });
    } catch (error) {
      this.setState({ error: 'Oops. Something went wrong' });
    } finally {
      this.setState({ isLoading: false });
    }
  }

  loadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  handleSubmit = searchQuery => {
    this.setState({
      searchQuery: searchQuery,
      page: 1,
      images: [],
      totalHits: 0,
    });
  };

  imageClickHandler = event => {
    this.toggleModal();
    this.setState({ largeImageURL: event.currentTarget.dataset.url });
  };

  render() {
    const { showModal, images, largeImageURL, isLoading, totalHits } =
      this.state;
    const showButton = images.length !== totalHits && !isLoading;

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
        {showButton ? <Button loadMore={this.loadMore} /> : null}
        {showModal && (
          <Modal url={largeImageURL} onClose={this.toggleModal}></Modal>
        )}
      </ApiContainer>
    );
  }
}
