import {
  Box,
  Button,
  Chip,
  Grid,
  Menu,
  MenuItem,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { getRoles } from "../../api/Role";
import { editUser } from "../../api/UsersApi";

function UserModal({tempUser, setHasChanged, closeModal}) {
  const [fullName, setFullName] = useState(tempUser.fullName);
  const [roles, setRoles] = useState(tempUser.roles);
  const [phoneNumber, setPhoneNumber] = useState(tempUser.phoneNumber);
  const [enabled, setEnabled] = useState(tempUser.enabled);
  const [list, setList] = useState([]);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const selectRole = (role) => {
    setAnchorEl(null);
    if (!roles.includes(role)) {
      setRoles([...roles, role]);
    }
  };

  const deleteRole = (role) => {
    setRoles(roles.filter((item) => item.id !== role.id));
  };

  useEffect(() => {
    const fetchData = async () => {
      const res = await getRoles();

      if (res?.success) {
        setList(res.data);
      }
    };

    fetchData();
  }, []);

  const updateUser = async () => {
    const roleIds = roles.map(item => item.id)
    const user = {
        fullName: fullName,
        roleIdList: roleIds,
        active: enabled,
        phoneNumber: phoneNumber

    }
    console.log(user);
    const res = await editUser(tempUser.id, user);
    if(res?.success) {
        setHasChanged(prev => prev + 1)
        closeModal();
    }
  }
  return (
    <div>
        <Box display={"flex"} gap={1} alignItems={"center"}>
        <Switch onChange={() => setEnabled(!enabled)}  checked = {enabled} />
            <Typography>
                Foydalanuvchining statusi:
            </Typography>
            <Typography>
                {enabled? 'Aktiv' : 'Aktiv emas'}
            </Typography>
        
        </Box>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <TextField
            size="small"
            fullWidth
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            aria-readonly
            placeholder="Telefon raqam..."
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            size="small"
            fullWidth
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            aria-readonly
            placeholder="Telefon raqam..."
          />
        </Grid>
      </Grid>

      <Box
        display={"flex"}
        sx={{ border: "1px solid grey", borderRadius: "5px", marginTop: 2 }}
      >
        <Box flexGrow={1} sx={{ display: "flex", gap: 1, alignItems: 'center' }}>
          {roles.map((role, idx) => {
            return (
              <Chip
                key={role.roleName + idx}
                label={role.roleName}
                variant="outlined"
                onDelete={() => deleteRole(role)}
              />
            );
          })}
        </Box>
        <Button variant="contained" onClick={handleClick}>
          <ArrowDropDownIcon />
        </Button>
      </Box>

      <Box display={'flex'} justifyContent={'end'} marginTop={2}>
        <Button variant="contained" size="small" onClick={updateUser}>
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
  );
}

export default UserModal;
