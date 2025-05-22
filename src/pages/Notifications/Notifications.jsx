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
import { ChecklistRtl, Close, Delete, Edit } from "@mui/icons-material";
import {
  addNotificationToAll,
  getNotificationForCustumer,
} from "../../api/Notifications";
import { getAllCustomers } from "../../api/Customers";
import { Link } from "react-router-dom";

const Notafications = () => {
  const [userSelected, setuserSelected] = useState("");
  const [list, setList] = useState([]);
  const [userList, setuserList] = useState([]);
  const [byName, setByName] = useState([]);
  const [open, setOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [form, setForm] = useState({
    message: "",
    title: "",
    type: "",
    reserveId: "",
    read: false,
  });
  const [selectedFile, setSelectedFile] = useState(null);
  // const [loading, setLoading] = useState(false);

  // Handle file select
  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };
  async function fetchData() {
    const res = await getNotificationForCustumer(
      "1d37f0d2-6cb2-4e75-9982-cd9fea0556af"
    );
    if (res?.success) {
      setList(res?.data);
    }
  }
  async function fetchAllUsers() {
    const res = await getAllCustomers(1);
    if (res?.success) {
      setuserList(res?.data);
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
    fetchAllUsers();
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
      read: e.target.checked,
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
      const res = await addNotificationToAll(form, selectedFile);
      console.log(form);

      if (res?.success) {
        fetchData();
        setOpen(false);
        setForm({
          message: "",
          title: "",
          type: "",
          reserveId: "",
          read: false,
        });
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

  console.log(userList);

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
                message: "",
                title: "",
                type: "",
                reserveId: "",
                read: false,
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
                <TableCell>ReserveId</TableCell>
                <TableCell>Title</TableCell>
                <TableCell width={10}>Message</TableCell>
                <TableCell align="right">Type</TableCell>
                <TableCell align="right">Created At</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {list.map((row) => (
                <TableRow
                  key={row.name}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    <p
                      style={{
                        fontWeight: "bold",
                      }}
                    >
                      {row.reserveId}
                    </p>
                  </TableCell>
                  <TableCell component="th" scope="row">
                    <p
                      style={{
                        fontWeight: "bold",
                      }}
                    >
                      {row.title} {row.read && <ChecklistRtl />}
                    </p>
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {row.message}
                  </TableCell>
                  <TableCell align="right">{row.type}</TableCell>
                  <TableCell align="right">
                    {row.createdAt.split("T")[0]}
                  </TableCell>

                  {/* <TableCell align="right">
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
                      <Delete
                        className="cursor-pointer hover:text-red-500"
                        onClick={() => handleDelete(row.id)}
                      />
                    </Box>
                  </TableCell> */}
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
                <TextField
                  label="Title"
                  name="title"
                  // value={form.name}
                  onChange={handleChange}
                />
                <input
                  type="file"
                  onChange={handleFileChange}
                  required
                  className="block"
                />

                <TextField
                  label="Reserveid"
                  name="reserveId"
                  type="number"
                  // value={form.credit}
                  onChange={handleChange}
                />
                <TextField
                  label="Massage"
                  name="message"
                  type="text"
                  // value={form.credit}
                  onChange={handleChange}
                />
                <TextField
                  label="Type"
                  name="type"
                  type="text"
                  // value={form.credit}
                  onChange={handleChange}
                />

                <FormControlLabel
                  control={
                    <Checkbox
                      defaultValue={false}
                      onChange={handleCheckbox}
                      style={{
                        display: "none",
                      }}
                    />
                  }
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

export default Notafications;
