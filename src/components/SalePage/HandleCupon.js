import {
  Box,
  Modal,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { getAllCupons } from "../../api/Cupon";
import { Edit } from "@mui/icons-material";
import CuponModal from "./CuponModal";

function HandleCupon({ setListChanged, listChanged }) {
  const [list, setList] = useState([]);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [tempName, setTempName] = useState("");
  const [tempSumma, setTempSumma] = useState("");
  const [tempCuponType, setTempCuponType] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const res = await getAllCupons();

      if (res?.success) {
        setList(res.data);
        console.log(res.data);
      }
    };

    fetchData();
  }, [listChanged]);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const openModal = (name, summa, type) => {
    handleOpen();
    setTempCuponType(type);
    setTempName(name);
    setTempSumma(summa);
  };

  return (
    <div className="mt-3">
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
              <TableCell>#</TableCell>
              <TableCell align="start">Kupon turi</TableCell>
              <TableCell align="start">Kupon nomi</TableCell>
              <TableCell align="right">Summa</TableCell>
              <TableCell align="right">Özgartirish</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {list.map((row, idx) => (
              <TableRow key={row.smsName}>
                <TableCell align="start">{idx + 1}</TableCell>
                <TableCell align="start">{row.enumName}</TableCell>
                <TableCell align="start">{row.name}</TableCell>
                <TableCell align="right">{row.credit}</TableCell>
                <TableCell align="right">
                  <Edit
                    onClick={() =>
                      openModal(row.name, row.credit, row.enumName)
                    }
                  />
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
          <CuponModal
            tempName={tempName}
            tempCuponType={tempCuponType}
            tempSumma={tempSumma}
            setListChanged={setListChanged}
            handleClose={handleClose}
          />
        </Box>
      </Modal>
    </div>
  );
}

export default HandleCupon;
