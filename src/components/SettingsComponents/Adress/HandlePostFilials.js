import {
  Box,
  Button,
  Grid,
  IconButton,
  Modal,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import { deletePostFilial, editPostFilial } from "../../../api/Address/Post";

function HandlePostFilials({ postFilials, setNewPostFilial }) {
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const [postFilialID, setPostFilialID] = useState('')
  const [postName, setPostName] = useState("");
  const [postFilialName, setPostFilialName] = useState("");
  const [streetUZB, setStreetUZB] = useState("");
  const [streetRUS, setStreetRUS] = useState("");
  const [houseNumber, setHouseNumber] = useState("");
  const [descriptionUZB, setDescriptionUZB] = useState();
  const [descriptionRUS, setDescriptionRUS] = useState();
  const [regionId, setRegionId] = useState('')
  const [subRegionId, setSubRegionId] = useState('')
  

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 800,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const deletePostFilialById = async (id) => {
    const res = await deletePostFilial(id);
    if (res.success) {
      setNewPostFilial(prev => prev + 1);
    }
  };

  const editPostFilialById = async () => {
    const postFilial = {
    postName : postName,
    postFilialName : postFilialName,
    descriptionUZB : descriptionUZB,
    descriptionRUS : descriptionRUS,
    streetUZB : streetUZB,
    streetRUS : streetRUS,
    houseNumber : houseNumber,
    regionId: regionId,
    subRegionId: subRegionId
    
    };
    const res = await editPostFilial(postFilialID, postFilial);
    if (res.success) {
      setNewPostFilial(prev => prev + 1);
      setPostFilialID('')
      setRegionId('')
      setSubRegionId('')
      setPostName('');
      setPostFilialName('');
      setStreetUZB('');
      setStreetRUS('');
      setHouseNumber('');
      setDescriptionUZB('');
      setDescriptionRUS('');
      setOpen(false);
    }
  };

  return (
    <div className="my-5">
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead className="bg-gray-300">
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>Tuman</TableCell>
              <TableCell>Pochta Nomi</TableCell>
              <TableCell>Pochta filiali</TableCell>
              <TableCell>Köcha nomi(UZB)</TableCell>
              <TableCell>Köcha nomi(RUS)</TableCell>
              <TableCell>Uy raqami</TableCell>
              <TableCell>Info (UZB)</TableCell>
              <TableCell>Info (RUS)</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Array.isArray(postFilials) &&
              postFilials.map((row, idx) => (
                <TableRow
                  key={row.id}
                  sx={{ "&:last-child td": { border: 0 } }}
                >
                  <TableCell
                    sx={{ width: "10px", borderRight: "1px solid grey" }}
                    component="th"
                    scope="row"
                  >
                    {idx + 1}
                  </TableCell>
                  <TableCell>{row.subRegion?.nameUZB}</TableCell>
                  <TableCell>{row.postName}</TableCell>
                  <TableCell>{row.postFilialName}</TableCell>
                  <TableCell>{row.streetUZB}</TableCell>
                  <TableCell>{row.streetRUS}</TableCell>
                  <TableCell>{row.houseNumber}</TableCell>
                  <TableCell>{row.descriptionUZB}</TableCell>
                  <TableCell>{row.descriptionRUS}</TableCell>
                  <TableCell align="right">
                    <Box display={"flex"}>
                      <IconButton
                        onClick={() => {
                          setOpen(true);
                          setRegionId(row?.region?.id)
                          setSubRegionId(row?.subRegion?.id)
                          setPostFilialID(row.id)
                          setPostName(row.postName);
                          setPostFilialName(row.postFilialName);
                          setStreetUZB(row.streetUZB);
                          setStreetRUS(row.streetRUS);
                          setHouseNumber(row.houseNumber);
                          setDescriptionUZB(row.descriptionUZB);
                          setDescriptionRUS(row.descriptionRUS);
                        }}
                      >
                        <EditIcon />
                      </IconButton>

                      <IconButton onClick={() => deletePostFilialById(row.id)}>
                        <DeleteIcon />
                      </IconButton>
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
            Pochta manzilini o'zgartirish
          </Typography>

          <div className="my-5">
            {/* <div className="dropdown-box">
                       <input 
                            type="text" 
                            placeholder='Main Region'
                            value={parentRegion.name}
                            onChange={(e) => setParentRegion(e.target.value)}
                            readOnly
                        
                        />
                        <MainRegionDropDown setParentRegion = {setParentRegion} regions = {regions}/>
                    </div> */}
            <TextField
              id="outlined-basic"
              label="Pochta nomi"
              variant="outlined"
              size="small"
              fullWidth
              value={postName}
              onChange={(e) => setPostName(e.target.value)}
            />
            <TextField
              sx={{ my: 2 }}
              id="outlined-basic"
              label="Pochta filiali"
              variant="outlined"
              fullWidth
              size="small"
              value={postFilialName}
              onChange={(e) => setPostFilialName(e.target.value)}
            />
            <TextField
              sx={{ my: 2 }}
              id="outlined-basic"
              label="Ko'cha nomi(UZB)"
              variant="outlined"
              fullWidth
              size="small"
              value={streetUZB}
              onChange={(e) => setStreetUZB(e.target.value)}
            />
            <TextField
              sx={{ my: 2 }}
              id="outlined-basic"
              label="Ko'cha nomi(RUS)"
              variant="outlined"
              fullWidth
              size="small"
              value={streetRUS}
              onChange={(e) => setStreetRUS(e.target.value)}
            />
            <TextField
              sx={{ my: 2 }}
              id="outlined-basic"
              label="Uy raqami"
              variant="outlined"
              fullWidth
              size="small"
              value={houseNumber}
              onChange={(e) => setHouseNumber(e.target.value)}
            />
            <TextField
              sx={{ my: 2 }}
              id="outlined-basic"
              label="Info (UZB)"
              variant="outlined"
              fullWidth
              size="small"
              value={descriptionUZB}
              onChange={(e) => setDescriptionUZB(e.target.value)}
            />
            <TextField
              sx={{ my: 2 }}
              id="outlined-basic"
              label="Info (RUS)"
              variant="outlined"
              fullWidth
              size="small"
              value={descriptionRUS}
              onChange={(e) => setDescriptionRUS(e.target.value)}
            />
            <Button
              sx={{ mt: 2 }}
              variant="contained"
              fullWidth
              onClick={editPostFilialById}
            >
              Edit
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}

export default HandlePostFilials;
