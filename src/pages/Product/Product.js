import {
  Box,
  Button,
  Grid,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import MainLayout from "../../components/Layout/MainLayout";
import { useParams } from "react-router-dom";
import { editProduct, getProductByID } from "../../api/Product";
import ProductColorContainer from "../../components/Product/ProductColorContainer";
import { getAllColors } from "../../api/Color";
import ProductCategoryBox from "../../components/Product/ProductCategoryBox";
import ProductBrandContainer from "../../components/Product/ProductBrandContainer";
import ProductSizeContainer from "../../components/Product/ProductSizeContainer";
import MyContext from "../../components/Context/MyContext";

function Product() {
  const { id } = useParams();
  const [product, setProduct] = useState([]);
  const [productNameUz, setProductNameUz] = useState("");
  const [productNameRu, setProductNameRu] = useState("");
  const [brand, setBrand] = useState("");
  const [price, setPrice] = useState("");
  const [descriptionUz, setDescriptionUz] = useState("");
  const [descriptionRu, setDescriptionRu] = useState("");
  const [ikpuNumber, setIkpuNumber] = useState("");
  const [mxikNumber, setMxikNumber] = useState("");
  const [colors, setColors] = useState([]);
  const [colorList, setColorList] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [refreshCategory, setRefreshCategory] = useState(0);
  const [parentCategory, setParentCategory] = useState(0);
  const [sizes, setSizes] = useState([]);
  const [isActive, setIsActive] = useState(true);

  const { setIsLoading } = useContext(MyContext);

  useEffect(() => {
    const fetchData = async () => {
      const res = await getProductByID(id);
      if (res?.success) {
        const temp = res.data;
        const itemsWithoutId = temp?.productSizeVariantList?.map(
          ({ id, ...rest }) => rest
        );
        console.log(temp);
        const tempCategory = temp?.category?.reverse()
        setProduct(temp);
        setProductNameUz(temp?.nameUZB);
        setProductNameRu(temp?.nameRUS);
        setPrice(temp?.sellPrice);
        setColorList([temp.color.colorCode]);
        setDescriptionRu(temp.descriptionRUS);
        setDescriptionUz(temp.descriptionUZB);
        setCategoryList(tempCategory);
        setParentCategory(temp?.category[0]?.nameUZB);
        setBrand(temp.brand);
        setIkpuNumber(temp.ikpunumber);
        setMxikNumber(temp.mxikNumber);
        setSizes(itemsWithoutId);
        setIsActive(temp.active);
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

  const handleChange = (event) => {
    setIsActive(event.target.checked);
  };

  const checkProduct = () => {
    if (productNameRu.trim() == "" || productNameUz.trim() == "") {
      alert("Mahsulot nomi kritilmadi");
      return;
    }
    if (ikpuNumber.trim() == "") {
      alert("IPKU Nomer kritilmadi");
      return;
    }
    if (mxikNumber !== null) {
      if (mxikNumber.trim() == "") {
        alert("MXIK Nomer kritilmadi");
        return;
      }
    } else {
      alert("MXIK Nomer kritilmadi");
      return;
    }

    if (categoryList.length < 2) {
      alert("Asosiy va quyi kategoriyalar tanlanishi shart");
      return;
    }

    if (price == "" || price <= 0) {
      alert("Narx kritilmadi");
      return;
    }

    if (colorList.length == 0) {
      alert("Rang tanlanmadi");
      return;
    }
    setIsLoading(true);
    editProductDetail();
  };

  const editProductDetail = () => {
    const colorObj = colors.find((item) => item.colorCode == colorList[0]);
    const categoryIdList = categoryList.map((item) => item.id);

    const product = {
      nameUZB: productNameUz,
      nameRUS: productNameRu,
      descriptionUZB: descriptionUz,
      descriptionRUS: descriptionRu,
      sellPrice: price,
      brandId: brand.id,
      categoryId: categoryIdList,
      colorId: colorObj.id,
      productSizeVariantDtoList: sizes,
      ikpuNumber: ikpuNumber,
      mxikNumber: mxikNumber,
      active: isActive,
    };
    console.log(product);

    const fetchData = async () => {
      const res = await editProduct(id, product);
      if (res?.success) {
        console.log("Mahsulot özgartirildi");
        setIsLoading(false);
      } else {
        console.log("Xatolik!!!!!!!!!!!!!!!");
        setIsLoading(false);
        alert("Mahsulot özgartirishda xatolik");
      }
    };
    fetchData();
  };

  return (
    <MainLayout>
      <Box marginTop={7}>
        <Typography>Mahsulotni özgartirish</Typography>
      </Box>
      <Grid container spacing={2}>
        {product?.productImages?.map((item) => {
          return (
            <Grid item xs={2} key={item.id}>
              <Box className="img-box" sx={{ height: "350px" }}>
                <img src={item.url} alt="" />
              </Box>
            </Grid>
          );
        })}
      </Grid>

      <Box display={"flex"} gap={3} alignItems={"center"} marginTop={2}>
        <Typography>Mahsulot statusi:</Typography>
        <Switch
          checked={isActive}
          onChange={handleChange}
          inputProps={{ "aria-label": "controlled" }}
        />
        <Typography>{isActive ? "Aktiv" : "Aktiv emas"}</Typography>
      </Box>

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
          <ProductBrandContainer brand={brand} setBrand={setBrand} />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            value={ikpuNumber ? ikpuNumber : ""}
            onChange={(e) => setIkpuNumber(e.target.value)}
            id="outlined-basic"
            helperText="IKPU nomer"
            variant="outlined"
            size="small"
            fullWidth
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            value={mxikNumber ? mxikNumber : ""}
            onChange={(e) => setMxikNumber(e.target.value)}
            id="outlined-basic"
            helperText="MXIK nomer"
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

      <ProductSizeContainer sizes={sizes} setSizes={setSizes} />

      <Box display={"flex"} justifyContent={"end"} marginY={3}>
        <Button size="small" variant="contained" onClick={() => checkProduct()}>
          O'zgartirish
        </Button>
      </Box>
    </MainLayout>
  );
}

export default Product;
