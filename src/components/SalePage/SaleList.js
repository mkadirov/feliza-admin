import React, {useState, useEffect} from 'react'
import {Box, Table, TableBody} from '@mui/material'
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { deleteSaleGroupByID, getAllSaleGroups } from '../../api/Sale';
import { Delete } from '@mui/icons-material';

function SaleList({setRefreshSaleList, refreshSaleList}) {
    const [list, setList] = useState([])

    useEffect(() => {
        const fetchData = async() => {
            const res = await getAllSaleGroups();
            if(res?.success) {
                console.log(res.data);
                setList(res.data)
            }
        }

        fetchData();
    }, [refreshSaleList])

    const deleteSale = async(id) => {
        const res = await deleteSaleGroupByID(id);
        if(res?.success) {
            setRefreshSaleList(prev => prev + 1)
        }
    }
    

  return (
    <div className="mt-3">
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow sx={{backgroundColor: '#eeeeee'}}>
                    <TableCell sx={{ maxWidth: '30px', borderRight: '1px solid grey'}}>#</TableCell>
                    <TableCell align="center">Chegirma nomi</TableCell>
                    <TableCell align="right">Miqdori (%)</TableCell>
                    <TableCell align="right">Mahsulot guruxlari soni</TableCell>
                    <TableCell align="right">Tuzilgan sana</TableCell>
                    <TableCell align="right">Öchirish</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {list.map((row, idx) => {
                    const date = new Date(row.createdAt);
                    const formattedDate = `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`;
                    return(
                        <TableRow
                          key={row.name}
                        //   sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell sx={{borderRight: '1px solid grey'}}>
                              {idx+1}
                            </TableCell>
                            <TableCell align="center">{row.name}</TableCell>
                            <TableCell align="right">{row.sale}% </TableCell>
                            <TableCell align="right">{row.productList.length}</TableCell>
                            <TableCell align="right">{formattedDate}</TableCell>
                            <TableCell align="right">
                                {
                                    <Delete sx={{cursor: 'pointer'}} onClick = {() => deleteSale(row.id)}/>
                                }
                            </TableCell>
                        </TableRow>
                    )
                  })}
                </TableBody>
            </Table>
        </TableContainer>
    </div>
  )
}

export default SaleList