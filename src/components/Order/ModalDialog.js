import React, {useState} from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { cancelOrder, orderPackedUp } from '../../api/Orders';
import { useNavigate } from 'react-router-dom';

 function ModalDialog({open, setOpen, actionType, id}) {

  const navigate = useNavigate()

    const isCanceled = "Buyurtmani bekor qilmoqchimisiz?";
    const isReadyToSend = 'Buyurtma jönatishga tayyormi?';


  const handleClose = () => {
    setOpen(false);
  };

  const handleClick = () => {
    if(actionType === 1) {
        orderCanceled();
    } else {
        orderReadyToPack();
    }
    setOpen(false)
  }

  const orderReadyToPack = async() => {
    const res = await orderPackedUp(id);
    if(res?.success) {
        alert('Buyurtma jönatishga tayyor')
        navigate('/orders')
    } else {
        alert('xatolik')
    }
  }

  const orderCanceled = async() => {
    const res = await cancelOrder(id);
    if(res?.success) {
        alert('Buyurtma bekor qilindi')
        navigate('/orders')
    } else {
        alert('xatolik')
    }
  }

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {actionType == 1 ? isCanceled : isReadyToSend}
        </DialogTitle>
        <DialogActions>
          <Button size='small' color='error' variant='outlined' onClick={handleClose}>yöq</Button>
          <Button size='small' color='success' variant='outlined' onClick={handleClick} autoFocus>
            Ha
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default ModalDialog