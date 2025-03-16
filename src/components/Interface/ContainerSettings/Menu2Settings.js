import React, { useContext, useEffect, useState } from "react";
import { DndContext, closestCenter } from "@dnd-kit/core";
import { SortableContext, arrayMove, rectSortingStrategy } from "@dnd-kit/sortable";
import { Box, Button, Typography } from "@mui/material";
import SortableItem from "./SortableItem";
import { editCategoryBlockById, getAllCategoryBLocksList } from "../../../api/CategoryBlocks";
import MyContext from "../../Context/MyContext";

function Menu2Settings() {
  
  const [boxes, setBoxes] = useState([]);
  const { setIsLoading } = useContext(MyContext);
  const [isListChanged, setIsListChanged] = useState(0)

  useEffect(() => {
    const fetchData = async () => {
      const tempBoxes = []
      const res = await getAllCategoryBLocksList();
      if(res?.success) {
        const blocks = res.data.filter((block) => block.categoryBlockType == "MENU_2")
        console.log(blocks);
        
        blocks.map((b, index) => {
          tempBoxes.push({ id: index + 100, containerBlock: b})
        })
        setBoxes(tempBoxes)
      }
    }

    fetchData()
  }, [isListChanged])
  

  const handleAddBox = () => {
    const newBox = { id: `${boxes.length + 1}`, color: "green" };
    setBoxes((prevBoxes) => [...prevBoxes, newBox]);
  };

  const handleDeleteBox = (id) => {
    console.log("Deleting box with id:", id);
    setBoxes((prevBoxes) => prevBoxes.filter((box) => box.id != id)); 
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    setBoxes((items) => {
      const oldIndex = items.findIndex((item) => item.id === active.id);
      const newIndex = items.findIndex((item) => item.id === over.id);
      return arrayMove(items, oldIndex, newIndex);
    });
  };

  const editBlockPlacment = () => {
    

    const newBloks = boxes.map((item) => item.containerBlock)
    

    newBloks.map((blockItem, index) => {
       

      const data = {
        "categoryBlockType" : "MENU_2",
        "placementNumber" : index + 1,
        "categoryId" : blockItem?.category?.id
      }

      console.log(data);
      

      const fetchData = async () => {
        const res = await editCategoryBlockById(blockItem.id, data)
        if(res?.success) {
          console.log("Block örni özgardi");
          if(index == newBloks.length-1) {
            
            alert("Özgarish yakunlandi")
          }
        } else {
          console.log("Xatolik");
        }
      }
      fetchData()

      
    });

  }

  return (
    <div className="flex flex-col items-center gap-4 p-4">
      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={boxes.map((box) => box.id)} strategy={rectSortingStrategy} >
          <div className="flex gap-2 border p-4 rounded-lg bg-gray-100">
            {boxes.map((box, index) => (
              <Box key={`MENU_1_${box.id}`}>
                <SortableItem
                // key={box.id }
                id={box.id}
                containerBlock={box.containerBlock}
                index={index}
                onDelete={handleDeleteBox}
                menuType={false}
                setIsListChanged={setIsListChanged}
              />
              
              </Box>
            ))}
            {/* <div className="w-16 h-16 flex items-center justify-center border border-dashed bg-white rounded-lg">
              <Button onClick={handleAddBox} variant="outlined">
                Add
              </Button>
            </div> */}
          </div>
        </SortableContext>
      </DndContext>

      <Button variant="contained" onClick={() => {
        editBlockPlacment()
        
      }}>
        Özgartirish
      </Button>
    </div>
  );
}

export default Menu2Settings;
