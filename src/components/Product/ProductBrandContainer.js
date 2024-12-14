import {
  Box,
  Button,
  ButtonGroup,
  ClickAwayListener,
  Grow,
  MenuItem,
  MenuList,
  Paper,
  Popper,
  TextField
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { getAllBrends } from "../../api/Brand";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";


function ProductBrandContainer({brand, setBrand}) {
  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);
  const [brands, setBrands] = useState([]);

  console.log(brand);

  const handleMenuItemClick = (event, brandItem, index) => {
    setBrand(brandItem);
    console.log(brandItem);
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
    const fetchData = async () => {
      const res = await getAllBrends();
      if (res?.success) {
        setBrands(res.data);
      }
    };
    fetchData();
  }, []);
  return (
    <Box display={"flex"} gap={2}>
        <TextField
            type="text"
            id="outlined-basic"
            variant="outlined"
            size="small"
            value={brand.name ? brand.name : ""}
            fullWidth
            helperText="Brand"
            aria-readonly
          />
      <Box>
        <ButtonGroup
          variant="contained"
          
          ref={anchorRef}
          aria-label="split button"
        >
          <Button
            
            aria-controls={open ? "split-button-menu" : undefined}
            aria-expanded={open ? "true" : undefined}
            aria-label="select merge strategy"
            aria-haspopup="menu"
            variant="outlined"
            onClick={handleToggle}
          >
            <ArrowDropDownIcon />
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
                  placement === "bottom" ? "center top" : "center bottom",
              }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList id="split-button-menu" autoFocusItem>
                    {brands.map((brandItem, index) => (
                      <MenuItem
                        key={brandItem.name}
                        onClick={(event) =>
                          handleMenuItemClick(event, brandItem, index)
                        }
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
    </Box>
  );
}

export default ProductBrandContainer;

