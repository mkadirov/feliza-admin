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
  Backdrop,
  Box,
  Button,
  Checkbox,
  Fade,
  FormControlLabel,
  MenuItem,
  Modal,
  Select,
  TextareaAutosize,
  TextField,
} from "@mui/material";
import { ChecklistRtl, Close } from "@mui/icons-material";
import {
  addNotificationToAll,
  getNotificationForCustumer,
} from "../../api/Notifications";
import { getAllCollections } from "../../api/LookCollection";
import { getAllSaleGroups } from "../../api/Sale";

const Notafications = () => {
  const [selectedType, setselectedType] = useState("");
  const [reserveSelected, setreserveSelected] = useState([]);
  const [list, setList] = useState([]);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    message: "",
    title: "",
    type: "",
    reserveId: "",
    read: false,
  });
  const [selectedFile, setSelectedFile] = useState(null);

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

  useEffect(() => {
    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "credit" ? +value : value,
    }));
    if (name === "type") {
      setselectedType(value);
    }
  };
  useEffect(() => {
    fetchForType();
  }, [selectedType]);

  const handleCheckbox = (e) => {
    setForm((prev) => ({
      ...prev,
      read: e.target.checked,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await addNotificationToAll(form, selectedFile);

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

      console.log("Create:", form);
    }
  };

  async function fetchForType() {
    if (selectedType == "LookCollection") {
      const res = await getAllCollections();

      if (res.success) {
        setreserveSelected(res.data);
      }
    }
    if (selectedType == "sale") {
      const res = await getAllSaleGroups();

      if (res.success) {
        setreserveSelected(res.data);
      }
    }
    if (selectedType == "user") {
      setreserveSelected([{ id: null, name: "Null" }]);
    }
  }

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
                  key={row.id}
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
                  required
                />
                <input
                  type="file"
                  onChange={handleFileChange}
                  required
                  className="block"
                />

                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={form.type}
                  name="type"
                  label="Type"
                  onChange={handleChange}
                  required
                >
                  <MenuItem value={"sale"}>sale</MenuItem>
                  <MenuItem value={"LookCollection"}>Look Collection</MenuItem>
                  <MenuItem value={"text"}>text</MenuItem>
                </Select>

                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={form.reserveId}
                  name="reserveId"
                  label="ReserveId"
                  onChange={handleChange}
                >
                  {reserveSelected.map((item) => (
                    <MenuItem value={item.id} key={item.id}>
                      <h1 className="space-x-2">
                        <span>{item?.id}</span>
                        <span>{item?.name}</span>
                      </h1>
                    </MenuItem>
                  ))}
                </Select>

                <TextareaAutosize
                  label="Massage"
                  name="message"
                  type="text"
                  className="border-2 border-gray-300 rounded-md p-2"
                  onChange={handleChange}
                  minRows={3}
                  placeholder="Message"
                  required
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
