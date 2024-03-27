import { ArrowDropDown} from '@mui/icons-material';
import { Box, Button, Chip, Menu, MenuItem } from '@mui/material'
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { getParentCategory, getSubCategoriesByParent } from '../../../api/Category';

function CategoryDropDown({setLinkId}) {

    const [anchorEl, setAnchorEl] = useState(null);
    const [parentCategory, setParentCategory] = useState(0)
    const [parentCategoryList, setParentCategoryList] = useState([])
    const [list, setList] = useState([])
    const open = Boolean(anchorEl);
    const [categoryList, setCategoryList] = useState([])
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
      
    };

    const handleMenuItemClick = (event, categoryItem) => {
        setLinkId(categoryItem.id)
        const isExists = categoryList.some(item => item.id == categoryItem.id);
        if(parentCategory == 0) {
          setParentCategory(categoryItem.nameUZB)
        }
        if(!isExists) {
          if(categoryList.length <= 1) {
            setCategoryList([...categoryList, categoryItem])
          } else {
            categoryList.pop();
            let newList = [...categoryList];
            newList.push(categoryItem)
            setCategoryList(newList)
          }
        }
        setAnchorEl(null)
      };

      function deleteCategory(category) {
        // Check if the index is 0, and set categoryList to an empty array
        if (categoryList.findIndex(item => item.id === category.id) === 0) {
          setCategoryList([]);
          setLinkId(parentCategory)
          setParentCategory(0);
          setList(parentCategoryList);
          setLinkId('')
        } else {
          setLinkId(categoryList[0].id)
          setCategoryList(categoryList.filter(item => item.id !== category.id));
        }
      }

    useEffect(() => {
        const fetchData = async() => {
          const res = await getParentCategory();
          if(res?.success) {
            setParentCategory(0)
            setList(res.data);
            setParentCategoryList(res.data)
          }
        }
        fetchData();
      }, [])
    
      useEffect(() => {
        const fetchData = async() => {
          const res = await getSubCategoriesByParent(parentCategory);
          if(res?.success) {
            setList(res.data);
          }
        }
        if(parentCategory !== 0) {
          fetchData();
        }
      }, [parentCategory])

  return (
    <Box sx={{display: 'flex', justifyContent: 'center'}}>
        <Box display={'flex'} sx={{border: '1px solid grey',  borderRadius: '5px'}}>
            <Box sx={{width: '400px'}}>
                <div className="flex-1 h-full pl-3 flex gap-2 items-center">
                  {
                    categoryList.map(categoryItem => {
                      const key = categoryItem.nameUZB + 'chip';
                      return (
                        <Chip
                          key={key}
                          label= {categoryItem.nameUZB}
                          variant='outlined'
                          onDelete={()=> deleteCategory(categoryItem)}
                        />
                      )
                    })
                  }
                </div>
            </Box>
            <Box>
                <Button
                    id="basic-button"
                    aria-controls={open ? 'basic-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={handleClick}
                    variant='contained'
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
                                <MenuItem key={item?.nameUZB} onClick={(event) => handleMenuItemClick(event, item)}>{item?.nameUZB}</MenuItem>
                            )
                        })
                    }
                    
                </Menu>
            </Box>
        </Box>
    </Box>
  )
}

export default CategoryDropDown