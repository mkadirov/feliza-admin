import React, { useEffect, useState } from "react";
import MainLayout from "../../components/Layout/MainLayout";
import {
  Box,
  Button,
  Chip,
  Divider,
  Grid,
  Pagination,
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
import Paper from "@mui/material/Paper";
import { grey } from "@mui/material/colors";
import AddIcon from "@mui/icons-material/Add";
import { Delete, Edit, Search } from "@mui/icons-material";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  deleteProduct,
  editProduct,
  getAllProducts,
  getProductByRefNumber,
} from "../../api/Product";
import ProductMainCard from "../../components/Cards/ProductMainCard";

function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [activePage, setActivePage] = useState(1);
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState("");
  const [page, setPage] = useState(searchParams.get("page"));
  const [articulNumber, setArticulNumber] = useState("");
  const [numberOfPages, setNumberOfPages] = useState(1);
  const [totalElements, setTotalElements] = useState(0);

  const StyledChip = styled(Chip)({
    "&.activeChip": {
      backgroundColor: grey[400],
    },
  });

  // Sahifa raqami URL dan o'qiladi (Back bosilganda)
  useEffect(() => {
    const currentPage = parseInt(searchParams.get("page"));
    setPage(currentPage);
  }, [searchParams]);

  useEffect(() => {
    async function fetchData() {
      const res = await getAllProducts(page);
      if (res?.success) {
        console.log(res?.data);
        setProducts(res?.data?.content);
        setNumberOfPages(res?.data?.totalPages);
        setTotalElements(res?.data?.totalElements);
      }
    }
    fetchData();
  }, [page]);

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
    setSearchParams({ page: value }); // URL yangilanadi
  };
  console.log(page);

  return (
    <MainLayout>
      <div className="mt-12 ">
        <div className="py-4 flex gap-2">
          <StyledChip
            className={activePage == 1 ? "activeChip" : "inactiveChip"}
            label={`Barcha mahsulotlar(${totalElements})`}
            onClick={() => setActivePage(1)}
          />
          <StyledChip
            className={activePage == 2 ? "activeChip" : "inactiveChip"}
            label="Aktiv(0)"
            onClick={() => setActivePage(2)}
          />
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

        {/* <Grid container sx={{ marginTop: 3 }} spacing={2}>
          {products?.map((item, index) => {
            return (
              <Grid
                item
                xs={6}
                md={4}
                lg={4}
                xl={3}
                key={index}
                className="mt-2"
              >
                <ProductMainCard item={item} setNewProduct={setNewProduct} />
              </Grid>
            );
          })}
        </Grid> */}

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
              {products?.map((row) => (
                <TableRow
                  key={row.name}
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
                      src={row?.productImages[0].url}
                      className="w-14 h-12 rounded hover:scale-150 cursor-zoom-in"
                    />
                  </TableCell>
                  <TableCell align="left" component="th" scope="row">
                    {row.nameUZB}
                  </TableCell>
                  <TableCell align="left">{row.referenceNumber}</TableCell>
                  {/* <TableCell align="left">{row?.category[0].nameUZB}</TableCell> */}
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
                      onChange={async (e) => {
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
                          active: e.target.checked,
                        });
                        if (res.success) {
                          console.log("Mahsulot statusi özgartirildi");
                          setNewProduct(row);
                        }

                        console.log({
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
                          active: e.target.checked,
                        });
                        console.log(e.target.checked);
                      }}
                      value={row.avtive}
                      color={row.active ? "primary" : "error"}
                    />
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
                      title={row.productSizeVariantList.map((item) => (
                        <p
                          className="px-3 font-bold text-base border-b"
                          key={item.id}
                        >
                          {item.size}: {item.quantity}
                        </p>
                      ))}
                      placement="top-start"
                    >
                      {row.productSizeVariantList[0].size}
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
                        onClick={async () => {
                          const res = await deleteProduct(row.id);

                          if (res.success) {
                            console.log("Mahsulot öchirildi");
                            setNewProduct(row);
                          }
                        }}
                      >
                        <Delete />
                      </button>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Box marginY={3} display={"flex"} justifyContent={"center"}>
          <Pagination
            count={numberOfPages}
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
