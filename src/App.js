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


function App() {
  const [isLogin, setIsLogin] = useState(false)

  
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage setIsLogin={setIsLogin} />} />
          {isLogin ? (
            <>
              <Route path="/home" element={<HomePage />} />
              <Route path="/products" element={<Products />} />
              <Route path="/customers" element={<Customers />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/addproduct" element={<AddProduct />}/>
              <Route path="/interface" element={<Interface />}/>
              <Route path="/sale" element={<SalePage />}/>
              <Route path="/order/:id" element={<Order/>}/>
            </>
          ) : (
            // Redirect to login page if not logged in
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
