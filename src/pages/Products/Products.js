import { useEffect, useRef, useState } from "react";
import MainLayout from "../../components/Layout/MainLayout";
import {
  Box,
  Button,
  Chip,
  Divider,
  Modal,
  Pagination,
  Popover,
  styled,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import AddIcon from "@mui/icons-material/Add";
import { Delete, Download, Edit, Search } from "@mui/icons-material";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import {
  deleteProduct,
  editProduct,
  getAllActiveProducts,
  getAllProducts,
  getProductByRefNumber,
} from "../../api/Product";

function Products() {
  const [selectId, setselectId] = useState(null);
  const [selectedModalImg, setSelectedModalImg] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [activePage, setActivePage] = useState(1);
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [productsActive, setProductsActive] = useState([]);
  const [page, setPage] = useState(searchParams.get("page"));
  const [articulNumber, setArticulNumber] = useState("");
  const [numberOfPages, setNumberOfPages] = useState(1);
  const [numberOfPagesActive, setNumberOfPagesActive] = useState(1);
  const [totalElements, setTotalElements] = useState(0);
  const [totalElementsActive, setTotalElementsActive] = useState(0);
  const [selectedRow, setSelectedRow] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorElDelete, setAnchorElDelete] = useState(null);
  const [pendingValue, setPendingValue] = useState(null);
  const switchRef = useRef(null);
  const [open, setOpen] = useState(false);
  const StyledChip = styled(Chip)({
    "&.activeChip": {
      backgroundColor: grey[400],
    },
  });

  useEffect(() => {
    const currentPage = parseInt(searchParams.get("page") || 1);
    setPage(currentPage);
  }, [searchParams]);

  async function fetchData() {
    const res = await getAllProducts(page - 1);
    if (res?.success) {
      console.log(res?.data);
      setProducts(res?.data?.content);
      setNumberOfPages(res?.data?.totalPages);
      setTotalElements(res?.data?.totalElements);
    }
  }
  async function fetchDataActiveProducts() {
    const res = await getAllActiveProducts(page);
    if (res?.success) {
      console.log(res?.data);
      setProductsActive(res?.data?.content);
      setNumberOfPagesActive(res?.data?.totalPages);
      setTotalElementsActive(res?.data?.totalElements);
    }
  }
  useEffect(() => {
    fetchData();
    fetchDataActiveProducts();
  }, [page, activePage, totalElements]);

  const findProducts = async () => {
    const res = await getProductByRefNumber(articulNumber);

    if (res?.success) {
      setProducts(res.data);
    } else {
      alert("Bunday Artikl raqam bilan mahsulotlar mavjud emas");
    }
  };

  const handlePageChange = (event, value) => {
    setPage(value);
    setSearchParams({ page: value });
  };

  const handleToggleRequest = (e) => {
    const nextValue = e.target.checked;
    setPendingValue(nextValue);
    setAnchorEl(switchRef.current);
  };

  const handleConfirm = async (row) => {
    const res = await editProduct(row.id, {
      nameUZB: row.nameUZB,
      nameRUS: row.nameRUS,
      descriptionUZB: row.descriptionUZB,
      descriptionRUS: row.descriptionRUS,
      sellPrice: row.sellPrice,
      brandId: row.brand.id,
      categoryId: row.category.map((item) => item.id),
      colorId: row.color.id,
      productSizeVariantDtoList: row.productSizeVariantList,
      ikpuNumber: row.ikpunumber,
      mxikNumber: row.mxiknumber,
      active: pendingValue,
    });

    if (res.success) {
      fetchData();
    }

    setAnchorEl(null);
  };

  const currentProducts = activePage == 1 ? products : productsActive;

  return (
    <MainLayout>
      <div className="mt-3">
        <div className="py-4 flex gap-2 justify-between items-center align-middle">
          <div className="space-x-2">
            <StyledChip
              className={activePage == 1 ? "activeChip" : "inactiveChip"}
              label={`Barcha mahsulotlar(${totalElements})`}
              onClick={() => {
                setActivePage(1);
                setSearchParams({ page: 1 });
              }}
            />
            <StyledChip
              className={activePage == 2 ? "activeChip" : "inactiveChip"}
              label={`Aktiv(${totalElementsActive})`}
              onClick={() => {
                setActivePage(2);
                setSearchParams({ page: 1 });
              }}
            />
          </div>
          <Link to={"https://felizabackend.uz/api/export/exportProducts"}>
            <Button variant="contained" startIcon={<Download />}>
              Yuklab olish
            </Button>
          </Link>
        </div>

        <Divider />

        <div className="mt-4 flex gap-2" style={{ height: "50px" }}>
          <div className="w-full rounded-md bg-gray-300 h-full flex pl-4 overflow-hidden">
            <div className="flex justify-center items-center">
              <Search />
            </div>
            <input
              style={{ flex: 1 }}
              type="text"
              className="main-input"
              value={articulNumber}
              onChange={(e) => setArticulNumber(e.target.value)}
              placeholder="Mahsulotni artikul raqami"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  findProducts();
                }
              }}
            />
          </div>
          <div className="rounded-md bg-gray-300 h-full flex ">
            <Button onClick={() => findProducts()}>Qidirish</Button>
          </div>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => navigate("/addproduct")}
          >
            Qo'shish
          </Button>
        </div>

        <TableContainer>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell width={20} align="left">
                  ID
                </TableCell>
                <TableCell width={20} align="left">
                  Color
                </TableCell>
                <TableCell width={100}>Img</TableCell>
                <TableCell>Name Uz</TableCell>
                <TableCell align="left">Ref</TableCell>
                <TableCell align="left">Status</TableCell>
                <TableCell align="left">Category</TableCell>
                <TableCell align="left">Brand</TableCell>
                <TableCell align="left">Sell</TableCell>
                <TableCell align="left">Sizes</TableCell>
                <TableCell width={10} align="justify">
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {currentProducts?.map((row) => (
                <TableRow
                  key={row.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="justify" component="th" scope="row">
                    {row.id}
                  </TableCell>
                  <TableCell align="left">
                    <Tooltip title={row.color.nameUZB} placement="top-start">
                      <Box display="flex" alignItems="center" gap={2}>
                        <Box
                          sx={{
                            width: 24,
                            height: 24,
                            borderRadius: 1,
                            backgroundColor: row.color.colorCode,
                            border: "1px solid #ccc",
                            cursor: "pointer",
                          }}
                        />
                      </Box>
                    </Tooltip>
                  </TableCell>
                  <TableCell align="right">
                    <img
                      onClick={() => {
                        setSelectedModalImg(row?.productImages);
                        setOpen(true);
                      }}
                      src={row?.productImages[0].url}
                      className="w-28 h-24 rounded hover:scale-150 cursor-zoom-in"
                    />

                    <Modal
                      open={open}
                      onClose={() => setOpen(false)}
                      aria-labelledby="modal-modal-title"
                      aria-describedby="modal-modal-description"
                      BackdropProps={{
                        sx: {
                          backgroundColor: "rgba(0, 0, 0, 0.1)",
                        },
                      }}
                    >
                      <Box
                        sx={{
                          position: "absolute",
                          top: "50%",
                          left: "50%",
                          transform: "translate(-50%, -50%)",
                          width: 1400,
                          bgcolor: "background.paper",
                          backgroundColor: "white",
                          background: "#fff",
                          border: "2px solid #000",
                          boxShadow: 10,
                          p: 2,
                          display: "flex",
                          flexDirection: "row",
                          flexWrap: "wrap",
                          justifyContent: "center",

                          gap: 1,
                        }}
                      >
                        {selectedModalImg.map((item) => (
                          <img
                            key={item.id}
                            src={item.url}
                            className="w-1/5 object-contain bg-gray-400 max-h-96 rounded hover:scale-150 cursor-zoom-in"
                          />
                        ))}
                      </Box>
                    </Modal>
                  </TableCell>
                  <TableCell align="left" component="th" scope="row">
                    {row.nameUZB}
                  </TableCell>
                  <TableCell align="left">{row.referenceNumber}</TableCell>
                  <TableCell align="left">
                    <p
                      style={{
                        color: row?.active ? "green" : "red",
                      }}
                    >
                      {row?.active ? "active" : "noactive"}
                    </p>

                    <Switch
                      defaultChecked={row.active}
                      onChange={handleToggleRequest}
                      value={row.avtive}
                      color={row.active ? "primary" : "error"}
                      inputRef={switchRef}
                      checked={row.active}
                      onClick={() => setSelectedRow(row)}
                    />

                    <Popover
                      align="center"
                      className="fixed top-0 left-0  -translate-y-1/2 translate-x-0 p-6 rounded-lg  z-50"
                      open={Boolean(anchorEl)}
                      anchorEl={anchorEl}
                      onClose={() => {
                        setPendingValue(null);
                        setAnchorEl(null);
                      }}
                      anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "left",
                      }}
                    >
                      <Box p={2}>
                        <Typography mb={1}>
                          Rostdan ham mahsulotni{" "}
                          {pendingValue
                            ? "faollashtirmoqchimisiz"
                            : "faolsizlantirmoqchimisiz"}
                          ?
                        </Typography>
                        <Box display="flex" justifyContent="flex-end" gap={1}>
                          <Button
                            size="small"
                            onClick={() => {
                              setPendingValue(null);
                              setAnchorEl(null);
                            }}
                          >
                            Yo‘q
                          </Button>
                          <Button
                            size="small"
                            variant="contained"
                            onClick={() => {
                              if (selectedRow) {
                                handleConfirm(selectedRow);
                              }
                            }}
                          >
                            Ha
                          </Button>
                        </Box>
                      </Box>
                    </Popover>
                  </TableCell>
                  <TableCell align="left">
                    <Tooltip
                      title={row.category.map((item) => (
                        <p
                          className="px-3 font-bold text-base border-b"
                          key={item.id}
                        >
                          {item.nameUZB}: {item.parentCategoryUZ}
                        </p>
                      ))}
                      placement="top-start"
                    >
                      {row.category[0].nameUZB}
                      {row.category.length > 1 && (
                        <span className="text-gray-400">
                          {" "}
                          +{row.category.length - 1}
                        </span>
                      )}
                    </Tooltip>
                  </TableCell>
                  <TableCell align="left">{row.brand.name}</TableCell>
                  <TableCell align="left">{row.sellPrice}</TableCell>
                  <TableCell align="left">
                    <Tooltip
                      title={row?.productSizeVariantList?.map((item) => (
                        <p
                          className="px-3 font-bold text-base border-b"
                          key={item.id}
                        >
                          {item?.size}: {item?.quantity}
                        </p>
                      ))}
                      placement="top-start"
                    >
                      {row?.productSizeVariantList[0]?.size}
                      {row.productSizeVariantList.length > 1 && (
                        <span className="text-gray-400">
                          {" "}
                          +{row.productSizeVariantList.length - 1}
                        </span>
                      )}
                    </Tooltip>
                  </TableCell>
                  <TableCell align="left">
                    <Box display={"flex"} justifyContent={"end"} gap={1}>
                      <Edit
                        className="cursor-pointer"
                        onClick={() => navigate(`/product/${row.id}`)}
                      />
                      <button
                        style={{
                          color: "red",
                          padding: 0,
                          margin: 0,
                        }}
                        onClick={(e) => {
                          setAnchorElDelete(e.currentTarget);
                          setselectId(row.id);
                        }}
                      >
                        <Delete />
                      </button>

                      <Popover
                        open={Boolean(anchorElDelete)}
                        anchorEl={anchorElDelete}
                        onClose={() => setAnchorElDelete(null)}
                        anchorOrigin={{
                          vertical: "bottom",
                          horizontal: "left",
                        }}
                        transformOrigin={{
                          vertical: "top",
                          horizontal: "left",
                        }}
                      >
                        <Box p={2}>
                          <Typography mb={1}>
                            Rostdan ham shu mahsulotni o'chirmoqchimisiz?{" "}
                            {selectId}
                          </Typography>
                          <Box display="flex" justifyContent="flex-end" gap={1}>
                            <Button
                              size="small"
                              onClick={() => {
                                setAnchorElDelete(null);
                              }}
                            >
                              Yo‘q
                            </Button>
                            <Button
                              size="small"
                              variant="contained"
                              onClick={async () => {
                                const res = await deleteProduct(selectId);
                                if (res.success) {
                                  console.log("Mahsulot öchirildi");
                                  setAnchorElDelete(null);
                                  fetchData();
                                }
                              }}
                            >
                              Ha
                            </Button>
                          </Box>
                        </Box>
                      </Popover>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Box marginY={3} display={"flex"} justifyContent={"center"}>
          <Pagination
            count={activePage == 1 ? numberOfPages : numberOfPagesActive}
            page={+page}
            variant="outlined"
            shape="rounded"
            onChange={handlePageChange}
          />
        </Box>
      </div>
    </MainLayout>
  );
}

export default Products;
