import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./containers/Home";
import About from "./containers/About";
import Collection from "./containers/Collection";
import Contact from "./containers/Contact";
import Navbar from "./components/Navbar";
import Cart from "./containers/Cart";
import Login from "./containers/Login";
import Register from "./containers/Register";
import ViewProduct from "./containers/ViewProduct";
import Privacy from "./containers/Privacy";
import PlaceOrder from "./containers/PlaceOrder";
import Orders from "./containers/Orders";
import StripePayment from "./containers/StripePayment";


function App() {
  return (
    <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/collection" element={<Collection />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/product/:id" element={<ViewProduct />} />
        <Route path="/place-order" element={<PlaceOrder />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/stripe-payment" element={<StripePayment />} />
      </Routes>
    </div>
  );
}

export default App;
