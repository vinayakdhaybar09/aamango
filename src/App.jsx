import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import reactLogo from "./assets/react.svg";
import Login from "./components/auth/Login";
import Dashboard from "./components/dashboard/Dashboard";
import Orders from "./components/orders/Orders";
import AddProduct from "./components/products/AddProduct";
import Products from "./components/products/Products";
import Users from "./components/users/Users";
import "./styles/App.css";
import ProductDetails from "./components/products/ProductDetails";
import { ToastContainer } from "react-toastify"; 

function App() {
  return (
    <div>
      <Routes>
        <Route exact path="/" element={<Dashboard />} />
        <Route exact path="/orders" element={<Orders />} />
        <Route exact path="/users" element={<Users />} />
        <Route exact path="/products" element={<Products />} />
        <Route exact path="/products/add-product" element={<AddProduct />} />
        <Route exact path="/products/:id" element={<ProductDetails />} />
        <Route exact path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
