import React from 'react'
import { Box, TextField } from '@mui/material'
import { ArrowDropDown } from '@mui/icons-material'
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useEffect } from 'react';
import { useState } from 'react';
import { getAllSaleGroups } from '../../../api/Sale';


function SaleDropDown({setLinkId}) {

    const [anchorEl, setAnchorEl] = useState(null);
    const [list, setList] = useState([]);

    const open = Boolean(anchorEl);
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = (id) => {
        setLinkId(id)
        setAnchorEl(null);
    };

    useEffect(() => {
        const fetchData = async() => {
            const res = await getAllSaleGroups();
            console.log(res.data);
            if(res.success) {
                setList(res.data)
            }
        }

        fetchData();
    }, [])

  return (
    <Box display={'flex'} justifyContent={'center'}>
        <Box display={'flex'} gap={1} justifyContent={'center'} width={'400px'}>
            <TextField variant='outlined' InputProps={{readOnly: true}} size='small' fullWidth/>
            <div>
                <Button
                  id="basic-button"
                  aria-controls={open ? 'basic-menu' : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? 'true' : undefined}
                  onClick={handleClick}
                  variant='contained'
                  sx={{height: '100%'}}
                >
                  <ArrowDropDown/>
                </Button>
                <Menu
                  id="basic-menu"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  MenuListProps={{
                    'aria-labelledby': 'basic-button',
                  }}
                >
                 {
                    list.map(item => {
                        return(
                            <MenuItem key={item.name} onClick={() => handleClose(item.id)}>{item.name}</MenuItem>
                        )
                    })
                 }
                 
                </Menu>
            </div>
        </Box>
    </Box>
  )
}

export default SaleDropDown