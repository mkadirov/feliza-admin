import React, { useState, useEffect} from 'react';
import {Box, Grid, Button} from '@mui/material'
import MainLayout from '../../components/Layout/MainLayout';
import { getNewOrders } from '../../api/Orders';
import NewOrders from '../../components/Orders/NewOrders';




const Orders = () => {
  const [newOrders, setNewOrders] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(1);

  // useEffect(() => {
    
  //   const socket = io('https://felizabackend.de/websocket'); // WebSocket URL

  //   socket.on('connect', () => {
  //     console.log('Connected to WebSocket');
  //   });

  //   socket.on('/topic/newOrder', (newOrder) => {
  //     setOrders((prevOrders) => [...prevOrders, newOrder]);
  //   });

  //   return () => {
  //     socket.disconnect();
  //   };
    
  // }, []); 

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


  return (
    <MainLayout>
      <Box display={'flex'} gap={1} marginTop={3}>
        <Button size='small' fullWidth variant={selectedIndex == 1? 'contained' : 'outlined'} onClick={() => setSelectedIndex(1)}>
          Yangi buyurtmalar
        </Button>
        <Button size='small' fullWidth variant={selectedIndex == 2? 'contained' : 'outlined'} onClick={() => setSelectedIndex(2)}>
          Jönatilgan buyurtmalar
        </Button>
        <Button size='small' fullWidth variant={selectedIndex == 3? 'contained' : 'outlined'} onClick={() => setSelectedIndex(3)}>
          Bekor qilingan buyurtmalar
        </Button>
      </Box>
      
      <Box sx={{display: selectedIndex==1? 'block' : 'none'}}>
        <NewOrders newOrders={newOrders}/>
      </Box>
    </MainLayout>
  );
};

export default Orders;
