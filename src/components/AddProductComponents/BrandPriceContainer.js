import { Box, Button, ButtonGroup, ClickAwayListener, Grid, Grow, MenuItem, MenuList, Paper, Popper, Typography } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { getAllBrends } from '../../api/Brand';

function BrandPriceContainer({brand, setBrand, price, setPrice, importPrice, setImportPrice, compatibleProductId, setCompatibleProductId}) {

    const [open, setOpen] = useState(false);
    const anchorRef = useRef(null);
    const [brands, setBrands] = useState([]);
    

    const handleMenuItemClick = (event, brandItem, index) => {
        setBrand(brandItem)
        setOpen(false);
    };
    
    
    
      const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };
    
    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
          return;
        }
    
        setOpen(false);
    };
    
    useEffect(() => {
        const fetchData = async() => {
          const res = await getAllBrends();
          if(res?.success) {
            setBrands(res.data)
          }
        }
        fetchData();
    }, [])

  return (
    <div className="my-4">
        <Grid container spacing={2}>
            <Grid item xs={6}>
                <p className="text-2xl">
                    Kirish narxi *
                </p>
                <div className="input-container">
                    <input 
                        type="number" 
                        className='main-input' 
                        placeholder='Narxni kriting...'
                        value={importPrice}
                        onChange={(e) => setImportPrice(e.target.value)}
                    />
                </div>
            </Grid>
            <Grid item xs={6}>
                <p className="text-2xl">
                    Sotilish narxi *
                </p>
                <div className="input-container">
                    <input 
                        type="number" 
                        className='main-input' 
                        placeholder='Narxni kriting...'
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                    />
                </div>
            </Grid>
            <Grid item xs={6}>
                <p className="text-2xl">
                    Brand
                </p>
                <div className="input-container">

                <div className="flex flex-1 pl-3">
                    <Typography>
                        {brand.name}
                    </Typography>
                </div>
                <Box>
                    <ButtonGroup variant="contained" sx={{mr:2}} ref={anchorRef} aria-label="split button">
                      <Button
                        size="small"
                        aria-controls={open ? 'split-button-menu' : undefined}
                        aria-expanded={open ? 'true' : undefined}
                        aria-label="select merge strategy"
                        aria-haspopup="menu"
                        variant='outlined'
                        onClick={handleToggle}
                      >
                        <ArrowDropDownIcon/>
                      </Button>
                    </ButtonGroup>
                    <Popper
                      sx={{
                        zIndex: 1,
                      }}
                      open={open}
                      anchorEl={anchorRef.current}
                      role={undefined}
                      transition
                      disablePortal
                    >
                      {({ TransitionProps, placement }) => (
                        <Grow
                          {...TransitionProps}
                          style={{
                            transformOrigin:
                              placement === 'bottom' ? 'center top' : 'center bottom',
                          }}
                        >
                          <Paper>
                            <ClickAwayListener onClickAway={handleClose}>
                              <MenuList id="split-button-menu" autoFocusItem>
                                {brands.map((brandItem, index) => (
                                  <MenuItem
                                    key={brandItem.name}
                                    onClick={(event) => handleMenuItemClick(event, brandItem, index)}                                   
                                  >
                                    {brandItem.name}
                                 </MenuItem>
                                ))}
                              </MenuList>
                            </ClickAwayListener>
                          </Paper>
                        </Grow>
                      )}
                    </Popper>
                  </Box>
                </div>
            </Grid>

            
        </Grid>
    </div>
  )
}

export default BrandPriceContainer