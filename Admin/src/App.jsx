import React from "react";
import { Routes, Route } from "react-router-dom";
import Add from "./components/Add";
import List from "./components/List";
import Order from "./components/Order";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import LoginAdmin from "./components/LoginAdmin";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <hr className="border-t border-gray-300" />
      <div className="flex w-full">
        <Sidebar />
        <div className="w-[70%] mx-auto ml-[max(5vw,25px)] my-8 text-gray-600 text-base">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/AdminLogin" element={<LoginAdmin />} />
      <Route path="/" element={<Layout />}>
        <Route path="add" element={<Add />} />
        <Route path="list" element={<List />} />
        <Route path="order" element={<Order />} />
      </Route>
    </Routes>
  );
}

export default App;
