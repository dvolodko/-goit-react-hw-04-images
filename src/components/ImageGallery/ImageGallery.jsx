import React from 'react';
// import PropTypes from 'prop-types';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';

export const ImageGallery = ({ images }) => (
  <ul>
    {images.map(image => (
      <ImageGalleryItem key={image.id} image={image} />
    ))}
  </ul>
);
