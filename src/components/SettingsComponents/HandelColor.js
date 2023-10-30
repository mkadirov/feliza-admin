import { Box, Button, IconButton, Modal, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { editColor } from '../../api/Color';
import LongColorIcon from '../Global/LongColorIcon';

function HandelColor({colors, deleteColorById, setLastAction}) {

  const [open, setOpen] = React.useState(false);
  const handleClose = () => setOpen(false);
  const [nameUz, setNameUz] = useState('');
  const [nameRu, setNameRu] = useState('');
  const [colorCode, setColorCode] = useState('');
  const [colorId, setColorId] = useState('');

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

  const editColorById = async() => {
    const color = {
        nameUZB: nameUz,
        nameRUS: nameRu,
        colorCode: colorCode
    }
    
    const res = await editColor(colorId, color);
    if(res.success) {
        setLastAction(colorId + 'edited')
        setColorId(0)
        setNameRu('')
        setNameUz('')
        setColorCode('')
        setOpen(false);
    }
  } 

  return (
    <div className="my-5">
        <p className="text-2xl text-center">
            Mavjud Ranglar
        </p>
            
        <TableContainer component={Paper} sx={{mt: 4}}>
          <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
            <TableHead className='bg-gray-300'>
              <TableRow>
              <TableCell>#</TableCell>
                <TableCell>Name UZB</TableCell>
                <TableCell >Name RUS</TableCell>
                <TableCell align="start">Icon</TableCell>
                <TableCell align="right">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {colors.map((color, idx) => (
                <TableRow
                  key={color.id}
                  sx={{ '&:last-child td': { border: 0 } }}
                >
                  <TableCell sx={{width: '10px', borderRight: '1px solid grey'}} component="th" scope="row">
                    {idx + 1}
                  </TableCell>
                  <TableCell>{color.nameUZB}</TableCell>
                  <TableCell >{color.nameRUS}</TableCell>
                  <TableCell align="right">
                    <LongColorIcon color= {color.colorCode}/>
                  </TableCell>
                  <TableCell align="right">
                        <IconButton onClick={() => {
                            setOpen(true)
                            setNameUz(color.nameUZB)
                            setNameRu(color.nameRUS)
                            setColorCode(color.colorCode)
                            setColorId(color.id)
                        }}>
                            <EditIcon/>
                        </IconButton>
                        <IconButton onClick={()=> deleteColorById(color.id)}>
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
                  Rangi özgartirish
                </Typography>

                <div className="my-5">
                    <TextField 
                        id="outlined-basic" 
                        label="Name Uz" 
                        variant="outlined" 
                        size='small' 
                        fullWidth
                        value={nameUz}
                        onChange={(e) => setNameUz(e.target.value)}
                    />
                    <TextField 
                        sx={{my: 2}} 
                        id="outlined-basic" 
                        label="Name Ru" 
                        variant="outlined" 
                        fullWidth 
                        size='small' 
                        value={nameRu}
                        onChange={(e) => setNameRu(e.target.value)}
                    />
                    <TextField 
                        id="outlined-basic" 
                        label="Rang kodi"
                        variant="outlined" 
                        size='small' 
                        fullWidth
                        value={colorCode}
                        onChange={(e) => setColorCode(e.target.value)}
                    />
                    <Button 
                        sx={{mt: 2}} 
                        variant='contained' 
                        fullWidth
                        onClick={editColorById}
                    >
                        Edit
                    </Button>
                </div>
            </Box>
        </Modal>
    </div>
  )
}

export default HandelColor