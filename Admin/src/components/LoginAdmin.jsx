import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toastr from "toastr";
import "toastr/build/toastr.min.css";

function LoginAdmin() {
    const API_URL = import.meta.env.VITE_PORT_API_URL;
    const [form, setForm] = useState({ email: "admin@gmail.com", password: "admin12345" });
    const navigate = useNavigate();

    const changeHandler = (e) => {
        setForm((prevForm) => ({
            ...prevForm,
            [e.target.name]: e.target.value,
        }));
    };

    function loginAdmin() {
        try {
            axios
                .post(`${API_URL}/api/user/admin`, form)
                .then((response) => {
                    toastr.success("Login successful!", "Success");
                    const token = response.data.token;
                    localStorage.setItem("token", token);
                    navigate("/add");
                })
                .catch((error) => {
                    toastr.error(error.response?.data?.message || "Login failed!", "Error");
                });
        } catch (error) {
            toastr.error(error.response?.data?.message || "Login failed!", "Error");
        }
    }

    function onLoginSubmit(e) {
        e.preventDefault();
        loginAdmin();
    }

    return (
        <>
            <div className="bg-gray-50 min-h-screen flex items-center justify-center px-4">
                <div className="bg-white shadow-md rounded-lg px-6 py-6 w-full max-w-sm">
                    <h1 className="text-2xl font-bold mb-4 text-center">Admin Panel</h1>
                    <form onSubmit={onLoginSubmit}>
                        <div className="mb-4">
                            <p className="text-sm font-medium text-gray-700 mb-2">Email Address</p>
                            <input
                                className="rounded-md w-full px-3 py-2 border border-gray-300 outline-none focus:ring focus:ring-gray-200"
                                name="email"
                                type="email"
                                placeholder="your@email.com"
                                value={form.email}
                                onChange={changeHandler}
                            />
                        </div>
                        <div className="mb-4">
                            <p className="text-sm font-medium text-gray-700 mb-2">Password</p>
                            <input
                                className="rounded-md w-full px-3 py-2 border border-gray-300 outline-none focus:ring focus:ring-gray-200"
                                name="password"
                                type="password"
                                placeholder="password"
                                value={form.password}
                                onChange={changeHandler}
                            />
                        </div>
                        <button className="mt-2 w-full py-2 px-4 rounded-md text-white bg-black hover:bg-gray-800 transition">
                            Login
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
}

export default LoginAdmin;
