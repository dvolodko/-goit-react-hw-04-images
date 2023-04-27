import React, { useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import { Overlay, ModalWindow } from './Modal.styled';

const modalRoot = document.querySelector('#modal-root');

export function Modal({ onClose, url }) {
  const handleKeyDown = useCallback(
    event => {
      if (event.code === 'Escape') {
        onClose();
      }
    },
    [onClose]
  );

  const handleBackdropClick = event => {
    if (event.currentTarget === event.target) {
      onClose();
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  return createPortal(
    <Overlay onClick={handleBackdropClick}>
      <ModalWindow>
        <img src={url} alt="" />
      </ModalWindow>
    </Overlay>,
    modalRoot
  );
}

Modal.propTypes = {
  url: PropTypes.string,
  onClose: PropTypes.func.isRequired,
};
