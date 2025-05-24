import React, { useEffect, useRef, useState } from "react";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Grow from "@mui/material/Grow";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import { Box, Chip } from "@mui/material";
import {
  getParentCategory,
  getSubCategoriesByParent,
} from "../../api/Category";

function ProductCategoryBox({
  categoryList,
  setCategoryList,
  refreshCategory,
  parentCategory,
  setParentCategory,
  id,
}) {
  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);
  const [selectedIndex, setSelectedIndex] = useState(1);
  
  const [list, setList] = useState([]);
  const [parentCategoryList, setParentCategoryList] = useState([]);

  console.log(categoryList?.length);
  console.log(categoryList[0]?.nameUZB);

  const handleMenuItemClick = (event, categoryItem, index) => {
    setSelectedIndex(index);
    const isExists = categoryList.some((item) => item.id == categoryItem.id);
    if (parentCategory == 0) {
      setParentCategory(categoryItem.nameUZB);
    }
    if (!isExists) {
      setCategoryList([...categoryList, categoryItem]);
    }
    setOpen(false);
  };

  function deleteCategory(category) {
    // Check if the index is 0, and set categoryList to an empty array
    if (categoryList.findIndex((item) => item.id === category.id) === 0) {
      setCategoryList([]);
      setParentCategory(0);
      //   setList(parentCategoryList);
      getSubCatigories();
    } else {
      // Filter out the specified category
      setCategoryList(categoryList.filter((item) => item.id !== category.id));
    }
  }

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  const getSubCatigories = async () => {
    const res = await getParentCategory();
    if (res?.success) {
      setParentCategory(0);
      setList(res.data);
      setParentCategoryList(res.data);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
        console.log(parentCategory);
      const res = await getSubCategoriesByParent(parentCategory);
      if (res?.success) {
        setList(res.data);
      }
    };
    if (parentCategory !== 0) {
      fetchData();
    }
  }, [parentCategory, categoryList]);

  
  return (
    <div className="my-3">
      <p className="text-2xl mb-1">Kategoriyalar *</p>
      <div className="input-container">
        <div className="flex-1 h-full pl-3 flex gap-2 items-center">
          {categoryList.map((categoryItem) => {
            const key = categoryItem.nameUZB + "chip";
            return (
              <Chip
                key={key}
                label={categoryItem.nameUZB}
                variant="outlined"
                onDelete={() => deleteCategory(categoryItem)}
              />
            );
          })}
        </div>
        <Box>
          <ButtonGroup
            variant="contained"
            sx={{ mr: 2 }}
            ref={anchorRef}
            aria-label="split button"
          >
            <Button
              size="small"
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
                      {list.map((categoryItem, index) => (
                        <MenuItem
                          key={categoryItem.id}
                          onClick={(event) =>
                            handleMenuItemClick(event, categoryItem, index)
                          }
                          disabled={categoryList.some(
                            (item) => item.id == categoryItem.id
                          )}
                        >
                          {categoryItem.nameUZB}
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
    </div>
  );
}

export default ProductCategoryBox;