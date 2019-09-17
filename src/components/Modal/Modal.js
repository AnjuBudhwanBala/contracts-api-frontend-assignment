import React from 'react';
import {
  Dialog,
  useTheme,
  useMediaQuery,
  DialogContent
} from '@material-ui/core';
import Form from '../Form/Form';

const Modal = ({ modalState, contractInfo, closeModal }) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('xs'));
  return (
    <Dialog
      fullScreen={fullScreen}
      open={modalState}
      onClose={closeModal}
      aria-labelledby="responsive-dialog-title"
    >
      <DialogContent>
        <Form contractInfo={contractInfo} closeModal={closeModal} />
      </DialogContent>
    </Dialog>
  );
};

export default Modal;
