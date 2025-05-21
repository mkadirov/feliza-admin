import React from "react";
import { Box, Typography } from "@mui/material";

function OrderInfo({ order }) {
  return (
    <Box>
      <Typography marginBottom={2} variant="h5">
        Mijoz haqida ma'lumot
      </Typography>

      <Box display={"flex"} gap={1}>
        <Typography sx={{ color: "grey" }}>Ism sharfi:</Typography>

        <Typography fontWeight={"bold"}>{order?.receiverName}</Typography>
      </Box>

      <Box display={"flex"} gap={1}>
        <Typography sx={{ color: "grey" }}>Telefon raqami:</Typography>

        <Typography fontWeight={"bold"}>
          {order?.receiverPhoneNumber}
        </Typography>
      </Box>
      <Box display={"flex"} gap={1}>
        <Typography sx={{ color: "grey" }}>Manzili:</Typography>

        <Typography fontWeight={"bold"}>
          {order?.address?.region?.nameUZB},{" "}
          {order?.address?.subRegion?.nameUZB},{" "}
          {order?.address?.street
            ? order?.address?.street
            : order.address?.postFilial?.postName +
              ", " +
              order.address?.postFilial?.postFilialName}
          , {order?.address?.houseNumber}
        </Typography>
      </Box>

      <Box display={"flex"} gap={1}>
        <Typography sx={{ color: "grey" }}>Buyurtma raqami:</Typography>

        <Typography fontWeight={"bold"}>{order?.orderNumber}</Typography>
      </Box>

      <Box display={"flex"} gap={1}>
        <Typography sx={{ color: "grey" }}>Kupon:</Typography>

        <Typography
          style={{
            textTransform: "uppercase",
            color: order?.couponCustomer?.coupon?.active ? "green" : "red",
          }}
          fontWeight={"bold"}
        >
          {order?.couponCustomer
            ? order?.couponCustomer?.coupon?.name
            : "Kupon yo'q"}
        </Typography>
      </Box>

      <Box display={"flex"} gap={1}>
        <Typography sx={{ color: "grey" }}>Umumiy Summa:</Typography>

        <Typography fontWeight={"bold"}>{order?.orderCost}</Typography>
      </Box>
    </Box>
  );
}

export default OrderInfo;
