import { Box, Button } from "@mui/material";
import React, { useState } from "react";
import CategoryBox from "../../AddProductComponents/CategoryBox";
import { editCategoryBlockById } from "../../../api/CategoryBlocks";

const ModalBox = ({ containerBlock, menuType, handleClose, setIsListChanged }) => {
  const [categoryList, setCategoryList] = useState([]);
  const [refreshCategory, setRefreshCategory] = useState(0);
  const [tempCategory, setTempCategory] = useState(containerBlock?.category);
  const [isCategoryChanged, setIsCategoryChanged] = useState(false)

  const style = {
    width: "200px",
    height: menuType ? "200px" : "300px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    borderRadius: "8px",
    backgroundImage: `url(${
      Boolean(menuType)
        ? tempCategory?.horizontalImage?.url
        : tempCategory?.verticalImage?.url
    })`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    overflow: "hidden",
    
  };

  console.log(containerBlock);
  

  const selectCategory = () => {
    setTempCategory(categoryList[categoryList.length - 1]);
    setIsCategoryChanged(true)
  };

  const editBlockCategory = async() => {
    const data = {
        "categoryBlockType" : containerBlock.categoryBlockType,
        "placementNumber" : containerBlock.placementNumber,
        "categoryId" : tempCategory.id
    }
    const res = await editCategoryBlockById(containerBlock?.id, data)
    if(res?.success) {
        handleClose()
        setIsListChanged(prev => prev + 1)
        console.log("Success");
        
    } else {
        alert("Xatolik!!!")
    }
  }

  return (
    <Box>
      <CategoryBox
        categoryList={categoryList}
        setCategoryList={setCategoryList}
        refreshCategory={refreshCategory}
        isShortList={true}
      />
      <Box sx={{ display: "flex", justifyContent: "end" }}>
        <Button variant="contained" size="small" onClick={selectCategory} disabled={categoryList.length == 0}>
          Kategoriyani tanlash
        </Button>
      </Box>
      {/* image box */}
     <Box display={'flex'} justifyContent={'center'}>
       <Box marginTop={2} sx={style}></Box>
     </Box>
     <Box display={'flex'} justifyContent={'end'} marginTop={2}>
        <Button variant="contained" size="small" sx={{paddingX: 3}} disabled={!isCategoryChanged} onClick={editBlockCategory}>
            Saqlash
        </Button>
     </Box>
    </Box>
  );
};

export default ModalBox;
