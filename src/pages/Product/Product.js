import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import MainLayout from "../../components/Layout/MainLayout";
import { useParams } from "react-router-dom";
import { getProductByID, getProductByRefNumber } from "../../api/Product";
import ProductColorContainer from "../../components/Product/ProductColorContainer";
import { getAllColors } from "../../api/Color";
import ProductCategoryBox from "../../components/Product/ProductCategoryBox";

function Product() {
  const { id } = useParams();
  const [product, setProduct] = useState([]);
  const [productNameUz, setProductNameUz] = useState("");
  const [productNameRu, setProductNameRu] = useState("");
  const [brand, setBrand] = useState("");
  const [price, setPrice] = useState("");
  const [descriptionUz, setDescriptionUz] = useState("");
  const [descriptionRu, setDescriptionRu] = useState("");
  const [IKPUNumber, setIKPUNumber] = useState("");
  const [colors, setColors] = useState([]);
  const [colorList, setColorList] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [refreshCategory, setRefreshCategory] = useState(0);
  const [parentCategory, setParentCategory] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      //const res = await getProductByRefNumber(referenceNumber);
      const res = await getProductByID(id);
      if (res?.success) {
        const temp = res.data;
        console.log(temp);
        setProduct(temp);
        setProductNameUz(temp?.nameUZB);
        setProductNameRu(temp?.nameRUS);
        setPrice(temp?.sellPrice);
        setColorList([temp.color.colorCode]);
        setDescriptionRu(temp.descriptionRUS);
        setDescriptionUz(temp.descriptionUZB);
        setCategoryList(temp.category)
        setParentCategory(temp?.category[0]?.nameUZB)
      }
    };

    fetchData();
  }, [id]);

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
      setColorList([color]);
    }
  }

  function deleteColor() {
    setColorList([]);
  }

  return (
    <MainLayout>
      <Box marginTop={7}>
        <Typography>Mahsulotni özgartirish</Typography>
      </Box>
      <Grid container spacing={2}>
        {product?.productImages?.map((item) => {
          return (
            <Grid item xs={2} key={item.id}>
              <Box className="img-box">
                <img src={item.url} alt="" />
              </Box>
            </Grid>
          );
        })}
      </Grid>

      <Grid container spacing={2} marginTop={3}>
        <Grid item xs={12} md={6}>
          <TextField
            id="outlined-basic"
            variant="outlined"
            size="small"
            value={productNameUz ? productNameUz : ""}
            onChange={(e) => setProductNameUz(e.target.value)}
            helperText="Maxsulot nomi (UZB)"
            fullWidth
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            id="outlined-basic"
            variant="outlined"
            size="small"
            value={productNameRu ? productNameRu : ""}
            onChange={(e) => setProductNameRu(e.target.value)}
            fullWidth
            helperText="Maxsulot nomi (RUS)"
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            type="number"
            id="outlined-basic"
            variant="outlined"
            size="small"
            value={price ? price : ""}
            onChange={(e) => setPrice(e.target.value)}
            fullWidth
            helperText="Sotilish narxi"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            id="outlined-basic"
            helperText='IKPU nomer'
            variant="outlined"
            size="small"
            fullWidth
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            id="outlined-basic"
            helperText='MXIK nomer'
            variant="outlined"
            size="small"
            fullWidth
          />
        </Grid>
        <Grid item xs={6}>
          <p className="text-2xl mt-5 mb-2">Mahsulot haqida ma'lumot</p>
          <textarea
            value={descriptionUz}
            onChange={(e) => setDescriptionUz(e.target.value)}
            style={{ height: "150px", padding: "10px" }}
            className="w-full border border-gray-600 "
            type="text"
          />
        </Grid>
        <Grid item xs={6}>
          <p className="text-2xl mt-5 mb-2">Информация о продукте</p>
          <textarea
            value={descriptionRu}
            onChange={(e) => setDescriptionRu(e.target.value)}
            style={{ height: "150px", padding: "10px" }}
            className="w-full border border-gray-600"
            type="text"
          />
        </Grid>
      </Grid>
      <ProductCategoryBox
        categoryList={categoryList}
        setCategoryList={setCategoryList}
        refreshCategory={refreshCategory}
        parentCategory={parentCategory}
        setParentCategory={setParentCategory}
        id={id}
      />

      <ProductColorContainer
        colorList={colorList}
        colors={colors}
        addColor={addColor}
        deleteColor={deleteColor}
      />

      <Box display={"flex"} justifyContent={"end"} marginY={3}>
        <Button size="small" variant="contained">
          O'zgartirish
        </Button>
      </Box>
    </MainLayout>
  );
}

export default Product;
