import React from "react";
import { NavLink } from 'react-router-dom'

function Sidebar() {
    return (
        <>
            <div className="w-[18%] min-h-screen border-r-2 border-[#e5e7eb]">
                <div className="flex flex-col gap-4 pt-6 pl-[20%] text-[15px]">
                    <NavLink to="/add" className="flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l ">
                        <img src="/images/add.png" className="w-5 h-5" alt="" />
                        <p>Add Items</p>
                    </NavLink>
                    <NavLink to="/list" className="flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l ">
                        <img src="/images/check.png" className="w-5 h-5" alt="" />
                        <p>List Items</p>
                    </NavLink>
                    <NavLink to="/order" className="flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l ">
                        <img src="/images/check.png" className="w-5 h-5" alt="" />
                        <p>Orders</p>
                    </NavLink>
                </div>
            </div>
        </>
    )
}

export default Sidebar;
