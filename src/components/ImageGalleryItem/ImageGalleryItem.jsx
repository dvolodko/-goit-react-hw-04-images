import React from 'react';
// import PropTypes from 'prop-types';
import { ImageItem, Image } from './ImageGalleryItem.styled';

export const ImageGalleryItem = ({ image }) => {
  return (
    <ImageItem>
      <Image src={image.webformatURL} alt={image.tags} />
    </ImageItem>
  );
};
