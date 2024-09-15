import { Box, Button, Grid, IconButton, Modal, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import {deleteSubRegion, editSubRegion, getParentRegionById } from '../../../api/Address/Region';
import { deletePostFilial } from '../../../api/Address/Post';


function HandlePostFilials({postFilials, setNewPostFilial}) {
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
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
      };

    const deletePostFilialById = async(id) => {
        const res = await deletePostFilial(id)
        if(res.success) {
          console.log('ishladi');
            setNewPostFilial(id + 'deleted')
        }
    }

    // const editSubRegionById = async() => {
    //     const region = {
    //         name: name,
    //         postCode: postCode,
    //         regionId: parentRegion.id
    //     }
    //     const res = await editSubRegion(regionId, region);
    //     if(res.success) {
    //         setNewSubRegion(name + postCode)
    //         setName('');
    //         setPostCode('');
    //         setRegionId(0);
    //         setParentRegion('')
    //         setOpen(false);
            
    //     }
    // }

    
  return (
    <div className="my-5">
        
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead className='bg-gray-300'>
          <TableRow>
            <TableCell>#</TableCell>
            <TableCell >Tuman</TableCell>
            <TableCell >Pochta Nomi</TableCell>
            <TableCell >Pochta filiali</TableCell>
            <TableCell >Köcha nomi(UZB)</TableCell>
            <TableCell >Köcha nomi(RUS)</TableCell>
            <TableCell >Uy raqami</TableCell>
            <TableCell >Info (UZB)</TableCell>
            <TableCell >Info (RUS)</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Array.isArray(postFilials) && postFilials.map((row, idx) => (
            <TableRow
              key={row.id}
              sx={{ '&:last-child td': { border: 0 } }}
            >
              <TableCell sx={{width: '10px', borderRight: '1px solid grey'}} component="th" scope="row">
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
                {/* <IconButton
                    onClick={() => {
                      console.log(row);
                        setOpen(true);
                        setName(row.name);
                        setPostCode(row.postCode);
                        setRegionId(row.id);
                        setParentRegion(row.region)
                    }}
                >
                    <EditIcon/>
                </IconButton> */}

                <IconButton onClick={() => deletePostFilialById(row.id)}>
                    <DeleteIcon/>
                </IconButton>
              </TableCell>
              
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>

    {/* <Modal
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
                    <div className="dropdown-box">
                       <input 
                            type="text" 
                            placeholder='Main Region'
                            value={parentRegion.name}
                            onChange={(e) => setParentRegion(e.target.value)}
                            readOnly
                        
                        />
                        <MainRegionDropDown setParentRegion = {setParentRegion} regions = {regions}/>
                    </div>
                    <TextField 
                        id="outlined-basic" 
                        label="Tuman" 
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
                        onClick={editSubRegionById}
                    >
                        Edit
                    </Button>
                </div>
            </Box>
    </Modal> */}
    </div>
  )
}

export default HandlePostFilials