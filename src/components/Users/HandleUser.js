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
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { getAllUsers } from "../../api/UsersApi";
import { Delete, Edit } from "@mui/icons-material";
import UserModal from "./UserModal";

function HandleUser({ hasChanged, setHasChanged }) {
  const [list, setList] = useState([]);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [tempUser, setTempUser] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const res = await getAllUsers();
      if (res?.success) {
        console.log(res.data);
        setList(res.data);
      }
    };

    fetchData();
  }, [hasChanged]);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "900px",
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const openModal = (user) => {
    if (user.fullName == "felizaRootAdmin") {
      alert("Asosiy admin özgartirilmaydi");
    } else {
      handleOpen();
      setTempUser(user);
    }
  };
  return (
    <div className="mt-4">
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
              <TableCell sx={{ width: "20px" }}>#</TableCell>
              <TableCell align="left">Töliq ismi</TableCell>
              <TableCell align="right">Telefon raqami</TableCell>
              <TableCell align="right">Tug'ilgan sanasi</TableCell>
              <TableCell align="right">Rol</TableCell>
              <TableCell align="right">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {list?.map((row, idx) => (
              <TableRow key={row.phoneNumber}>
                <TableCell
                  sx={{ borderRight: "1px solid #f5f5f5", width: "20px" }}
                >
                  {idx + 1}
                </TableCell>
                <TableCell align="left">{row.fullName}</TableCell>
                <TableCell align="right">{row.phoneNumber}</TableCell>
                <TableCell align="right">{row.birthDate}</TableCell>
                <TableCell align="right">
                  <Tooltip
                    title={
                      <Box>
                        {row?.authorities.map((item, idx) => {
                          return (
                            <Typography key={row.phoneNumber + item.roleName}>
                              {item.roleName}
                            </Typography>
                          );
                        })}
                      </Box>
                    }
                    placement="top-start"
                  >
                    {row.authorities[0].roleName}

                    {row.authorities.length > 1 && "..."}
                  </Tooltip>
                </TableCell>
                <TableCell align="right">
                  <Box display={"flex"} justifyContent={"end"} gap={1}>
                    <Edit onClick={() => openModal(row)} />
                    <Delete />
                  </Box>
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
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Foydalanuvchini özgartirish
          </Typography>
          <UserModal
            tempUser={tempUser}
            setHasChanged={setHasChanged}
            closeModal={handleClose}
          />
        </Box>
      </Modal>
    </div>
  );
}

export default HandleUser;
