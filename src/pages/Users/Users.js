import React, { useEffect, useState } from "react";
import MainLayout from "../../components/Layout/MainLayout";
import {
  Box,
  Button,
  Card,
  Grid,
  Menu,
  MenuItem,
  TextField,
} from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { getRoles } from "../../api/Role";
import { addUser } from "../../api/UsersApi";
import HandleUser from "../../components/Users/HandleUser";


function Users() {
  const [fullName, setFullName] = useState("");
  const [roleIds, setRoleIds] = useState([]);
  const [roleNames, setRoleNames] = useState([]);
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const [list, setList] = useState([]);
  const [hasChanged, setHasChanged] = useState(0);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const selectRole = (role) => {
    setAnchorEl(null);
    if (!roleNames.includes(role) && !roleIds.includes(role.id)) {
      setRoleNames([...roleNames, role.roleName]);
      setRoleIds([...roleIds, role.id]);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const res = await getRoles();

      if (res?.success) {
        console.log(res.data);
        setList(res.data);
      }
    };

    fetchData();
  }, []);

  const validateInputs = () => {
    return (
      fullName.trim() !== "" &&
      roleIds.length > 0 &&
      roleNames.length > 0 &&
      phone.trim() !== "" &&
      password.trim() !== "" &&
      birthdate !== ""
    );
  };

  const handleSubmit = () => {
    if (validateInputs()) {
        createUser();
      
    } else {
        console.log("Bösh ma'lumot kritilishi mumkin emas");
    }
  };

  const createUser = async () => {
    const userBody = {
      fullName: fullName,
      roles: roleIds,
      birthDate: birthdate,
      phoneNumber: phone,
      password: password,
      enabled: true,
    };
    console.log(userBody);
    const res = await addUser(userBody);
    if (res?.success) {
      setFullName("");
      setRoleIds([]);
      setRoleNames([]);
      setPhone("");
      setPassword("");
      setBirthdate("");
      setHasChanged(prev => prev + 1)
    }
  };

  return (
    <MainLayout>
      <div className="mt-5">
        <Card sx={{ padding: 2 }}>
          <Grid container spacing={1}>
            <Grid item xs={6}>
              <TextField
                size="small"
                fullWidth
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                aria-readonly
                placeholder="Ism familiyasi"
              />
            </Grid>
            
            <Grid item xs={3}>
              <TextField
                size="small"
                fullWidth
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                aria-readonly
                placeholder="Telefon raqam..."
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                size="small"
                fullWidth
                value={birthdate}
                onChange={(e) => setBirthdate(e.target.value)}
                aria-readonly
                type="date"
              />
            </Grid>
          </Grid>

          <Grid container spacing={1} marginTop={1}>
            <Grid item xs={3}>
              <TextField
                size="small"
                fullWidth
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                aria-readonly
                placeholder="Parol"
              />
            </Grid>
            <Grid item xs={9}>
              <Box display={"flex"} gap={1}>
                <TextField
                  size="small"
                  fullWidth
                  value={roleNames}
                  aria-readonly
                  placeholder="Rollar.."
                />

                <Button variant="contained" size="small" onClick={handleClick}>
                  <ArrowDropDownIcon />
                </Button>
              </Box>
            </Grid>
          </Grid>

          <Box display={"flex"} justifyContent={"end"} marginTop={2}>
            <Button variant="contained" size="small" onClick={handleSubmit}>
              Saqlash
            </Button>
          </Box>
        </Card>

        <HandleUser hasChanged={hasChanged} setHasChanged={setHasChanged}/>

        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          {list.map((item, idx) => {
            return (
              <MenuItem
                key={item.roleName + idx}
                onClick={() => selectRole(item)}
              >
                {item.roleName}
              </MenuItem>
            );
          })}
        </Menu>
      </div>
    </MainLayout>
  );
}

export default Users;
