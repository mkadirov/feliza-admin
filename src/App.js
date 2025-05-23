import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import "./App.css";
import LoginPage from "./pages/Login/LoginPage";
import HomePage from "./pages/HomePage/HomePage";
import { useState } from "react";
import Products from "./pages/Products/Products";
import Customers from "./pages/Customers/Customers";
import Settings from "./pages/Settings/Settings";
import Orders from "./pages/Orders/Orders";
import AddProduct from "./pages/AddProduct/AddProduct";
import Interface from "./pages/Interface/Interface";
import SalePage from "./pages/SalePage/SalePage";
import Order from "./pages/Order/Order";
import Users from "./pages/Users/Users";
import Product from "./pages/Product/Product";
import {
  Box,
  CircularProgress,
  createTheme,
  ThemeProvider,
} from "@mui/material";
import MyContext from "./components/Context/MyContext";
import Notifications from "./pages/Notifications/Notifications";
import NotificationDetail from "./pages/Notifications/NotificationDetail";
import CustomerDetail from "./pages/Customers/CustomerDetail";
import Review from "./pages/Review/Review";

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [pageName, setPageName] = useState("Statistika");
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

  const theme = createTheme({
    palette: {
      primary: {
        main: "#3BABB3",
      },
      secondary: {
        main: "#edf2ff",
      },
    },
    shape: {
      borderRadius: 5,
    },
  });

  return (
    <>
      <MyContext.Provider
        value={{
          isLoading,
          setIsLoading,
          pageName,
          setPageName,
        }}
      >
        <ThemeProvider theme={theme}>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<LoginPage setUser={setUser} />} />
              {user ? (
                <>
                  <Route path="/home" element={<HomePage />} />
                  <Route path="/products" element={<Products />} />
                  <Route path="/customers" element={<Customers />} />
                  <Route path="/customers/:id" element={<CustomerDetail />} />
                  <Route path="/users" element={<Users />} />
                  <Route path="/settings" element={<Settings />} />
                  <Route path="/orders" element={<Orders />} />
                  <Route path="/addproduct" element={<AddProduct />} />
                  <Route path="/interface" element={<Interface />} />
                  <Route path="/sale" element={<SalePage />} />
                  <Route path="/order/:id" element={<Order />} />
                  <Route path="/product/:id" element={<Product />} />
                  <Route path="/review" element={<Review />} />
                  <Route path="/notifications" element={<Notifications />} />
                  <Route
                    path="/notification/:id"
                    element={<NotificationDetail />}
                  />
                </>
              ) : (
                <Route path="/*" element={<Navigate to="/" />} />
              )}
            </Routes>
          </BrowserRouter>
        </ThemeProvider>

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
