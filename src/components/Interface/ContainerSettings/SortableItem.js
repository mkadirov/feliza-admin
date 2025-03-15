import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Box, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

function SortableItem({ id, index, onDelete, containerBlock }) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  
  

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
    backgroundImage: `url(${containerBlock?.category?.horizontalImage?.url})`, // 📌 Tasvir fon sifatida chiqadi
    backgroundSize: "cover", // 📌 Tasvirni butun kvadratni qoplashi uchun
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  };

  const handleDelete = (event) => {
    event.stopPropagation(); // Tugma bosilganda drag ishlamasligi uchun
    onDelete(id);
  };

  return (
    <Box ref={setNodeRef} sx={style} {...attributes}>
      {/* Drag qilish faqat kvadrat maydonida */}
      <div {...listeners} style={{ width: "100%", height: "100%", paddingLeft: "2px" }}>
        {/* {index + 1} */}
      </div>

      {/* O‘chirish tugmasi */}
      {/* <IconButton
        onClick={handleDelete}
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
        <DeleteIcon fontSize="small" />
      </IconButton> */}
    </Box>
  );
}

export default SortableItem;

