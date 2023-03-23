import React, { Component } from 'react';
import ApiService from './js/api-service';
import { Modal } from './Modal/Modal';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { ImageGalleryItem } from './ImageGalleryItem/ImageGalleryItem';

const apiService = new ApiService();

export class App extends Component {
  state = {
    showModal: false,
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };
  render() {
    const { showModal } = this.state;

    return (
      <div>
        <Searchbar />
        <ImageGallery>
          <ImageGalleryItem></ImageGalleryItem>
        </ImageGallery>
        <button type="button" onClick={this.toggleModal}>
          Open modal window
        </button>
        {showModal && <Modal></Modal>}
      </div>
    );
  }
}
