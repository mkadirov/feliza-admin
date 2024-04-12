import React, { useEffect, useState } from 'react'
import {Box, Card, Typography, Button, Grid} from '@mui/material'
import {useParams} from 'react-router-dom'
import MainLayout from '../../components/Layout/MainLayout';
import { getOrderById } from '../../api/Orders';
import OrderInfo from '../../components/Order/OrderInfo';
import OrderProductCard from '../../components/Order/OrderProductCard';
import ModalDialog from '../../components/Order/ModalDialog';

function Order() {
    const [order, setOrder] = useState('')
    const {id} = useParams();
    const [open, setOpen] = useState(false);
    const [actionType, setActionType] = useState(1)


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

    const handleClick = (value) => {
      setActionType(value);
      setOpen(true);
    };
    
  return (
    <MainLayout>
        <Card sx={{padding: 2, marginTop: 3}}>

          <OrderInfo order={order}/>

          <Box display={'flex'} justifyContent={'end'} gap={1}>
            <Button variant='contained' size='small' 
              sx={{backgroundColor: 'red', color: 'white', '&:hover': { backgroundColor: '#c62828'}, 
              display: order?.orderStatusType === 'REJECTED' ? 'none' : 'block'
              }}
              onClick={() => handleClick(1)}
            >
              Bekor qilish
            </Button>
            <Button size='small' variant='contained' onClick={() => handleClick(2)}
              sx = {{display: order?.orderStatusType === 'REJECTED' ? 'none' : 'block'}}
            >
              Tayyorlandi
            </Button>

            <Button variant='contained' size='small' sx = {{display: order?.orderStatusType === 'REJECTED' ? 'block' : 'none'}}>
              Buyurtmani faollashtirish
            </Button>
          </Box>

          <ModalDialog open={open} setOpen={setOpen} actionType={actionType} id = {id}/>

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