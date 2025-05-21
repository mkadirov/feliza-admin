import { Box, Button, Grid } from "@mui/material";
import React from "react";
import { useEffect } from "react";
import {
  getAllCollections,
  deleteLookCollection,
} from "../../../api/LookCollection";
import { useState } from "react";
import { Delete } from "@mui/icons-material";

function HandelCollection({ refreshList, setRefreshList }) {
  const [list, setList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await getAllCollections();
      if (res.success) {
        console.log(res.data);
        setList(res.data);
      }
    };

    fetchData();
  }, [refreshList]);

  const deleteCollection = async (id) => {
    const res = await deleteLookCollection(id);
    if (res.success) {
      setRefreshList((prev) => prev + 1);
    }

    console.log(id);
  };

  return (
    <Box sx={{ marginTop: 2 }}>
      <Grid container spacing={1}>
        {list.map((item, idx) => {
          return (
            <Grid item xs={3} key={item.id * (idx + 9)} className="">
              <Box className="look-box bg-red-500 relative">
                <img  src={item.images[0]?.url} alt="" />
              <Button
                style={{ position: "absolute", top: 0, right: -20 }}
                startIcon={<Delete />}
                onClick={() => deleteCollection(item.id)}
              />
              </Box>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
}

export default HandelCollection;
