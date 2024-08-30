import { Box, Grid, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import MainLayout from "../../components/Layout/MainLayout";
import { useParams } from "react-router-dom";
import { getProductByRefNumber } from "../../api/Product";

function Product() {
  const { referenceNumber } = useParams();
  const [list, setList] = useState([]);
  const [productNameUz, setProductNameUz] = useState("");
  const [productNameRu, setProductNameRu] = useState("");
  const [brand, setBrand] = useState("");
  const [price, setPrice] = useState("");
  const [importPrice, setImportPrice] = useState("");
  const [descriptionUz, setDescriptionUz] = useState("");
  const [descriptionRu, setDescriptionRu] = useState("");
  const [IKPUNumber, setIKPUNumber] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const res = await getProductByRefNumber(referenceNumber);
      if (res?.success) {
        setList(res.data);
        console.log(res.data);
        const product = res.data[0];
        setProductNameUz(product?.nameUZB)
        setProductNameRu(product?.nameRUS)
        setPrice(product?.sellPrice)
      }
    };

    fetchData();
  }, [referenceNumber]);

  return (
    <MainLayout>
      <Box marginTop={7}>
        <Typography>Mahsulotni özgartirish</Typography>
      </Box>
      <Grid container spacing={2}>
        {list?.map((item) => {
          return (
            <Grid item xs={2} key={item.id}>
              <Box className="img-box">
                <img src={item.productImages[0]?.url} alt="" />
              </Box>
            </Grid>
          );
        })}
      </Grid>

      <Grid container spacing={2} marginTop={3}>
        <Grid item xs={12} lg={10} xl={8}>
          <TextField
            id="outlined-basic"
            
            variant="outlined"
            size="small"
            value={productNameUz? productNameUz : ''}
            onChange={(e) => setProductNameUz(e.target.value)}
            helperText= 'Maxsulot nomi (UZB)'
            fullWidth
          />
        </Grid>
        <Grid item xs={12} lg={10} xl={8}>
          <TextField
            id="outlined-basic"
            variant="outlined"
            size="small"
            value={productNameRu? productNameRu : ''}
            onChange={(e) => setProductNameRu(e.target.value)}
            fullWidth
            helperText= 'Maxsulot nomi (RUS)'
          />
        </Grid>
        <Grid item xs={12} lg={10} xl={8}>
          <TextField
            type="number"
            id="outlined-basic"
            variant="outlined"
            size="small"
            value={price? price : ''}
            onChange={(e) => setPrice(e.target.value)}
            fullWidth
            helperText= 'Sotilish narxi'
          />
        </Grid>
        <Grid item xs={12} lg={10} xl={8}>
          <TextField
            id="outlined-basic"
            label="Mahsulot nomi (UZB)"
            variant="outlined"
            size="small"
            fullWidth
          />
        </Grid>
        <Grid item xs={12} lg={10} xl={8}>
          <TextField
            id="outlined-basic"
            label="Mahsulot nomi (UZB)"
            variant="outlined"
            size="small"
            fullWidth
          />
        </Grid>
        <Grid item xs={12} lg={10} xl={8}>
          <TextField
            id="outlined-basic"
            label="Mahsulot nomi (UZB)"
            variant="outlined"
            size="small"
            fullWidth
          />
        </Grid>
      </Grid>
    </MainLayout>
  );
}

export default Product;
