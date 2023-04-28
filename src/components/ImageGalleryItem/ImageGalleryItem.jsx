import React from 'react';
import PropTypes from 'prop-types';
import { ImageItem, Image } from './ImageGalleryItem.styled';

export const ImageGalleryItem = ({ image, imageClickHandler }) => {
  return (
    <ImageItem>
      <Image
        src={image.webformatURL}
        alt={image.tags}
        onClick={() => imageClickHandler(image.largeImageURL)}
      />
    </ImageItem>
  );
};

ImageGalleryItem.propTypes = {
  image: PropTypes.object.isRequired,
  imageClickHandler: PropTypes.func.isRequired,
};
