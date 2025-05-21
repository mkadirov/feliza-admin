import React, { useEffect, useState } from "react";
import { Card, Box, Typography, Grid } from "@mui/material";
import { getProductByRefNumber } from "../../api/Product";

function OrderProductCard({ item }) {
  const [product, setProduct] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const res = await getProductByRefNumber(item.referenceNumber);
      if (res?.success) {
        setProduct(res.data);
      }
    };
    fetchData();
  }, [item.referenceNumber]);

  console.log("Product", product);

  return (
    <Card sx={{ padding: 2 }}>
      <Grid container spacing={1}>
        <Grid item xs={4}>
          <Box sx={{ height: { xs: "240px", xl: "320px" } }}>
            <img src={item.productImages[0]?.url} alt="" />
          </Box>
        </Grid>
        <Grid item xs={8}>
          <Box display={"flex"} gap={1}>
            <Typography sx={{ color: "grey" }}>Mahsulot nomi:</Typography>

            <Typography>{item?.productName}</Typography>
          </Box>
          <Box display={"flex"} gap={1}>
            <Typography sx={{ color: "grey" }}>Narxi:</Typography>

            <Typography>{item?.productCost} söm</Typography>
          </Box>
          <Box display={"flex"} gap={1}>
            <Typography sx={{ color: "grey" }}>Barcode:</Typography>

            <Typography>{item?.productSizeVariant?.barCode}</Typography>
          </Box>
          <Box display={"flex"} gap={1}>
            <Typography sx={{ color: "grey" }}>Ref number:</Typography>

            <Typography>{item?.referenceNumber}</Typography>
          </Box>
          <Box display={"flex"} gap={1} marginTop={3} alignItems={"center"}>
            <Typography sx={{ color: "grey" }}>Ölchami:</Typography>

            <Typography fontSize={22} fontWeight={"bold"}>
              {item?.productSizeVariant?.size}
            </Typography>
          </Box>
          <Box display={"flex"} gap={1} alignItems={"center"}>
            <Typography sx={{ color: "grey" }}>Soni:</Typography>

            <Typography fontSize={22} fontWeight={"bold"}>
              {item?.quantity}
            </Typography>
          </Box>
          <Box display={"flex"} gap={1} alignItems={"center"}>
            <Typography sx={{ color: "grey" }}>Chegirma:</Typography>
            {product[0]?.salePrice > 0 && (
              <Typography style={{}} fontSize={22} fontWeight={"bold"}>
                {product[0]?.salePrice}
              </Typography>
            )}

            <Typography
              style={{
                textDecoration: product[0]?.salePrice > 0 && "line-through",
                color: product[0]?.salePrice > 0 && "red",
                fontSize: product[0]?.salePrice > 0 && "18px",
              }}
              fontSize={22}
              fontWeight={"bold"}
            >
              {product[0]?.sellPrice}
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Card>
  );
}

export default OrderProductCard;
