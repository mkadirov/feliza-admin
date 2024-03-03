import { Box, Button, IconButton, Modal, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { deleteBrand, editBrand } from '../../../api/Brand';

function HandelBrand({brends, setLastAction}) {

    const [name, setName] = useState('');
    const [open, setOpen] = React.useState(false);
    const [brandId, setBrandId] = useState(0);


    const handleClose = () => setOpen(false);
   

    const deleteBrandById = async(id) => {
        const res = await deleteBrand(id);
        if(res.success) {
            setLastAction(id * 'deleted');
        } else {
            alert('Xatolik')
        }
    }

    const editBrandById = async() => {
        const brand = {name: name}

        const res = await editBrand(brandId, brand);
        if(res.success) {
            setLastAction(name + 'edited');
            setName('')
            setBrandId(0);
            setOpen(false);
        } else {
            alert('Xatolik')
        }
    }

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

  return (
    <div className="my-5">
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead className='bg-gray-300'>
              <TableRow>
                <TableCell>#</TableCell>
                <TableCell align='left'>Brand</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {brends?.map((row, idx) => (
                <TableRow
                  key={row.id}
                  sx={{ '&:last-child td': { border: 0 } }}
                >
                  <TableCell sx={{width: '10px', borderRight: '1px solid grey'}} component="th" scope="row">
                    {idx+1}
                  </TableCell>
                  <TableCell >{row.name}</TableCell>
                  <TableCell align="right">
                    <IconButton
                        onClick={() => {
                            setBrandId(row.id);
                            setName(row.name);
                            setOpen(true);
                        }}
                    >
                        <EditIcon/>
                    </IconButton>
                    <IconButton onClick={() => deleteBrandById(row.id)}>
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
                  Brand özgartirish
                </Typography>

                <div className="my-5">
                    <TextField 
                        id="outlined-basic" 
                        label="Name Uz" 
                        variant="outlined" 
                        size='small' 
                        fullWidth
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                   
                    <Button 
                        sx={{mt: 2}} 
                        variant='contained' 
                        fullWidth
                        onClick={editBrandById}
                    >
                        Edit
                    </Button>
                </div>
            </Box>
        </Modal>
    </div>
  )
}

export default HandelBrand