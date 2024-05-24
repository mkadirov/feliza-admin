import { Box, Button, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { editSms } from "../../../api/SMS";

function ModalPage({ tempText, tempSmsName, handleClose, setHasChanged }) {
  const [text, setText] = useState(tempText);

  const editSMSText = async () => {
    const textBody = {
      text: text,
    };
    console.log(textBody);
    if (text.trim() !== "" && text !== tempText) {
      const res = await editSms(tempSmsName, textBody);
      if (res.success) {
        handleClose();
        setHasChanged(prev => prev + 1)
      } else {
        alert("Xatolik");
      }
    } else {
        alert('Matn bösh yoki eski matin özgartirilmadi')
    }
  };
  return (
    <div>
      <Typography fontSize={22} fontWeight={"bold"} marginBottom={2}>
        {tempSmsName}
      </Typography>

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        style={{ height: "200px", padding: "10px" }}
        className="w-full border border-gray-600 rounded-sm"
        type="text"
        placeholder="Xabar matnini kriting...."
      />

      <Box display={"flex"} justifyContent={"end"}>
        <Button variant="contained" size="small" onClick={editSMSText}>
          Saqlash
        </Button>
      </Box>
    </div>
  );
}

export default ModalPage;
