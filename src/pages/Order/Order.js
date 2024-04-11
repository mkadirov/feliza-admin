import React, { useEffect, useState } from 'react'
import {Box, Card, Typography, Button, Grid} from '@mui/material'
import {useParams} from 'react-router-dom'
import MainLayout from '../../components/Layout/MainLayout';
import { getOrderById } from '../../api/Orders';
import OrderInfo from '../../components/Order/OrderInfo';
import OrderProductCard from '../../components/Order/OrderProductCard';

function Order() {
    const [order, setOrder] = useState('')
    const {id} = useParams();


    useEffect(() => {
      const fetchData = async() => {
        const res = await getOrderById(id);
        if(res?.success) {
          console.log(res.data);
          setOrder(res.data)
        }
      }
      fetchData();
    }, [id])

    
  return (
    <MainLayout>
        <Card sx={{padding: 2, marginTop: 3}}>

          <OrderInfo order={order}/>

          <Box display={'flex'} justifyContent={'end'} gap={1}>
            <Button variant='contained' size='small' sx={{backgroundColor: 'red', color: 'white', '&:hover': { backgroundColor: '#c62828'}}}>
              Bekor qilish
            </Button>
            <Button size='small' variant='contained'>
              Tayyorlandi
            </Button>
          </Box>
        </Card>

        <Box marginTop={4}>
          <Grid container spacing={2}>
            {
              order?.orderDetailDtos?.map((item, idx) => {
                return (
                  <Grid item xs={12} md={6} key={item.productName + idx}>
                    <OrderProductCard item={item}/>
                  </Grid> 
                )
              })

            }
          </Grid>
        </Box>
    </MainLayout>
  )
}

export default Order