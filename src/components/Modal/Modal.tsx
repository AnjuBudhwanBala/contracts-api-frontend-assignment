import React from 'react';
import {
  Dialog,
  useTheme,
  useMediaQuery,
  DialogContent
} from '@material-ui/core';

interface Props {
  modalState: boolean;
  closeModal: () => void;
  children: React.ReactNode;
}
const Modal: React.FC<Props> = ({ modalState, closeModal, children }) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('xs'));
  return (
    <Dialog
      fullScreen={fullScreen}
      open={modalState}
      onClose={closeModal}
      aria-labelledby="responsive-dialog-title"
    >
      <DialogContent>{children}</DialogContent>
    </Dialog>
  );
};

export default Modal;
