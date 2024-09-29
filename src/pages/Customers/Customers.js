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
import MainLayout from '../../components/Layout/MainLayout'
import { getAllCustomers } from '../../api/Customers';

function Customers() {
  const [list, setList] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const res = await getAllCustomers();
      if(res?.success) {
        console.log(res.data);
        
        setList(res.data?.content)
      }
    }

    fetchData();
  }, [])
  return (
    <MainLayout>
       <Box>
       
        <TableContainer component={Paper} sx={{marginTop: 7}}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead >
                <TableRow sx={{backgroundColor: '#f5f5f5'}}>
                  <TableCell sx={{maxWidth: '20px', borderRight: '1px solid grey'}}>#</TableCell>
                  <TableCell align="left">Ism sharfi</TableCell>
                  <TableCell align="right">Telefon raqami</TableCell>
                  <TableCell align="right">Tug'ilgan sanasi</TableCell>
                  <TableCell align="right">Jinsi</TableCell>
                  <TableCell align="right">Status</TableCell>
                  
                </TableRow>
              </TableHead>
              <TableBody>
                {list?.map((row, idx) => {
                    
                    return (
                        <TableRow
                          key={row.id}
                          sx={{cursor: 'pointer', '&:hover' : { backgroundColor: '#eeeeee'}}}
                          
                        >
                          <TableCell sx={{maxWidth: 20, borderRight: '1px solid grey'}} component="th" scope="row">
                            {idx +1}
                          </TableCell>
                          <TableCell align="left">{row.fullName}</TableCell>
                          <TableCell align="right">{row.phoneNumber}</TableCell>
                          <TableCell align="right">{row.birthDate}</TableCell>
                          <TableCell align="right">{row.gender}</TableCell>
                          <TableCell align="right">{row.status?.statusName}</TableCell>
                          
                        </TableRow>
                      )
                    }
                )}
              </TableBody>
            </Table>
        </TableContainer>

        
    </Box>
    </MainLayout>
  )
}

export default Customers