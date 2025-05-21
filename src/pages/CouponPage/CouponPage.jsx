import { useEffect, useState } from "react";
import MainLayout from "../../components/Layout/MainLayout";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import {
  getAllCupons,
  getCuponNames,
  deleteCoupon,
  addCupon,
  editCupon,
} from "../../api/Cupon";
import {
  Backdrop,
  Box,
  Button,
  Checkbox,
  Fade,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  TextField,
} from "@mui/material";
import { Close, Delete, Edit } from "@mui/icons-material";

const CouponPage = () => {
  const [list, setList] = useState([]);
  const [byName, setByName] = useState([]);
  const [open, setOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [form, setForm] = useState({
    enumName: "",
    name: "",
    credit: "",
    active: false,
  });

  async function fetchData() {
    const res = await getAllCupons();
    if (res?.success) {
      setList(res?.data);
    }
  }

  const getCouponByName = async (name) => {
    const res = await getCuponNames(name);
    if (res?.success) {
      setByName(res?.data);
    }
  };
  useEffect(() => {
    fetchData();
    getCouponByName("w");
  }, []);
  console.log(list);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "credit" ? +value : value,
    }));
  };

  const handleCheckbox = (e) => {
    setForm((prev) => ({
      ...prev,
      active: e.target.checked,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isEdit) {
      const res = await editCupon(form.enumName, form);
      if (res?.success) {
        fetchData();
      }
    } else {
      const res = await addCupon(form);
      if (res?.success) {
        fetchData();
      }

      console.log("Create", form);

      //   console.log(form);
    }
  };

  const handleDelete = async (id) => {
    const res = await deleteCoupon(id);
    if (res?.success) {
      fetchData();
    }
  };
  return (
    <MainLayout>
      <div className="space-y-3">
        <Box display={"flex"} justifyContent={"end"}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              setOpen(true);
              setForm({
                enumName: "",
                name: "",
                credit: "",
                active: false,
              });
            }}
          >
            Create
          </Button>
        </Box>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell width={10}>ENUM Name</TableCell>
                <TableCell align="right">Credit</TableCell>
                <TableCell align="right">Status</TableCell>
                <TableCell width={10} align="center">
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {list.map((row) => (
                <TableRow
                  key={row.name}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {row.enumName}
                  </TableCell>
                  <TableCell align="right">{row.credit}</TableCell>
                  <TableCell align="right">
                    {row.active ? "active" : "noactive"}
                  </TableCell>

                  <TableCell align="right">
                    <Box className="space-x-2" display={"flex"}>
                      <Edit
                        className="cursor-pointer"
                        onClick={() => {
                          setOpen(true);
                          setIsEdit(true);
                          setForm({
                            enumName: row.enumName,
                            name: row.name,
                            credit: row.credit,
                            active: row.active,
                          });
                        }}
                      />
                      <Delete className="cursor-pointer hover:text-red-500" onClick={() => handleDelete(row.id)} />
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={open}
          onClose={(_, reason) => {
            if (reason !== "backdropClick") {
              setOpen(false);
            }
          }}
          closeAfterTransition
          slots={{ backdrop: Backdrop }}
          slotProps={{
            backdrop: {
              timeout: 500,
            },
          }}
        >
          <Fade in={open}>
            <Box
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                bgcolor: "background.paper",
                border: "2px solid #000",
                boxShadow: 24,
                p: 4,
                pt: 5,
              }}
            >
              <Close
                style={{
                  position: "absolute",
                  right: 0,
                  top: 0,
                  padding: 0,
                  margin: 5,
                  paddingInline: 0,
                  cursor: "pointer",
                  background: "red",
                  color: "white",
                  borderRadius: 5,
                }}
                onClick={() => setOpen(false)}
              />

              <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 2,
                  width: 400,
                }}
              >
                <FormControl fullWidth>
                  <InputLabel id="enum-select-label">Enum Name</InputLabel>
                  <Select
                    labelId="enum-select-label"
                    name="enumName"
                    value={form.enumName}
                    label="Enum Name"
                    onChange={handleChange}
                  >
                    {byName.map((item) => (
                      <MenuItem key={item} value={item}>
                        {item.replace(/_/g, " ")}{" "}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <TextField
                  label="Name"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                />

                <TextField
                  label="Credit"
                  name="credit"
                  type="number"
                  value={form.credit}
                  onChange={handleChange}
                />

                <FormControlLabel
                  control={
                    <Checkbox checked={form.active} onChange={handleCheckbox} />
                  }
                  label="Active"
                />

                <Button type="submit" variant="contained" color="primary">
                  Saqlash
                </Button>
              </Box>
            </Box>
          </Fade>
        </Modal>
      </div>
    </MainLayout>
  );
};

export default CouponPage;
