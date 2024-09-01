import React, { useState } from "react";
import { Button, Grid, Typography } from "@mui/material";

function ProductSizeContainer({ sizes, setSizes }) {

  function addQuantity(e, s) {
    const quantity = e.target.value;

    setSizes((prevData) =>
      prevData.map((item) =>
        item.size == s ? { ...item, quantity: quantity } : item
      )
    );
  }

  function addBarcode(barCode, s) {
    setSizes((prevData) =>
      prevData.map((item) =>
        item.size == s
          ? { ...item, barCode: barCode }
          : item
      )
    );
  }

  return (
    <div>
      {sizes.map((sizeItem) => {
        
        return (
          <div key={sizeItem.size} className="input-container pl-3 mt-3 ">
            <div className="flex w-full">
              <div
                className="flex items-center "
                style={{ width: "150px", height: "40px" }}
              >
                <Typography>{sizeItem.size}</Typography>
              </div>

              <div className="flex-1">
                <Grid container spacing={2} pr={2}>
                  <Grid item xs={6}>
                    <div
                      className="flex pl-2 bg-gray-200 rounded-xl"
                      style={{ height: "40px" }}
                    >
                      <div className="w-full">
                        <input
                          type="text"
                          className="main-input"
                          placeholder="Barcode..."
                          value={
                            sizeItem?.barCode !== undefined
                              ? sizeItem.barCode
                              : ""
                          }
                          onChange={(e) => addBarcode(e.target.value, sizeItem.size)}
                        />
                      </div>
                    </div>
                  </Grid>
                  <Grid item xs={6}>
                    <div
                      className="flex pl-2 bg-gray-200 rounded-xl"
                      style={{ height: "40px" }}
                    >
                      <div className="w-full">
                        <input
                          type="number"
                          className="main-input "
                          placeholder="Mahsulot soni..."
                          value={
                            sizeItem?.quantity !== undefined ? sizeItem.quantity : 0
                          }
                          onChange={(e) => addQuantity(e, sizeItem.size)}
                        />
                      </div>
                    </div>
                  </Grid>
                </Grid>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default ProductSizeContainer;
