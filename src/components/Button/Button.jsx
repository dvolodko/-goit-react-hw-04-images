import React from 'react';
// import PropTypes from 'prop-types';
import { LoadMoreButton } from './Button.styled';

export const Button = ({ loadMore }) => (
  <LoadMoreButton type="submit" onClick={loadMore}>
    Load more
  </LoadMoreButton>
);
