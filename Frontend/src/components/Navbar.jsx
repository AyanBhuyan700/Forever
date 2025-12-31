import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";

function Navbar() {
  const url = import.meta.env.VITE_ADMIN_API_URL
  const location = useLocation();
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const { getCartCount } = useContext(ShopContext);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <nav className="flex items-center justify-between py-5 font-medium">

        <div>
          <img
            className="w-36 cursor-pointer"
            src="/images/1.png"
            alt="Logo"
            onClick={() => navigate("/")}
          />
        </div>

        <div className="hidden sm:flex gap-5 text-sm text-gray-700">
          {["/", "/collection", "/about", "/contact"].map((path, index) => {
            const labels = ["HOME", "COLLECTION", "ABOUT", "CONTACT"];
            return (
              <Link key={index} to={path} className="relative">
                <p className="text-[#374151] text-sm">{labels[index]}</p>
                <hr
                  className={`w-2/4 border-none h-[1.5px] bg-gray-700 absolute left-1/2 -translate-x-1/2 ${location.pathname === path ? "block" : "hidden"
                    }`}
                />
              </Link>
            );
          })}
          <a
            href={`${url}/adminLogin`}
            target="_blank"
            rel="noopener noreferrer"
            className="border px-4 py-1 text-xs rounded-full flex items-center border-[#e5e7eb]"
          >
            <p>Admin Panel</p>
          </a>
        </div>


        <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
          <img src="/images/menu.png" className="w-6" alt="Menu" />
        </button>


        {menuOpen && (
          <div className="absolute top-14 left-0 w-full bg-white shadow-md md:hidden flex flex-col gap-4 py-4 items-center">
            {["/", "/collection", "/about", "/contact"].map((path, index) => (
              <Link key={index} to={path} onClick={() => setMenuOpen(false)}>
                <p className="text-[#374151] text-sm">{["HOME", "COLLECTION", "ABOUT", "CONTACT"][index]}</p>
              </Link>
            ))}
            <a
              href={`${url}/adminLogin`}
              target="_blank"
              rel="noopener noreferrer"
              className="border px-4 py-1 text-xs rounded-full border-[#e5e7eb]"
            >
              Admin Panel
            </a>
          </div>
        )}


        <div className="flex gap-4">
          <div className="relative group">
            <img
              src="/images/Profile.png"
              className="w-5 cursor-pointer"
              alt="Profile"
              onClick={() => !token && navigate("/login")
              }
            />
            {token && (
              <div className="group-hover:block hidden absolute right-0 pt-3">
                <div className="flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded shadow-lg">
                  <p className="cursor-pointer hover:text-black" onClick={() => navigate("/orders")}>
                    Orders
                  </p>
                  <p
                    className="cursor-pointer hover:text-black"
                    onClick={() => {
                      localStorage.removeItem("token");
                      navigate("/login");
                    }}
                  >
                    Logout
                  </p>
                </div>
              </div>
            )}
          </div>

          <Link to="/cart" className="relative">
            <img src="/images/cart.png" className="w-5 cursor-pointer" alt="Cart" />
            <p className="absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]">
              {getCartCount()}
            </p>
          </Link>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
