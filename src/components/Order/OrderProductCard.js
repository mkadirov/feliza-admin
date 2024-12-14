import React from 'react'
import {Card, Box, Typography, Grid} from '@mui/material'

function OrderProductCard({item}) {

  console.log(item);
  
  return (
    <Card sx={{padding: 2}}>
         
        <Grid container spacing={1}>
            <Grid item xs={4}>
                <Box sx={{height: {xs: '240px', xl: '320px'}}}>
                    <img src={item.productImages[0]?.url} alt="" />
                </Box>
            </Grid>
            <Grid item xs={8}>
                <Box display={'flex'} gap={1}>
                    <Typography sx={{ color: "grey" }}>Mahsulot nomi:</Typography>

                    <Typography>{item?.productName}</Typography>
                </Box>
                <Box display={'flex'} gap={1}>
                    <Typography sx={{ color: "grey" }}>Narxi:</Typography>

                    <Typography>{item?.sellPrice} söm</Typography>
                </Box>
                <Box display={'flex'} gap={1}>
                    <Typography sx={{ color: "grey" }}>Barcode:</Typography>

                    <Typography>{item?.productSizeVariant?.barCode}</Typography>
                </Box>
                <Box display={'flex'} gap={1} marginTop={3} alignItems={'center'}>
                    <Typography sx={{ color: "grey" }}>Ölchami:</Typography>

                    <Typography fontSize={22} fontWeight={'bold'}>{item?.productSizeVariant?.size}</Typography>
                </Box>
                <Box display={'flex'} gap={1}  alignItems={'center'}>
                    <Typography sx={{ color: "grey" }}>Soni:</Typography>

                    <Typography fontSize={22} fontWeight={'bold'}>{item?.quantity}</Typography>
                </Box>
            </Grid>
        </Grid>
         
    </Card>
  )
}

export default OrderProductCard