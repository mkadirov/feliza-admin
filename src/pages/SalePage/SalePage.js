import React, { useEffect, useState } from "react";
import MainLayout from "../../components/Layout/MainLayout";
import { Box, Button, Card, Grid, Divider } from "@mui/material";
import AddSale from "../../components/SalePage/AddSale";
import SaleList from "../../components/SalePage/SaleList";
import AddCupon from "../../components/SalePage/AddCupon";

function SalePage() {
  const [selectedIndex, setSelectedIndex] = useState(1);
  const [refreshSaleList, setRefreshSaleList] = useState(0);

  return (
    <MainLayout>
      <Box sx={{ marginTop: 8 }}>
        <Box>
          <Grid container spacing={1}>
            <Grid item xs={4}>
              <Button
                variant={selectedIndex == 1 ? "contained" : "outlined"}
                size="small"
                fullWidth
                onClick={() => setSelectedIndex(1)}
              >
                Yangi chegirma qo'shish
              </Button>
            </Grid>
            <Grid item xs={4}>
              <Button
                variant={selectedIndex == 2 ? "contained" : "outlined"}
                size="small"
                fullWidth
                onClick={() => setSelectedIndex(2)}
              >
                Mavjud chegirmalar
              </Button>
            </Grid>
            <Grid item xs={4}>
              <Button
                variant={selectedIndex == 3 ? "contained" : "outlined"}
                size="small"
                fullWidth
                onClick={() => setSelectedIndex(3)}
              >
                Kuponlar
              </Button>
            </Grid>
          </Grid>
        </Box>

        <Divider sx={{ marginY: 2 }} />

        <Box sx={{ display: selectedIndex == 1 ? "block" : "none" }}>
          <AddSale setRefreshSaleList={setRefreshSaleList} />
        </Box>
        <Box sx={{ display: selectedIndex == 2 ? "block" : "none" }}>
          <SaleList
            setRefreshSaleList={setRefreshSaleList}
            refreshSaleList={refreshSaleList}
          />
        </Box>
        <Box sx={{ display: selectedIndex == 3 ? "block" : "none" }}>
          <AddCupon/>
        </Box>
      </Box>
    </MainLayout>
  );
}

export default SalePage;
