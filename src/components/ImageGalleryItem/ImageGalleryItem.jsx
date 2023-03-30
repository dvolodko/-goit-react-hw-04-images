import React from 'react';
// import PropTypes from 'prop-types';
import { ImageItem, Image } from './ImageGalleryItem.styled';

export const ImageGalleryItem = ({ image, imageClickHandler }) => {
  return (
    <ImageItem>
      <Image
        src={image.webformatURL}
        alt={image.tags}
        data-url={image.largeImageURL}
        onClick={imageClickHandler}
      />
    </ImageItem>
  );
};
