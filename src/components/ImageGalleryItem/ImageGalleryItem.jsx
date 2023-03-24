import React from 'react';
// import PropTypes from 'prop-types';

export const ImageGalleryItem = ({ image }) => {
  return (
    <li>
      <img src={image.webformatURL} alt={image.tags} />
    </li>
  );
};
