import React, { useEffect, useState } from "react";
import { getAllSms } from "../../../api/SMS";
import { Box, Modal, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { Edit } from "@mui/icons-material";
import ModalPage from "./ModalPage";

function HandleSms({setHasChanged, hasChanged}) {
  const [list, setList] = useState([]);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [tempSmsName, setTempSmsName] = useState('');
  const [tempText, setTemptext] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const res = await getAllSms();
      if (res.success) {
        console.log(res.data);
        setList(res.data);
      }
    };
    fetchData();
  }, [hasChanged]);

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  const openModal = (smsName, text) => {
    handleOpen();
    setTempSmsName(smsName);
    setTemptext(text)
  }
  return (
    <div className="mt-5">
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow sx={{backgroundColor: '#f5f5f5'}}>
              <TableCell>#</TableCell>
              <TableCell align="start">SMS Turi</TableCell>
              <TableCell align="start">SMS matni</TableCell>
              <TableCell align="right">Özgartirish</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {list.map((row, idx) => (
              <TableRow key={row.smsName}>
                <TableCell align="start">{idx + 1}</TableCell>
                <TableCell align="start">{row.smsName}</TableCell>
                <TableCell align="start">{row.text}</TableCell>
                <TableCell align="right">
                  <Edit onClick = {() => openModal(row.smsName, row.text)}/>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <ModalPage tempText={tempText} tempSmsName={tempSmsName} handleClose = {handleClose} setHasChanged={setHasChanged}/>
        </Box>
      </Modal>
    </div>
  );
}

export default HandleSms;
