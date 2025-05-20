import React from "react";
import { useNavigate } from "react-router-dom";

function Navbar() {
    let token = localStorage.getItem("token")
    let navigate = useNavigate()
    return (
        <>
            <div className="py-2 px-[4%] bg-gray-50">
                <div className="flex items-center justify-between">
                    <img src="/images/logo-admin.png" alt="Admin Logo" className="w-[max(10%,80px)]" />
                    <button className="bg-gray-600 text-white px-5 py-2 sm:px-7 sm:py-2 rounded-full text-xs sm:text-sm" onClick={() => {
                        localStorage.removeItem("token")
                        navigate("/adminLogin")
                    }
                    }>
                        Logout
                    </button>
                </div>
            </div>
        </>
    )
}

export default Navbar;
