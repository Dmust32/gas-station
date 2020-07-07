import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button
}from '@material-ui/core';

const Alert = ({ onClose, alertText}) => {

  return (
    <Dialog
      open={alertText ? true : false}
      onClose={onClose}
    >
      <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {alertText}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => onClose({ alertText: null, onClose: () => {}})} color="primary" autoFocus>
            Ok
          </Button>
        </DialogActions>
    </Dialog>
  );
};

export default Alert;
