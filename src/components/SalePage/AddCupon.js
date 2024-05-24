import { Box, Button, Card, Grid, Menu, MenuItem, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { addCupon, getCuponNames } from "../../api/Cupon";
import HandleCupon from "./HandleCupon";

function AddCupon() {
  const [name, setName] = useState("");
  const [cuponName, setCuponName] = useState('')
  const [summa, setSumma] = useState('')
  const [list, setList] = useState([]);
  const [listChanged, setListChanged] = useState(0)
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);


  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleCuponItem = (name) => {
    setCuponName(name);
    setAnchorEl(null);
  }

  useEffect(() => {
    const fetchData = async () => {
      const res = await getCuponNames();

      if(res.success) {
        setList(res?.data)
        console.log(res.data);
      }
    }

    fetchData();
  }, [])

  


  const checkCuponDetail = () => {

    if(cuponName.trim() == '') {
      alert('Iltimos kupon turini tanlang')
      return;
    }

    if(name.trim() =='') {
      alert('Iltimos kupon nomini kriting')
      return;
    }

    if(summa == "") {
      alert('Summa bösh bölishi mumkin emas');
      return
    }
    createCupon()
  }


  const createCupon = async () => {

    const cupon = {
      enumName: cuponName,
      name: name,
      credit: summa,
      active: true
    }
    const res = await addCupon(cupon)

    if(res?.success) {
      console.log('Kupon yaratildi');
      setListChanged(prev => prev + 1)
      setCuponName('')
      setName('')
      setSumma('')
    } else {
      console.log('Xatolik');
    }
  }


  return (
    <div className="mt-3">
      <Card sx={{ padding: 2 }}>
        <Grid container spacing={1}>
          <Grid
            item
            xs={6}
            display={"flex"}
            gap={1}
            sx={{ borderRight: "1px solid grey", paddingRight: 1 }}
          >
            <TextField
              size="small"
              fullWidth
              value={cuponName}
              aria-readonly
              placeholder="Kupon turi"
            />

            <Button 
              variant="contained" 
              size="small"
              onClick={handleClick}
            >
              <ArrowDropDownIcon />
            </Button>
          </Grid>
          <Grid item xs={4} display={"flex"} gap={1}>
            <TextField
              size="small"
              fullWidth
              value={name}
              onChange={(e) => setName(e.target.value)}
              aria-readonly
              placeholder="Kupon nomi"
              type="text"
            />
          </Grid>
          <Grid item xs={2} display={"flex"} gap={1}>
            <TextField
              size="small"
              fullWidth
              value={summa}
              onChange={(e) => setSumma(e.target.value)}
              aria-readonly
              placeholder="Summa"
              type="number"
            />
          </Grid>
        </Grid>

        <Box display={"flex"} justifyContent={"end"} marginTop={1}>
          <Button size="small" variant="contained" onClick={checkCuponDetail}>
            Saqlash
          </Button>
        </Box>
      </Card>

      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        {
          list.map((item, idx) => {
            return(
              <MenuItem key={item + idx} onClick={() => handleCuponItem(item)}>{item}</MenuItem>
            )
          })
        }
      </Menu>

      <HandleCupon listChanged={listChanged} setListChanged={setListChanged}/>
    </div>
  );
}

export default AddCupon;
