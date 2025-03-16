import React, { useContext, useEffect, useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import MyContext from "../../Context/MyContext";
import Menu1Settings from "./Menu1Settings";
import Menu2Settings from "./Menu2Settings";
import SmallSliderPlacement from "./SmallSliderPlacement";

function ContainerSettings() {
  
  return (
    <Box>
      <Menu1Settings/>
      <Menu2Settings/>
      <SmallSliderPlacement/>
    </Box>
  );
}

export default ContainerSettings;
