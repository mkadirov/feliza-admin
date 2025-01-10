import React, { useState, useEffect} from 'react';
import {Box, Grid, Button} from '@mui/material'
import MainLayout from '../../components/Layout/MainLayout';
import { getAllDeliveredOrders, getAllOrders, getCanceledOrders, getNewOrders, getPackagedOrders, getShippedOrders } from '../../api/Orders';
import NewOrders from '../../components/Orders/NewOrders';
import CanceledOrders from '../../components/Orders/CanceledOrders';
import PackagedOrders from '../../components/Orders/PackagedOrders';
import ShippedOrders from '../../components/Orders/ShippedOrders';
import DeliverdOrders from '../../components/Orders/DeliverdOrders';
import NotPaidOrders from '../../components/Orders/NotPaidOrders';




const Orders = () => {

  const [newOrders, setNewOrders] = useState([]);
  const [canceledOrders, setCanceledOrders] = useState([])
  const [selectedIndex, setSelectedIndex] = useState(1);
  const [shippedOrders, setShippedOrders] = useState([])
  const [packagedOrders, setPackagedOrders] = useState([])
  const [deliveredOrders, setDeliveredOrders] = useState([])
  const [notPaidOrders, setNotPaidOrders] = useState([])


  useEffect(() =>{
    const fetchData = async () => {
      const res = await  getNewOrders();
      if(res?.success) {
        console.log(res.data);
        setNewOrders(res.data);
      } 
    }
    fetchData();
  }, [])

  useEffect(() =>{
    const fetchData = async () => {
      const res = await  getPackagedOrders();
      if(res?.success) {
        console.log(res.data);
        setPackagedOrders(res.data);
      } 
    }
    fetchData();
  }, [])

  useEffect(() =>{
    const fetchData = async () => {
      const res = await  getShippedOrders();
      if(res?.success) {
        console.log(res.data);
        setShippedOrders(res.data);
      } 
    }
    fetchData();
  }, [])

  
  const getCanceledOrderList = async () => {
      const res = await  getCanceledOrders();
      if(res?.success) {
        console.log(res.data);
        setCanceledOrders(res.data);
      } 
  }

//   const getDeliveredOrderList = async () => {
//     const res = await  getAllDeliveredOrders();
//     if(res?.success) {
//       console.log(res.data);
//       setDeliveredOrders(res.data);
//     } 
// }

const getNotPaidOrders = async() => {
  const res = await  getAllOrders();
    if(res?.success) {
      console.log(res.data);
      const list = res.data.filter(item => item.paid == false)
      list.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setNotPaidOrders(list)
    } 
}
  


  return (
    <MainLayout>

      <Box display={'flex'} gap={1} marginTop={3}>
        <Button size='small' fullWidth variant={selectedIndex == 1? 'contained' : 'outlined'} onClick={() => setSelectedIndex(1)}>
          Yangi buyurtmalar
        </Button>
        <Button size='small' fullWidth variant={selectedIndex == 2? 'contained' : 'outlined'} onClick={() => setSelectedIndex(2)}>
          Tayyorlangan buyurtmalar
        </Button>
        <Button size='small' fullWidth variant={selectedIndex == 3? 'contained' : 'outlined'} onClick={() => setSelectedIndex(3)}>
          Jönatilgan buyurtmalar
        </Button>

        <Button size='small' fullWidth variant={selectedIndex == 4? 'contained' : 'outlined'} onClick={() => {
          
          setSelectedIndex(4)
        }}>
          Yetkazilgan buyurtmalar
        </Button>
        <Button size='small' fullWidth variant={selectedIndex == 5? 'contained' : 'outlined'} onClick={() => {
          getCanceledOrderList();
          setSelectedIndex(5)
        }}>
          Bekor qilingan buyurtmalar
        </Button>
        <Button size='small' fullWidth variant={selectedIndex == 6? 'contained' : 'outlined'} onClick={() => {
          getNotPaidOrders()
          setSelectedIndex(6)
        }}>
          Amalga oshmagan buyurtmalar
        </Button>
      </Box>
      
      <Box sx={{display: selectedIndex==1? 'block' : 'none'}}>
        <NewOrders newOrders={newOrders}/>
      </Box>
      <Box sx={{display: selectedIndex==2? 'block' : 'none'}}>
        <PackagedOrders packagedOrders={packagedOrders}/>
      </Box>
      <Box sx={{display: selectedIndex==3? 'block' : 'none'}}>
        <ShippedOrders shippedOrders={shippedOrders}/>
      </Box>
      <Box sx={{display: selectedIndex==4? 'block' : 'none'}}>
        <DeliverdOrders />
      </Box>
      <Box sx={{display: selectedIndex==5? 'block' : 'none'}}>
        <CanceledOrders canceledOrders={canceledOrders}/>
      </Box>
      <Box sx={{display: selectedIndex==6? 'block' : 'none'}}>
        <NotPaidOrders notPaidOrders={notPaidOrders}/>
      </Box>

    </MainLayout>
  );
};

export default Orders;
