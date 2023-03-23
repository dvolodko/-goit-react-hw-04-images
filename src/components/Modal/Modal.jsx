import React from 'react';
import PropTypes from 'prop-types';
import { Overlay, ModalWindow } from './Modal.styled';

export const Modal = ({ largeImageURL }) => (
  <Overlay>
    <ModalWindow>
      <img src="" alt="" />
    </ModalWindow>
  </Overlay>
);
