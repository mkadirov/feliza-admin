import { Box, Button, Grid, IconButton, Modal, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { deleteRegion, editRegion } from '../../../api/Address/Region';

function HandelRegion({regions, setNewRegion}) {
    const [open, setOpen] = React.useState(false);
    const handleClose = () => setOpen(false);
    const [name, setName] = useState('');
    const [postCode, setPostCode] = useState('');
    const [regionId, setRegionId] = useState(0)

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 200,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
      };

    const deleteRegionById = async(id) => {
        const res = await deleteRegion(id);
        setNewRegion(id)
    }

    const editRegionById = async() => {
        const region = {
            name: name,
            postCode: postCode
        }
        const res = await editRegion(regionId, region);
        if(res.success) {
            setNewRegion(name + postCode)
            setName('');
            setPostCode('');
            setRegionId(0);
            setOpen(false);
        }
    }
    
  return (
    <div className="my-5">
        
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead className='bg-gray-300'>
          <TableRow>
            <TableCell>#</TableCell>
            <TableCell >Viloyat</TableCell>
            <TableCell >Postkod</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Array.isArray(regions) && regions.map((row, idx) => (
            <TableRow
              key={row.id}
              sx={{ '&:last-child td': { border: 0 } }}
            >
              <TableCell sx={{width: '10px', borderRight: '1px solid grey'}} component="th" scope="row">
                {idx + 1}
              </TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.postCode}</TableCell>
              <TableCell align="right">
                <IconButton
                    onClick={() => {
                        setOpen(true);
                        setName(row.name);
                        setPostCode(row.postCode);
                        setRegionId(row.id);
                    }}
                >
                    <EditIcon/>
                </IconButton>

                <IconButton onClick={() => deleteRegionById(row.id)}>
                    <DeleteIcon/>
                </IconButton>
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
                  Region özgartirish
                </Typography>

                <div className="my-5">
                    <TextField 
                        id="outlined-basic" 
                        label="Viloyat" 
                        variant="outlined" 
                        size='small' 
                        fullWidth
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <TextField 
                        sx={{my: 2}} 
                        id="outlined-basic" 
                        label="Postkod" 
                        variant="outlined" 
                        fullWidth 
                        size='small' 
                        value={postCode}
                        onChange={(e) => setPostCode(e.target.value)}
                    />
                    <Button 
                        sx={{mt: 2}} 
                        variant='contained' 
                        fullWidth
                        onClick={editRegionById}
                    >
                        Edit
                    </Button>
                </div>
            </Box>
        </Modal>
    </div>
  )
}


export default HandelRegion