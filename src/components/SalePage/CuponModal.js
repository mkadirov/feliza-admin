import { Box, Button, TextField, Typography } from "@mui/material";
import React, { useState } from "react";

function CuponModal({
  tempName,
  tempSumma,
  setListChanged,
  tempCuponType,
  handleClose,
}) {
  const [name, setName] = useState(tempName);
  const [summa, setSumma] = useState(tempSumma);

  const editCoupon = async () => {
    const cupon = {
      enumName: tempCuponType,
      name: name,
      credit: summa,
      active: true,
    };
    const res = await editCoupon(cupon);
    if (res?.success) {
      setListChanged((prev) => prev + 1);
      handleClose();
    } else {
      alert("Xatolik");
    }
  };
  return (
    <div>
      <Typography variant="h5">{tempCuponType}</Typography>

      <TextField
        size="small"
        fullWidth
        value={name}
        onChange={(e) => setName(e.target.value)}
        aria-readonly
        placeholder="Kupon nomi"
        type="text"
        sx={{ marginY: 2 }}
      />
      <TextField
        size="small"
        fullWidth
        value={summa}
        onChange={(e) => setSumma(e.target.value)}
        aria-readonly
        placeholder="Summa"
        type="number"
      />

      <Box display={"flex"} marginTop={2} justifyContent={"end"}>
        <Button variant="contained" size="small">
          Özgartirish
        </Button>
      </Box>
    </div>
  );
}

export default CuponModal;
