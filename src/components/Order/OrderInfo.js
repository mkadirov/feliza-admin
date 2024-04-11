import React from "react";
import { Box, Typography } from "@mui/material";

function OrderInfo({order}) {
  return (
    <Box>
      <Typography marginBottom={2} variant="h5">Mijoz haqida ma'lumot</Typography>

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

        {order.postFilial ? (
          <Box>Post</Box>
        ) : (
          <Typography>
            {order?.address?.region?.name}, {order?.address?.subRegion?.name},{" "}
            {order?.address?.street}, {order?.address?.houseNumber}
          </Typography>
        )}
      </Box>
    </Box>
  );
}

export default OrderInfo;
