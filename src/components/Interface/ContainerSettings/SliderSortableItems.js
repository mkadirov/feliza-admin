import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Box, IconButton, Modal, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { Edit } from "@mui/icons-material";
import { useState } from "react";
import ModalBox from "./ModalBox";
import SliderModalBox from "./SliderModalBox";

function SliderSortableItems({ id, containerBlock, setIsListChanged }) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    width: "200px",
    height: "200px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    fontSize: "24px",
    fontWeight: "bold",
    color: "white",
    borderRadius: "8px",
    cursor: "grab",
    backgroundImage: `url(${containerBlock?.category?.horizontalImage?.url})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    overflow: "hidden",
  };

  const  openModal = (event) => {
    event.stopPropagation(); // Tugma bosilganda drag ishlamasligi uchun
    handleOpen();
  };

  const styleModal = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 800,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  

  return (
    <Box ref={setNodeRef} sx={style} {...attributes}>
      {/* Drag qilish faqat kvadrat maydonida */}
      <div
        {...listeners}
        style={{ width: "100%", height: "100%", paddingLeft: "2px" }}
      >
        {/* {index + 1} */}
      </div>

      {/* O‘chirish tugmasi */}
      <IconButton
        onClick={openModal}
        size="small"
        sx={{
          position: "absolute",
          top: "4px",
          right: "4px",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          color: "white",
          "&:hover": { backgroundColor: "rgba(0, 0, 0, 0.7)" },
          cursor: "pointer",
        }}
      >
        <Edit fontSize="small" />
      </IconButton>

      <Box
        sx={{
          position: "absolute",
          bottom: 0,
          width: "100%",
          height: "40px",
          backgroundColor: "white",
          opacity: 0.7,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography color={"black"}>
          {containerBlock?.category?.nameUZB}
        </Typography>
      </Box>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={styleModal}>
            <SliderModalBox containerBlock={containerBlock}  handleClose={handleClose} setIsListChanged={setIsListChanged}/>
        </Box>
      </Modal>
    </Box>
  );
}

export default SliderSortableItems;
