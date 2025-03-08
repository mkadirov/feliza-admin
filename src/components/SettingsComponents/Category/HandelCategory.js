import {
  Box,
  Button,
  Divider,
  Grid,
  IconButton,
  Modal,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { deleteCategory, editCategory } from "../../../api/Category";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Delete } from "@mui/icons-material";

function HandelCategory({ categories, setNewCategory }) {
  const [open, setOpen] = React.useState(false);

  const [nameUz, setNameUz] = useState("");
  const [nameRu, setNameRu] = useState("");
  const [categoryId, setCategoryId] = useState(0);
  const [parentCategory, setParentCategory] = useState("");
  const [image, setImage] = useState(null);
  const [verticalImage, setVerticalImage] = useState(null);
  const [showImageBox, setShowImageBox] = useState(false);
  const [showVerticalImageBox, setShowVerticalImageBox] = useState(false);
  // const [images, setImages] = useState([]);
  // const [verticakImages, setVerticalImages] = useState([]);

  const handleClose = () => {
    setOpen(false);
    setImage(null);
    setVerticalImage(null);
    setShowVerticalImageBox(false);
    setShowImageBox(false);
  };

  const handleImageChange = (event) => {
    const files = event.target.files;
    setImage(files[0]);
    // setImages(files);
    setShowImageBox(true);
  };

  const handleVerticalImageChange = (event) => {
    const files = event.target.files;
    setVerticalImage(files[0]);
    console.log(files[0]);

    // setVerticalImages(files);
    setShowVerticalImageBox(true);
  };

  const deleteSlideImage = () => {
    setShowImageBox(false);
    setImage(null);
    // setImages([]);
  };

  const deleteVerticalSlideImage = () => {
    setShowVerticalImageBox(false);
    setVerticalImage(null);
    // setVerticalImages([]);
  };

  const style = {
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

  const deleteCategoryById = async (id) => {
    const res = await deleteCategory(id);
    setNewCategory(id);
  };

  const editCategoryById = async () => {
    const parentCategoryTemp = {
      nameUZB: nameUz,
      nameRUS: nameRu,
    };

    const childCategory = {
      parentCategoryUZ: parentCategory.nameUZB,
      parentCategoryRU: parentCategory.nameRUS,
      nameUZB: nameUz,
      nameRUS: nameRu,
    };

    const category =
      parentCategory?.nameUZB == "" ? parentCategoryTemp : childCategory;

    const res = await editCategory(categoryId, category, image, verticalImage);
    if (res.success) {
      setNewCategory(nameUz + nameRu);
      setNameRu("");
      setNameUz("");
      setCategoryId(0);
      setOpen(false);
    }
  };

  return (
    <div className="my-5">
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead className="bg-gray-300">
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>Main Category</TableCell>
              <TableCell>Name UZB</TableCell>
              <TableCell>Name RUS</TableCell>
              <TableCell>ID</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Array.isArray(categories) &&
              categories.map((row, idx) => (
                <TableRow
                  key={row.id}
                  sx={{ "&:last-child td": { border: 0 } }}
                >
                  <TableCell
                    sx={{ width: "10px", borderRight: "1px solid grey" }}
                    component="th"
                    scope="row"
                  >
                    {idx + 1}
                  </TableCell>
                  <TableCell>{row.parentCategoryUZ}</TableCell>
                  <TableCell>{row.nameUZB}</TableCell>
                  <TableCell>{row.nameRUS}</TableCell>
                  <TableCell>{row.id}</TableCell>
                  <TableCell align="right">
                    <Tooltip title="Özgartirish">
                      <IconButton
                        onClick={() => {
                          console.log(row);
                          setImage(row?.horizontalImage?.url);
                          setVerticalImage(row?.verticalImage?.url);
                          row?.horizontalImage !== null
                            ? setShowImageBox(true)
                            : setShowImageBox(false);
                          row?.verticalImage !== null
                            ? setShowVerticalImageBox(true)
                            : setShowVerticalImageBox(false);
                          setOpen(true);
                          setNameUz(row.nameUZB);
                          setNameRu(row.nameRUS);
                          setCategoryId(row.id);
                          setParentCategory({
                            nameUZB: row?.parentCategoryUZ,
                            nameRUS: row?.parentCategoryRU,
                          });
                        }}
                      >
                        <EditIcon />
                      </IconButton>
                    </Tooltip>

                    <Tooltip title="Öchirish">
                      <IconButton onClick={() => deleteCategoryById(row.id)}>
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
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
          <Typography
            textAlign={"center"}
            id="modal-modal-title"
            variant="h6"
            component="h2"
          >
            Kategoriya özgartirish
          </Typography>

          <Divider sx={{ marginY: 1 }} />

          <Typography fontSize={18} fontWeight={"bold"} textAlign={"center"}>
            {parentCategory.nameUZB}
          </Typography>

          <Box display={"flex"} gap={2} justifyContent={"center"}>
            <div className="w-3/6 relative">
              <div
                className={` ${
                  showImageBox ? "hidden" : "block"
                } flex justify-center items-center border border-gray-300 rounded-md`}
                style={{ height: "280px" }}
              >
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  placeholder="Data"
                  id={`image-main-${categoryId}`}
                  hidden
                  onChange={(e) => handleImageChange(e)}
                />

                <div>
                  <Button
                    variant="outlined"
                    onClick={() =>
                      document
                        .getElementById(`image-main-${categoryId}`)
                        .click()
                    }
                  >
                    Rasm yuklash
                  </Button>
                </div>
              </div>

              <div
                className={showImageBox ? "block" : "hidden"}
                style={{ height: "280px" }}
              >
                {image ? (
                  // agar kategoriyada rasm url bo'lsa uklangan file URL ga aylantirilmaydi
                  <img
                    src={
                      image instanceof File ? URL.createObjectURL(image) : image
                    }
                    alt="Image preview"
                    onLoad={(e) => URL.revokeObjectURL(e.target.src)} // Memory leak oldini olish
                  />
                ) : (
                  <Box></Box>
                )}
              </div>
              {showImageBox && (
                <IconButton
                  onClick={deleteSlideImage}
                  sx={{
                    position: "absolute",
                    top: 5,
                    right: 5,
                    backgroundColor: "white",
                  }}
                >
                  <Delete />
                </IconButton>
              )}
            </div>
            <div className="w-2/6 relative">
              <div
                className={` ${
                  showVerticalImageBox ? "hidden" : "block"
                } flex justify-center items-center border border-gray-300 rounded-md`}
                style={{ height: "280px" }}
              >
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  placeholder="Data"
                  id={`vertical-image-${categoryId}`}
                  hidden
                  onChange={(e) => handleVerticalImageChange(e)}
                />

                <div>
                  <Button
                    variant="outlined"
                    onClick={() =>
                      document
                        .getElementById(`vertical-image-${categoryId}`)
                        .click()
                    }
                  >
                    Rasm yuklash
                  </Button>
                </div>
              </div>

              <div
                className={showVerticalImageBox ? "block" : "hidden"}
                style={{ height: "280px" }}
              >
                {verticalImage ? (
                  <img
                    src={
                      verticalImage instanceof File ? URL.createObjectURL(verticalImage) : verticalImage
                    }
                    alt="Image preview"
                    //onLoad={(e) => URL.revokeObjectURL(e.target.src)} // Memory leak oldini olish
                  />
                ) : (
                  <Box></Box>
                )}
              </div>
              {showVerticalImageBox && (
                <IconButton
                  onClick={deleteVerticalSlideImage}
                  sx={{
                    position: "absolute",
                    top: 5,
                    right: 5,
                    backgroundColor: "white",
                  }}
                >
                  <Delete />
                </IconButton>
              )}
            </div>
          </Box>

          <div className="my-5">
            <TextField
              id="outlined-basic"
              label="Name Uz"
              variant="outlined"
              size="small"
              fullWidth
              value={nameUz}
              onChange={(e) => setNameUz(e.target.value)}
            />
            <TextField
              sx={{ my: 2 }}
              id="outlined-basic"
              label="Name Ru"
              variant="outlined"
              fullWidth
              size="small"
              value={nameRu}
              onChange={(e) => setNameRu(e.target.value)}
            />
            <Button
              sx={{ mt: 2 }}
              variant="contained"
              fullWidth
              onClick={editCategoryById}
            >
              Edit
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}

export default HandelCategory;
