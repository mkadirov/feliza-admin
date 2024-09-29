import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import MainLayout from './components/Layout/MainLayout';
import LoginPage from './pages/Login/LoginPage';
import HomePage from './pages/HomePage/HomePage';
import { useState } from 'react';
import Products from './pages/Products/Products';
import Customers from './pages/Customers/Customers';
import Settings from './pages/Settings/Settings';
import Orders from './pages/Orders/Orders';
import AddProduct from './pages/AddProduct/AddProduct';
import Interface from './pages/Interface/Interface';
import SalePage from './pages/SalePage/SalePage';
import Order from './pages/Order/Order';
import Users from './pages/Users/Users';
import Product from './pages/Product/Product';
import { Box, CircularProgress } from '@mui/material';
import MyContext from './components/Context/MyContext';


function App() {
  const [isLoading, setIsLoading] = useState(false)
  const [pageName, setPageName] = useState('Statistika')
  const [user, setUser] = useState(() => {
    const storedUserData = localStorage.getItem("userData");

    if (storedUserData) {
      const userData = JSON.parse(storedUserData);

      if (userData.expirationTime > new Date().getTime()) {
        return userData.user;
      } else {
        localStorage.removeItem("userData");
        return null;
      }
    } else {
      return null;
    }
  });

  
  return (
    <>
      <MyContext.Provider
      value={
        {
          isLoading,
          setIsLoading,
          pageName,
          setPageName
        }
      }
      >
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage setUser={setUser} />} />
          {user ? (
            <>
              <Route path="/home" element={<HomePage />} />
              <Route path="/products" element={<Products />} />
              <Route path="/customers" element={<Customers />} />
              <Route path="/users" element={<Users/>} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/addproduct" element={<AddProduct />}/>
              <Route path="/interface" element={<Interface />}/>
              <Route path="/sale" element={<SalePage />}/>
              <Route path="/order/:id" element={<Order/>}/>
              <Route path="/product/:id" element={<Product/>} />
            </>
          ) : (
            
            <Route
              path="/*"
              element={<Navigate to="/" />}
            />
          )}
        </Routes>
      </BrowserRouter>

      {isLoading && (
        <Box
          sx={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(255, 255, 255, 0.7)",
            zIndex: 9999,
          }}
        >
          <Box
            sx={{
              width: "100%",
              height: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <CircularProgress />
          </Box>
        </Box>
      )}
      </MyContext.Provider>
    </>
  );
}

export default App;
