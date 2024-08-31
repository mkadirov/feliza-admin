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


function App() {
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
    </>
  );
}

export default App;
