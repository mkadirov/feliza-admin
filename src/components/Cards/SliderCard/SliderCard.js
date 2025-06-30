import { Box, Button, Card, IconButton, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import CategoryDropDown from "./CategoryDropDown";
import SaleDropDown from "./SaleDropDown";
import SearchProduct from "./SearchProduct";
import SearchLook from "./SearchLook";
import { createKarusel } from "../../../api/Karusel";
import { Delete } from "@mui/icons-material";

function SliderCard({ setIsChanged }) {
  const [linkId, setLinkId] = useState("");
  const [image, setImage] = useState(null);
  const [imageDesktop, setImageDesktop] = useState(null);
  const [showImageBox, setShowImageBox] = useState(false);
  const [showImageBoxDesktop, setShowImageBoxDesktop] = useState(false);
  const [linkType, setLinkType] = useState("product_id");
  const [images, setImages] = useState([]);
  const [imagesDesktop, setImagesDesktop] = useState([]);

  useEffect(() => {
    setLinkId("");
  }, [linkType]);

  const handleImageChange = (event) => {
    const files = event.target.files;
    setImage(files[0]);
    setImages(files);
    setShowImageBox(true);
  };
  const handleImageChangeDesktop = (event) => {
    const files = event.target.files;
    setImageDesktop(files[0]);
    setImagesDesktop(files);
    setShowImageBoxDesktop(true);
  };

  const handelClick = () => {
    if (linkId !== "" && image) {
      createNewSlide();
    } else {
      alert("error");
    }
  };

  const createNewSlide = async () => {
    const karuselSlide = {
      karuselType: linkType,
      parameterId: linkId,
    };

    const imagesData = {
      mobile: images,
      desktop: imagesDesktop,
    };
    console.log(imagesData);
    console.log(karuselSlide);
    const res = await createKarusel(imagesData, karuselSlide);

    if (res.success) {
      console.log("Slide yaratildi");
      setShowImageBox(false);
      setImage(null);
      setShowImageBoxDesktop(false);
      setImageDesktop(null);
      setLinkId("");
      setLinkType("ProductId");
      setIsChanged((prev) => prev + 1);
    } else {
      alert("Xatolik");
    }
  };

  const deleteSlideImage = () => {
    setShowImageBox(false);
    setImage(null);
    setImages([]);
  };
  const deleteSlideImageDesktop = () => {
    setShowImageBoxDesktop(false);
    setImageDesktop(null);
    setImagesDesktop([]);
  };

  console.log(imageDesktop);

  return (
    <Card>
      <div className="flex p-1 space-x-3">
        <div className="w-2/5 relative">
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
              id={`card-image-input-btn`}
              hidden
              onChange={(e) => handleImageChange(e)}
            />

            <div>
              <Button
                variant="outlined"
                onClick={() =>
                  document.getElementById(`card-image-input-btn`).click()
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
              <img src={URL.createObjectURL(image)} alt="" />
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

        <div className="w-1/2 relative">
          <div
            className={` ${
              showImageBoxDesktop ? "hidden" : "block"
            } flex justify-center items-center border border-gray-300 rounded-md`}
            style={{ height: "280px" }}
          >
            <input
              type="file"
              multiple
              accept="image/*"
              placeholder="Data"
              id={`card-image-input-btn-desktop`}
              hidden
              onChange={(e) => handleImageChangeDesktop(e)}
            />

            <div>
              <Button
                variant="outlined"
                onClick={() =>
                  document
                    .getElementById(`card-image-input-btn-desktop`)
                    .click()
                }
              >
                Rasm yuklash Desktop
              </Button>
            </div>
          </div>

          <div
            className={showImageBoxDesktop ? "block" : "hidden"}
            style={{ height: "280px" }}
          >
            {imageDesktop ? (
              <img
                className=""
                src={URL.createObjectURL(imageDesktop)}
                alt=""
              />
            ) : (
              <Box></Box>
            )}
          </div>
          {showImageBoxDesktop && (
            <IconButton
              onClick={deleteSlideImageDesktop}
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

        <div className="w-3/5 flex justify-between flex-col">
          <div className="flex justify-center gap-1 flex-col px-2">
            <div className="flex justify-center gap-1 mb-2">
              <Button
                variant={linkType == "product_id" ? "contained" : "outlined"}
                size="small"
                onClick={() => setLinkType("product_id")}
              >
                Product
              </Button>
              <Button
                variant={linkType == "look_id" ? "contained" : "outlined"}
                size="small"
                onClick={() => setLinkType("look_id")}
              >
                Look
              </Button>
              <Button
                variant={linkType == "category_id" ? "contained" : "outlined"}
                size="small"
                onClick={() => setLinkType("category_id")}
              >
                Category
              </Button>
              {/* <Button 
                            variant={linkType == 'sale_id' ? 'contained' : 'outlined'} 
                            size='small'
                            onClick={() => setLinkType('sale_id')}
                        >
                            Sale group
                        </Button>
                        <Button 
                            variant={linkType == 'all_sale' ? 'contained' : 'outlined'} 
                            size='small'
                            onClick={() => setLinkType('all_sale')}
                        >
                            All sale
                        </Button> */}
            </div>
            {linkType == "product_id" && (
              <Box>
                <SearchProduct linkType={linkType} setLinkId={setLinkId} />
              </Box>
            )}

            {linkType == "look_id" && (
              <Box>
                <SearchLook linkType={linkType} setLinkId={setLinkId} />
              </Box>
            )}

            {linkType == "category_id" && (
              <Box>
                <CategoryDropDown setLinkId={setLinkId} />
              </Box>
            )}
            {/* {
                        linkType == 'sale_id' && (
                            <Box>
                                <SaleDropDown setLinkId={setLinkId}/>
                            </Box>
                            
                        )
                    } */}
            <Box>
              <Box
                display={"flex"}
                gap={2}
                justifyContent={"center"}
                marginTop={2}
              >
                <Box display={"flex"} gap={1}>
                  <Typography sx={{ color: "grey" }}>Link type:</Typography>
                  <Typography>{linkType}</Typography>
                </Box>
                <Box
                  gap={1}
                  sx={{ display: linkType == "all_sale" ? "none" : "flex" }}
                >
                  <Typography sx={{ color: "grey" }}>Link ID:</Typography>
                  <Typography>{linkId}</Typography>
                </Box>
              </Box>
            </Box>
          </div>

          <Box>
            <div>
              <div className="flex justify-end gap-1">
                <Button
                  variant="contained"
                  size="small"
                  sx={{ backgroundColor: "green" }}
                  onClick={handelClick}
                >
                  Saqlash
                </Button>
              </div>
            </div>
          </Box>
        </div>
      </div>
    </Card>
  );
}

export default SliderCard;
