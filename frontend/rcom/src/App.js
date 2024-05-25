import { useState, React } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js'
import { Navbar } from "./components/Navbar";
import {Routes, Route} from 'react-router-dom'
import { Home } from "./components/Home";
import { Categories } from "./components/Categories";
import AllProducts from "./components/AllProducts";
import ProductDetail from "./components/ProductDetail";
import Footer from "./components/footer";
import Checkout from "./components/Checkout";
import Register from "./components/Register";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import Orders from "./components/orders";
import OrderSuccess from "./components/OrderSuccess";
import OrderFailed from "./components/OrderFailed";
import Profile from "./components/Profile";
import Logout from "./components/Logout";
import { PlacedOrder } from "./components/PlacedOrder";


function App() {

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/products" element={<AllProducts />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/order/success" element={<OrderSuccess />} />
        <Route path="/order/failed" element={<OrderFailed />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/payment_done" element={<PlacedOrder />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/product/:product_id" element={<ProductDetail />} />
        <Route path="/category/:category_id" element={<AllProducts />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;