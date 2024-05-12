import React, { useEffect, useState } from "react";
import { getAllSms } from "../../../api/SMS";
import { Box, Typography } from "@mui/material";

function HandleSms() {
  const [list, setList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await getAllSms();
      if (res.success) {
        console.log(res.data);
        setList(res.data);
      }
    };
    fetchData();
  }, []);
  return (
    <div className="mt-5">
      {list?.map((item, idx) => {
        return (
          <Box display={"flex"} gap={2}>
            <Typography>{item?.smsName}</Typography>
            <Typography>{item?.text}</Typography>
          </Box>
        );
      })}
    </div>
  );
}

export default HandleSms;
