import { Box } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Delete } from '@mui/icons-material';

function HandelSaleList({list, sale, deleteSaleProduct}) {

    

  return (
    <Box marginTop={3}>
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>#</TableCell>
                <TableCell align="right">Article nomer</TableCell>
                <TableCell align="center">Foto</TableCell>
                <TableCell align="right">Ranglar soni</TableCell>
                <TableCell align="right">Chegirma (%)</TableCell>
                <TableCell align="right">Narxi</TableCell>
                <TableCell align="right">Sale narxi</TableCell>
                <TableCell align="right">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {list?.map((row, idx) => {
                const product = row?.list[0]
                return (
                    <TableRow
                        key={row.refNumber}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell align='left'>
                        {idx + 1}
                      </TableCell>
                      <TableCell align="right">{row.refNumber}</TableCell>
                      <TableCell align='right'>
                        <Box display={'flex'} justifyContent={'center'}>
                        <Box className = 'global-mage-box' sx={{width: '40px', height: '80px'}}>
                            <img src={product?.productImages[0]?.url} alt="" />
                        </Box>
                        </Box>

                      </TableCell>
                      <TableCell align="right">{row?.list?.length}</TableCell>
                      <TableCell align="right">{sale}</TableCell>
                      <TableCell align="right">{product?.sellPrice}</TableCell>
                      <TableCell align="right">{product.sellPrice * ((100-sale)/100)}</TableCell>
                      <TableCell align="right">
                        {<Delete onClick = {() => deleteSaleProduct(row.refNumber)}/>}
                      </TableCell>
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

export default HandelSaleList