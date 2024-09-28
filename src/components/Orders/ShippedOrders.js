import React, { useState, useEffect} from 'react';
import {Box, Card, Typography} from '@mui/material'
import {useNavigate} from 'react-router-dom'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function ShippedOrders({shippedOrders}) {
    const navigate = useNavigate();

    let sum = shippedOrders?.reduce((acc, item) => acc + item.orderCost, 0);
    

  return (
    <Box>
        <Card sx={{padding: 2, maxWidth: '500px', marginTop: 7}}>
            <Box display={'flex'} gap={2}>
                <Typography sx={{color: 'grey'}}>
                    Yangi buyurtmalar soni: 
                </Typography>
                <Typography>
                    {shippedOrders?.length}
                </Typography>
            </Box>
            <Box display={'flex'} gap={2}>
                <Typography sx={{color: 'grey'}}>
                    Yangi buyurtmalarning umumiy qiymati: 
                </Typography>
                <Typography>
                    {sum.toLocaleString().replace(/,/g, ' ')} söm
                </Typography>
            </Box>
        </Card>
        <TableContainer component={Paper} sx={{marginTop: 7}}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead >
                <TableRow sx={{backgroundColor: '#f5f5f5'}}>
                  <TableCell sx={{maxWidth: '20px', borderRight: '1px solid grey'}}>#</TableCell>
                  <TableCell align="left">Buyurtma raqami</TableCell>
                  <TableCell align="left">Ism sharfi</TableCell>
                  <TableCell align="right">Telefon raqami</TableCell>
                  <TableCell align="right">Region</TableCell>
                  <TableCell align="right">Summa</TableCell>
                  <TableCell align="right">Sana</TableCell>
                  <TableCell align="right">Tracking number</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {shippedOrders?.map((row, idx) => {
                    const date = new Date(row.createdAt);
                    const formattedDate = `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`;
                    return (
                        <TableRow
                          key={row.id}
                          sx={{cursor: 'pointer', '&:hover' : { backgroundColor: '#eeeeee'}}}
                          onClick = {() => navigate(`/order/${row.id}`)}
                        >
                          <TableCell sx={{maxWidth: 20, borderRight: '1px solid grey'}} component="th" scope="row">
                            {idx +1}
                          </TableCell>
                          <TableCell align="left">{row.orderNumber}</TableCell>
                          <TableCell align="left">{row.customer.fullName}</TableCell>
                          <TableCell align="right">{row.customer.phoneNumber}</TableCell>
                          <TableCell align="right">{row.address.region.nameUZB}</TableCell>
                          <TableCell align="right">{row.orderCost}</TableCell>
                          <TableCell align="right">{formattedDate}</TableCell>
                          <TableCell align="right">{row.postTrackingNumber}</TableCell>
                        </TableRow>
                      )
                    }
                )}
              </TableBody>
            </Table>
        </TableContainer>

        
    </Box>
  )
}

export default ShippedOrders