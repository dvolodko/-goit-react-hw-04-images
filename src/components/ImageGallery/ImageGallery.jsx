import React from 'react';
// import PropTypes from 'prop-types';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { Gallery } from './ImageGallery,styled';

export const ImageGallery = ({ images }) => (
  <Gallery>
    {images.map(image => (
      <ImageGalleryItem key={image.id} image={image} />
    ))}
  </Gallery>
);
