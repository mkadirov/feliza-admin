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

        <Typography>{order?.receiverName}</Typography>
      </Box>

      <Box display={"flex"} gap={1}>
        <Typography sx={{ color: "grey" }}>Telefon raqami:</Typography>

        <Typography>{order?.receiverPhoneNumber}</Typography>
      </Box>
      <Box display={"flex"} gap={1}>
        <Typography sx={{ color: "grey" }}>Manzili:</Typography>

        <Typography>
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
    </Box>
  );
}

export default OrderInfo;
