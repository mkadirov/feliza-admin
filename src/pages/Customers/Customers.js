import React, { useState, useEffect } from 'react';
import { Box, Card, Pagination, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import MainLayout from '../../components/Layout/MainLayout'
import { getAllCustomers } from '../../api/Customers';
import FileDownloadIcon from '@mui/icons-material/FileDownload';


function Customers() {
  const [list, setList] = useState([])
  const [totalPages, setTotalPages] = useState(1)
  const [page, setPage] = useState(1)
  const [totalElements, setTotalElements] = useState(0)
  const [search, setSearch] = useState('');
  const [showTodayOnly, setShowTodayOnly] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const res = await getAllCustomers(page);
      if (res?.success) {
        setTotalPages(res.data.totalPages);
        setList(res.data?.content);
        setTotalElements(res.data?.totalElements);
      }
    };

    fetchData();
  }, [page]);

  // bugungi sana
  const today = new Date().toISOString().slice(0, 10);

  // 1. Bugungi mijozlar
  const todayCustomers = list.filter((item) => {
    return item.createdAt?.slice(0, 10) === today;
  });

  // 2. Qidiruv bo'yicha filter
  const searchFilter = list.filter((item) => {
    return item.phoneNumber?.toLowerCase().includes(search.toLowerCase());
  });

  // 3. Ko‘rsatiladigan mijozlar ro‘yxati
  const customersToShow = showTodayOnly ? todayCustomers : (search ? searchFilter : list);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  return (
    <MainLayout>
      <Box>
        {/* Header */}
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          flexWrap="wrap"
          gap={2}
        >
          <Typography variant='h6' sx={{ fontWeight: 'bold' }} style={{
            fontSize: '20px',
            fontWeight: 'bold',
            color: '#333',
            textTransform: 'uppercase',
            letterSpacing: '1px',
            textAlign: 'center',
            marginRight: '10px',
            userSelect: 'none',
          }}>
            Mijozlar ro'yxati: <span className='text-stone-600'>{totalElements}</span>
          </Typography>

          <label className='flex items-center'>
            <input
              type='checkbox'
              checked={showTodayOnly}
              onChange={() => setShowTodayOnly(!showTodayOnly)}
              className='mr-1'
              style={{
                width: '15px',
                height: '15px',
                marginRight: '10px',
                cursor: 'pointer',
              }}
            />
            <span style={{
              fontSize: '14px',
              fontWeight: 'bold',
              color: '#333',
              textTransform: 'uppercase',
              letterSpacing: '1px',
              textAlign: 'center',
              marginRight: '10px',
              cursor: 'pointer',
              userSelect: 'none',
            }}>Bugungi mijozlar</span>
          </label>

          <input
            type="text"
            placeholder="Nomer bo‘yicha qidirish"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full max-w-sm px-4 py-2 transition duration-200 border border-gray-300 shadow-sm rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <a
            href="https://felizabackend.uz/api/customers/export"
            download
            className="inline-flex items-center px-4 py-2 text-white transition duration-200 bg-[rgb(59,171,179)] shadow-md hover:bg-[rgb(49,135,141)] rounded-xl"
          >
            <FileDownloadIcon style={{ marginRight: '8px' }} />
            Yuklab olish
          </a>
        </Box>


        {/* Jadval */}
        <TableContainer component={Paper} sx={{ marginTop: 4 }}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                <TableCell sx={{ maxWidth: '20px', borderRight: '1px solid grey' }}>#</TableCell>
                <TableCell align="left">Ism sharfi</TableCell>
                <TableCell align="right">Telefon raqami</TableCell>
                <TableCell align="right">Tug'ilgan sanasi</TableCell>
                <TableCell align="right">Jinsi</TableCell>
                <TableCell align="right">Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {customersToShow?.map((row, idx) => (
                <TableRow
                  key={row.id}
                  sx={{ cursor: 'pointer', '&:hover': { backgroundColor: '#eeeeee' } }}
                >
                  <TableCell sx={{ maxWidth: 20, borderRight: '1px solid grey' }}>
                    {idx + 1}
                  </TableCell>
                  <TableCell
                    align="left"
                    onClick={() => navigate(`/customers/${row.id}`)}
                    sx={{
                      cursor: 'pointer',
                      fontWeight: '500',
                      '&:hover': { textDecoration: 'underline' },
                    }}
                  >
                    {row.fullName}
                  </TableCell>
                  <TableCell align="right">{row.phoneNumber}</TableCell>
                  <TableCell align="right">{row.birthDate}</TableCell>
                  <TableCell align="right">{row.gender}</TableCell>
                  <TableCell align="right">{row.status?.statusName}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Pagination */}
        <Box display={'flex'} justifyContent={'center'} marginY={3}>
          <Pagination
            count={totalPages}
            variant="outlined"
            shape="rounded"
            onChange={handlePageChange}
          />
        </Box>
      </Box>
    </MainLayout>
  );
}


export default Customers