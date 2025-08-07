import React, { useState } from "react";
import {
  addCuponCustomer,
  getAllCuponsCustomer,
  getCustomerByTel,
} from "../../api/CustomersCoupon";
import {
  Box,
  Button,
  FormControl,
  Input,
  InputLabel,
  MenuItem,
  Modal,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import { getAllCupons, getCuponNames } from "../../api/Cupon";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const CustomerCupon = () => {
  const [searchPhone, setSearchPhone] = useState("+998");
  const [customer, setCustomer] = useState(null);
  const [customerCupons, setCustomerCupons] = useState([]);
  const [couponNames, setCouponNames] = useState([]);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    customerTel: "+998",
    couponName: "",
    expireDate: null,
    isActiveCustomerCoupon: true,
  });

  const handlePhoneSearch = async () => {
    const res = await getCustomerByTel(searchPhone);
    if (res?.success && res?.data?.id) {
      setCustomer(res.data);
      const couponRes = await getAllCuponsCustomer(res?.data?.id);
      if (couponRes?.success && typeof couponRes.data !== "string") {
        setCustomerCupons(couponRes.data);
      }
    } else {
      setCustomer(null);
      setCustomerCupons([]);
      alert("Foydalanuvchi topilmadi!");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const tel = form.customerTel;
    const res = await getCustomerByTel(tel);
    if (res?.success && res?.data?.id) {
      const dataToPost = {
        customerId: res.data.id,
        couponName: form.couponName,
        expireDate: form.expireDate || null,
        // expireDate: null,
        isActiveCustomerCoupon: form.isActiveCustomerCoupon,
      };
      console.log(dataToPost);

      const postRes = await addCuponCustomer(dataToPost);
      console.log(postRes);

      if (postRes?.success) {
        alert(postRes?.data?.message);
        setOpen(false);
        setForm({
          customerTel: "+998",
          couponName: "",
          expireDate: null,
          isActiveCustomerCoupon: true,
        });
        // Yangilash
        handlePhoneSearch();
      }
    } else {
      alert("Foydalanuvchi topilmadi!");
    }
  };
  console.log(customerCupons);

  const handleOpenModal = async () => {
    const res = await getAllCupons();
    if (res?.success && Array.isArray(res.data)) {
      // const filtered = res.data.filter((item) => typeof item === "string");
      setCouponNames(res?.data);
    } else {
      setCouponNames([]);
    }
    setOpen(true);
  };

  return (
    <div>
      <Typography variant="h5" mb={2}>
        Mijoz Kuponlari
      </Typography>
      <div className="flex justify-between items-center">
        <div style={{ display: "flex", gap: "10px" }}>
          <TextField
            inputProps={{
              maxLength: 13,
              inputMode: "numeric",
              pattern: "[0-9]*",
            }}
            label="Telefon raqam"
            placeholder="+99890-123-45-67"
            value={searchPhone}
            onChange={(e) => setSearchPhone(e.target.value)}
          />
          <Button
            variant="contained"
            onClick={handlePhoneSearch}
            disabled={searchPhone.length != 13}
          >
            Qidirish
          </Button>
        </div>

        <div>
          <Button onClick={handleOpenModal} variant="contained">
            Yangi Kupon Qo'shish
          </Button>
        </div>
      </div>

      <div className="border shadow-md p-3 flex justify-between gap-3 items-center mt-5">
        <div className="">
          {customerCupons[0]?.customer?.image?.url ? (
            <img
              className="w-20 h-20"
              src={customerCupons[0]?.customer?.image?.url}
            />
          ) : (
            <div className="border flex justify-center items-center w-20 h-20">
              <AccountCircleIcon />
            </div>
          )}
        </div>
        <p>{customerCupons[0]?.customer?.fullName}</p>
        <p>{customerCupons[0]?.customer?.phoneNumber}</p>
        <p>{customerCupons[0]?.customer?.birthDate}</p>
        <p>{customerCupons[0]?.customer?.status?.statusName}</p>
      </div>

      <TableContainer component={Paper} sx={{ mt: 3 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Kupon nomi</TableCell>
              <TableCell>Kupon narxi</TableCell>
              <TableCell>Holati</TableCell>
              <TableCell>Muddati</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {customerCupons?.map((coupon, index) => (
              <TableRow key={index}>
                <TableCell>{coupon.coupon.name}</TableCell>
                <TableCell>
                  {coupon.coupon.credit.toLocaleString("uz-UZ") + " so'm"}
                </TableCell>
                <TableCell>
                  {coupon.coupon.active ? "Aktiv" : "Noaktiv"}
                </TableCell>
                <TableCell>{coupon.expireDate || "Belgilanmagan"}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <Box
          sx={{
            backgroundColor: "white",
            padding: "20px",
            borderRadius: "10px",
            width: "500px",
          }}
        >
          <Typography variant="h6" mb={2}>
            Yangi Kupon Qo'shish
          </Typography>

          <form onSubmit={handleSubmit}>
            <TextField
              // required={false}
              fullWidth
              // inputProps={{
              //   maxLength: 13,
              //   inputMode: "numeric",
              //   pattern: "[0-9]*",
              // }}
              label="Telefon raqam"
              placeholder="+99890-123-45-67"
              value={form.customerTel}
              onChange={(e) =>
                setForm({ ...form, customerTel: e.target.value })
              }
              margin="normal"
            />

            <FormControl required fullWidth margin="normal">
              <InputLabel>Kupon nomi</InputLabel>

              <Select
                value={form.couponName}
                onChange={(e) =>
                  setForm({ ...form, couponName: e.target.value })
                }
              >
                {couponNames.length > 0 ? (
                  couponNames.map((name, idx) => (
                    <MenuItem key={idx} value={name?.enumName}>
                      {name?.name} == {name?.enumName}
                    </MenuItem>
                  ))
                ) : (
                  <MenuItem disabled value="">
                    Kuponlar mavjud emas
                  </MenuItem>
                )}
              </Select>
            </FormControl>

            <TextField
              fullWidth
              margin="normal"
              label="Muddati (ixtiyoriy)"
              type="date"
              InputLabelProps={{ shrink: true }}
              value={form.expireDate || ""}
              onChange={(e) =>
                setForm({ ...form, expireDate: e.target.value || null })
              }
            />

            <FormControlLabel
              control={
                <Checkbox
                  checked={form.isActiveCustomerCoupon}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      isActiveCustomerCoupon: e.target.checked,
                    })
                  }
                />
              }
              label="Aktiv"
            />

            <Button type="submit" variant="contained" fullWidth>
              Qo'shish
            </Button>
          </form>
        </Box>
      </Modal>
    </div>
  );
};

export default CustomerCupon;
