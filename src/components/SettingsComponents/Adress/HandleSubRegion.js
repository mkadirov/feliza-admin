import { Box, Button, Divider, Grid, IconButton, Modal, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import {deleteSubRegion, editSubRegion, getParentRegionById } from '../../../api/Address/Region';
import MainRegionDropDown from './MainRegionDropDown';

function HandleSubRegion({setNewSubRegion, parentRegion, setParentRegion, subRegions, regions}) {
    const [open, setOpen] = React.useState(false);
    const handleClose = () => setOpen(false);
    const [nameUZB, setNameUZB] = useState('');
    const [nameRUS, setNameRUS] = useState('');
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

    const deleteSubRegionById = async(id) => {
        const res = await deleteSubRegion(id);
        if(res.success) {
          console.log('ishladi');
            setNewSubRegion(id)
        }
    }

    const editSubRegionById = async() => {
        const region = {
            nameUZB: nameUZB,
            nameRUS: nameRUS,
            postCode: postCode,
            regionId: parentRegion.id
        }
        const res = await editSubRegion(regionId, region);
        if(res.success) {
            setNewSubRegion(nameUZB + postCode)
            setNameUZB('');
            setNameRUS('')
            setPostCode('');
            setRegionId(0);
            setParentRegion('')
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
            <TableCell >Tuman (UZB)</TableCell>
            <TableCell >Tuman (RUS)</TableCell>
            <TableCell >Postkod</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Array.isArray(subRegions) && subRegions.map((row, idx) => (
            <TableRow
              key={row.id}
              sx={{ '&:last-child td': { border: 0 } }}
            >
              <TableCell sx={{width: '10px', borderRight: '1px solid grey'}} component="th" scope="row">
                {idx + 1}
              </TableCell>
              <TableCell>{row.region.nameUZB}</TableCell>
              <TableCell>{row.nameUZB}</TableCell>
              <TableCell>{row.nameRUS}</TableCell>
              <TableCell>{row.postCode}</TableCell>
              <TableCell align="right">
                <IconButton
                    onClick={() => {
                      console.log(row);
                        setOpen(true);
                        setNameUZB(row.nameUZB);
                        setNameRUS(row.nameRUS)
                        setPostCode(row.postCode);
                        setRegionId(row.id);
                        setParentRegion(row.region)
                    }}
                >
                    <EditIcon/>
                </IconButton>

                <IconButton onClick={() => deleteSubRegionById(row.id)}>
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
                    <div className="dropdown-box">
                       <input 
                            type="text" 
                            placeholder='Main Region'
                            value={parentRegion.nameUZB}
                            onChange={(e) => setParentRegion(e.target.value)}
                            readOnly
                        
                        />
                        <MainRegionDropDown setParentRegion = {setParentRegion} regions = {regions}/>
                    </div>
 
                    <Divider sx={{marginTop: 1, marginBottom: 2}}/>
                    <TextField 
                        id="outlined-basic" 
                        label="Tuman (UZB)" 
                        variant="outlined" 
                        size='small' 
                        fullWidth
                        value={nameUZB}
                        onChange={(e) => setNameUZB(e.target.value)}
                    />
                    <TextField 
                    sx={{marginTop: 2}}
                        id="outlined-basic" 
                        label="Tuman (RUS)" 
                        variant="outlined" 
                        size='small' 
                        fullWidth
                        value={nameRUS}
                        onChange={(e) => setNameRUS(e.target.value)}
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
        </Modal>
    </div>
  )
}

export default HandleSubRegion