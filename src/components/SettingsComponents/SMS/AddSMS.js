import {
  Box,
  Button,
  Card,
  Grid,
  Menu,
  MenuItem,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { addSMS, getAllSmsTemplateNames } from "../../../api/SMS";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import HandleSms from "./HandleSms";

function AddSMS() {
  const [text, setText] = useState("");
  const [smsType, setSmsType] = useState();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [tempList, setTempList] = useState([]);
  const [hasChanged, setHasChanged] = useState(0)
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleItemClick = (value) => {
    setAnchorEl(null);
    const newType = '' + value
    setSmsType(newType);
  };

  useEffect(() => {
    const fetchData = async () => {
      const res = await getAllSmsTemplateNames();
      if (res?.success) {
        console.log(res.data);
        setTempList(res.data);
      }
    };

    fetchData();
  }, []);

  const checkSms = () => {
    if (text.trim() == "") {
      alert("Iltimos xabar uchun matn kriting");
      return;
    }

    if (smsType.trim() == "") {
      alert("Iltimos xabar turini tanlang");
      return;
    }

    createNewSms();
  };

  const createNewSms = async () => {
    const sms = {
      smsName: smsType,
      text: text,
    };
    
    const res = await addSMS(sms);
    if (res?.success) {
      setHasChanged(prev => prev + 1)
      setText("");
      setSmsType("");
      alert('Sms xabarnoma yaratildi')
    } else {
        alert('Xatolik')
    }
  };
  return (
    <div className="my-5">
      <Card>
        <Box sx={{ padding: 1 }}>
          <Grid container spacing={2}>
            <Grid item xs={8}>
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                style={{ height: "150px", padding: "10px" }}
                className="w-full border border-gray-600 rounded-sm"
                type="text"
                placeholder="Xabar matnini kriting...."
              />
            </Grid>
            <Grid
              item
              xs={4}
              display={"flex"}
              flexDirection={"column"}
              justifyContent={"space-between"}
            >
              <Box display={"flex"} gap={1}>
                <TextField
                  size="small"
                  fullWidth
                  value={smsType}
                  aria-readonly
                  placeholder="Xabar turi"
                />
                <Button
                  id="basic-button"
                  aria-controls={open ? "basic-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                  onClick={handleClick}
                  variant="contained"
                >
                  <ArrowDropDownIcon />
                </Button>
              </Box>

              <Box display={"flex"} justifyContent={"end"}>
                <Button variant="contained" size="small" onClick={checkSms}>
                  Saqlash
                </Button>
              </Box>
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
              >
                {tempList.map((item, idx) => {
                  return (
                    <MenuItem key={idx} onClick={() => handleItemClick(item)}>
                      {item}
                    </MenuItem>
                  );
                })}
              </Menu>
            </Grid>
          </Grid>
        </Box>
      </Card>

      <Box marginTop={5}>
        <HandleSms hasChanged={hasChanged} setHasChanged={setHasChanged}/>
      </Box>
    </div>
  );
}

export default AddSMS;
