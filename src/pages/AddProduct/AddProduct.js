import {
  Box,
  Button,
  CircularProgress,
  Container,
  Divider,
  Grid,
  styled,
} from "@mui/material";
import WestIcon from "@mui/icons-material/West";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { grey } from "@mui/material/colors";
import CategoryBox from "../../components/AddProductComponents/CategoryBox";

import ProductMainDetailes from "../../components/AddProductComponents/ProductMainDetailes";
import SizeColorContainer from "../../components/AddProductComponents/SizeColorContainer";
import { createProduct } from "../../api/Product";
import { getAllColors } from "../../api/Color";
import BrandPriceContainer from "../../components/AddProductComponents/BrandPriceContainer";
import NameDescription from "../../components/AddProductComponents/NameDescription";
import RefNumber from "../../components/AddProductComponents/RefNumber";

function AddProduct() {
  const navigate = useNavigate();

  const [actionType, setActionType] = useState(1);
  const [productType, setProductType] = useState(2);
  const [productNameUz, setProductNameUz] = useState("");
  const [productNameRu, setProductNameRu] = useState("");
  const [refNumber, setRefNumber] = useState("");
  const [size, setSize] = useState("");
  const [sizeList, setSizeList] = useState([]);
  const [colorList, setColorList] = useState([]);
  const [imageList, setImageList] = useState([]);
  const [sizeDetailes, setSizeDetailes] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [colors, setColors] = useState([]);
  const [brand, setBrand] = useState("");
  const [price, setPrice] = useState("");
  const [importPrice, setImportPrice] = useState("");
  const [backUpList, setBackUpList] = useState([]);
  const [descriptionUz, setDescriptionUz] = useState("");
  const [descriptionRu, setDescriptionRu] = useState("");
  const [refreshCategory, setRefreshCategory] = useState(0);
  const [colorListRefresh, setColorListRefresh] = useState([]);
  const [IKPUNumber, setIKPUNumber] = useState("");
  const [mxikNumber, setMxikNumber] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const StyledButton = styled(Box)(({ theme }) => ({
    borderRadius: "20px",
    "&:hover, &.activeButton": {
      backgroundColor: theme.palette.primary.main,
      color: "white",
    },
    flex: 1,
    height: "60px",
    backgroundColor: grey[300],
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  }));

  const handleImageChange = (e, color) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const newColorImages = {
        colorName: color,
        imagesList: Array.from(files),
      };
      const colorIndex = imageList.findIndex(
        (item) => item.colorName === color
      );
      const updatedImageList = [...imageList];

      if (colorIndex !== -1) {
        updatedImageList[colorIndex] = newColorImages;
      } else {
        updatedImageList.push(newColorImages);
      }
      setImageList(updatedImageList);
    }
  };

  const handleSize = (event) => {
    let newValue = event.target.value;
    const newValueUpperCase = newValue.replace(/[a-z]/g, (match) =>
      match.toUpperCase()
    );
    setSize(newValueUpperCase);
  };

  function addSize() {
    if (!sizeList.includes(size) && size.trim() != "") {
      setSizeList([...sizeList, size]);
    } else {
      alert("Mavjud ölcham yoki bösh matin kritildi");
    }
    setSize("");
  }

  function deleteSize(item) {
    const list = [...sizeList];
    setSizeList(list.filter((s) => s != item));
  }

  useEffect(() => {
    const fetchData = async () => {
      const res = await getAllColors();
      if (res?.success) {
        setColors(res.data);
      }
    };

    fetchData();
  }, []);

  function addColor(color) {
    if (!colorList.includes(color)) {
      setImageList([...imageList, { colorName: color, imagesList: [] }]);
      setColorList([...colorList, color]);
    }
  }

  useEffect(() => {
    updateSizeDetailes();
  }, [colorList, sizeList]);

  function updateSizeDetailes() {
    const newDetailes = [];

    colorList.forEach((colorItem) => {
      sizeList.forEach((sizeItem) => {
        const tempSizeDetail = backUpList.find(
          (item) => item.color == colorItem && item.size == sizeItem
        );
        if (tempSizeDetail) {
          newDetailes.push(tempSizeDetail);
        } else {
          newDetailes.push({
            color: colorItem,
            size: sizeItem,
            barCode: "",
            quantity: "",
          });
        }
      });
    });
    setSizeDetailes(newDetailes);
  }

  function deleteColor(color) {
    const list = [...colorList];
    setColorList(list.filter((item) => item != color));
  }

  function addBarcode(e, color, s) {
    const barCode = e.target.value;
    setSizeDetailes((prevData) =>
      prevData.map((item) =>
        item.color == color && item.size == s
          ? { ...item, barCode: barCode }
          : item
      )
    );
  }
  function addGeneretedBarcode(barCode, color, s) {
    setSizeDetailes((prevData) =>
      prevData.map((item) =>
        item.color == color && item.size == s
          ? { ...item, barCode: barCode }
          : item
      )
    );
  }

  function addQuantity(e, color, s) {
    const quantity = e.target.value;

    setSizeDetailes((prevData) =>
      prevData.map((item) =>
        item.color == color && item.size == s
          ? { ...item, quantity: quantity }
          : item
      )
    );
  }

  const checkProduct = () => {
    if (productNameRu.trim() == "" || productNameUz.trim() == "") {
      alert("Mahsulot nomi kritilmadi");
      return;
    }

    if (categoryList.length < 2) {
      alert("Asosiy va quyi kategoriyalar tanlanishi shart");
      return;
    }

    if (price == "" || importPrice == "") {
      alert("Narx kritilmadi");
      return;
    }

    if (refNumber.trim() == "") {
      alert("Referens raqami kritilmadi");
      return;
    }

    if (colorList.length == 0) {
      alert("Rang tanlanmadi");
      return;
    }
    setIsLoading(true);
    createProductList();
  };

  function createProductList() {
    setBackUpList(sizeDetailes);
    colorList.map((colorItem, idx) => {
      let productImageList = [];
      let productSizeDetailes = [];

      sizeDetailes.map((sizeDetail) => {
        if (sizeDetail.color == colorItem) {
          productSizeDetailes.push({
            size: sizeDetail.size,
            barCode: sizeDetail.barCode,
            quantity: sizeDetail.quantity,
          });
        }
      });

      imageList.map((imageObj) => {
        if (imageObj.colorName == colorItem) {
          productImageList = [...imageObj.imagesList];
        }
      });
      console.log(productImageList);

      const colorObj = colors.find((item) => item.colorCode == colorItem);
      const categoryIdList = categoryList.map((item) => item.id);

      const product = {
        nameUZB: productNameUz,
        nameRUS: productNameRu,
        descriptionUZB: descriptionUz,
        descriptionRUS: descriptionRu,
        referenceNumber: refNumber,
        importPrice: importPrice,
        sellPrice: price,
        sale: 0,
        brandId: brand.id,
        categoryId: categoryIdList,
        colorId: colorObj.id,
        productSizeVariantDtoList: productSizeDetailes,
        ikpuNumber: IKPUNumber,
        mxikNumber: mxikNumber,
        active: true,
      };
      console.log(product);

      const fetchData = async () => {
        const res = await createProduct(product, productImageList);
        if (res?.success) {
          console.log("Mahsulot yaratildi");
          setColorListRefresh((prev) => [...prev, colorItem]);
          if (idx == colorList.length - 1) {
            refreshForm();
          }
        } else {
          console.log("Xatolik!!!!!!!!!!!!!!!");
          setIsLoading(false);
          alert("Mahsulot yaratishda xatolik");
        }
      };
      fetchData();
    });
  }

  const refreshForm = () => {
    setIsLoading(false);
    const countError = colorList.length - colorListRefresh.length;
    if (countError == colorList.length) {
      setColorList([]);
      setSizeDetailes([]);
      setBackUpList([]);
      setRefNumber("");
      setProductNameRu("");
      setProductNameUz("");
      setPrice("");
      setImportPrice("");
      setIKPUNumber("");
      setMxikNumber("");
      alert("Barcha mahsulotlar muvofaqiyatli yaratildi");
    } else {
      alert(countError + " ta mahsulot yaratilmadi");
      setColorList((prev) =>
        prev.filter((item) => !colorListRefresh.includes(item))
      );
      setSizeDetailes((item) => !colorListRefresh.includes(item.color));
    }
  };

  return (
    <Box sx={{ position: "relative" }}>
      <Container sx={{ border: "1px solid grey" }}>
        <Button
          sx={{ my: 2 }}
          variant="contained"
          onClick={() => navigate("/products")}
          startIcon={<WestIcon />}
        >
          Mahsulotlar
        </Button>
        <Divider />
        <p className="text-2xl py-2">Asosoiy malumotlar</p>
        <div className="flex gap-2 w-full">
          <StyledButton
            className={actionType == 1 ? "activeButton" : "inactiveButton"}
            onClick={() => setActionType(1)}
          >
            Yangi mahsulot qo'shish
          </StyledButton>
          <StyledButton
            className={actionType == 2 ? "activeButton" : "inactiveButton"}
            onClick={() => setActionType(2)}
          >
            Mavjud turkumga mahsulot qo'shish
          </StyledButton>
          <StyledButton
            className={actionType == 3 ? "activeButton" : "inactiveButton"}
            onClick={() => setActionType(3)}
          >
            Mahsulotga qo'shimcha miqdor
          </StyledButton>
        </div>
        <p className="text-2xl mt-3 mb-2">Mahsulot turi</p>
        <div className="flex gap-2 w-full">
          <StyledButton
            className={productType == 1 ? "activeButton" : "inactiveButton"}
            onClick={() => {
              const newArray = ["Standard"];
              setProductType(1);
              setSizeList(newArray);
            }}
          >
            Oddiy Mahsulot
          </StyledButton>
          <StyledButton
            className={productType == 2 ? "activeButton" : "inactiveButton"}
            onClick={() => {
              setProductType(2);
              setSizeList([]);
            }}
          >
            Turkumli mahsulot
          </StyledButton>
        </div>
        <NameDescription
          productNameUz={productNameUz}
          setProductNameUz={setProductNameUz}
          productNameRu={productNameRu}
          setProductNameRu={setProductNameRu}
          descriptionRu={descriptionRu}
          descriptionUz={descriptionUz}
          setDescriptionRu={setDescriptionRu}
          setDescriptionUz={setDescriptionUz}
        />

        <CategoryBox
          categoryList={categoryList}
          setCategoryList={setCategoryList}
          refreshCategory={refreshCategory}
          isShortList={false}
        />

        <Box>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <RefNumber refNumber={refNumber} setRefNumber={setRefNumber} />
            </Grid>
            <Grid item xs={6} marginTop={3}>
              <p className="text-2xl mb-2">IKPU nomer *</p>
              <div className="input-container ">
                <input
                  placeholder="IKPU"
                  style={{ flex: 1 }}
                  type="text"
                  className="main-input"
                  value={IKPUNumber}
                  onChange={(e) => setIKPUNumber(e.target.value)}
                />
              </div>
            </Grid>
          </Grid>
        </Box>

        <Box>
          <Grid container spacing={2}>
            <Grid item xs={6} marginTop={3}>
              <p className="text-2xl mb-2">MXIK nomer *</p>
              <div className="input-container ">
                <input
                  placeholder="IKPU"
                  style={{ flex: 1 }}
                  type="text"
                  className="main-input"
                  value={mxikNumber}
                  onChange={(e) => setMxikNumber(e.target.value)}
                />
              </div>
            </Grid>
            <Grid item xs={6}></Grid>
          </Grid>
        </Box>

        <BrandPriceContainer
          brand={brand}
          setBrand={setBrand}
          price={price}
          setPrice={setPrice}
          importPrice={importPrice}
          setImportPrice={setImportPrice}
        />

        <SizeColorContainer
          colorList={colorList}
          deleteColor={deleteColor}
          colors={colors}
          addColor={addColor}
          handleSize={handleSize}
          addSize={addSize}
          sizeList={sizeList}
          deleteSize={deleteSize}
          productType={productType}
          size={size}
        />

        <Divider />

        <ProductMainDetailes
          colorList={colorList}
          imageList={imageList}
          handleImageChange={handleImageChange}
          sizeDetailes={sizeDetailes}
          addBarcode={addBarcode}
          addQuantity={addQuantity}
          sizeList={sizeList}
          addGeneretedBarcode={addGeneretedBarcode}
        />

        <Divider />

        <div className="flex justify-end mt-2 mb-6">
          <Button
            onClick={() => {
              checkProduct();
            }}
            type="submit"
            variant="contained"
            disabled={isLoading}
          >
            Kiritish
          </Button>
        </div>
      </Container>

      {isLoading && (
        <Box
          sx={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(255, 255, 255, 0.7)",
            zIndex: 9999,
          }}
        >
          <Box
            sx={{
              width: "100%",
              height: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <CircularProgress />
          </Box>
        </Box>
      )}
    </Box>
  );
}

export default AddProduct;
