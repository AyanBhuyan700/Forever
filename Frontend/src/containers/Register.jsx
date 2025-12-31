import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import Footer from "../components/Footer";
import axios from "axios";
import toastr from "toastr";
import "toastr/build/toastr.min.css";

function Register() {
    const url = import.meta.env.VITE_PORT_API_URL;
    const [form, setForm] = useState({ username: "", email: "", password: "" });
    const navigate = useNavigate();

    const changeHandler = (e) => {
        setForm((prevForm) => ({
            ...prevForm,
            [e.target.name]: e.target.value,
        }));
    };

    function registerUser() {
        try {
            axios.post(`${url}/api/user/register`, form)
                .then(response => {
                    toastr.success("Registration successful!", "Success");

                    const token = response.data.token;
                    localStorage.setItem("token", token);
                    navigate("/");
                })
                .catch(error => {
                    toastr.error("Registration failed!", "Error");
                });
        } catch (err) {
            toastr.error(err.message)
        }
    }


    function onUserSubmit(e) {
        e.preventDefault();
        registerUser();
    }

    return (
        <div className="overflow-hidden min-h-screen w-full">
            <form className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800" onSubmit={onUserSubmit}>
                <div className="inline-flex items-center gap-2 mb-2 mt-10 justify-center">
                    <p className="text-4xl font-normal prate">Sign Up</p>
                    <hr className="border-none h-[1.5px] w-8 bg-gray-800 mt-1.5" />
                </div>
                <input type="text" name="username" className="w-full px-3 py-2 border border-gray-800" placeholder="Name" value={form.username} onChange={changeHandler} />

                <input type="email" name="email" className="w-full px-3 py-2 border border-gray-800" placeholder="Email" value={form.email} onChange={changeHandler} />

                <input type="password" name="password" className="w-full px-3 py-2 border border-gray-800" placeholder="Password" value={form.password} onChange={changeHandler} />


                <div className="w-full flex justify-between text-sm mt-[-8px]">
                    <p className="cursor-pointer font-normal text-[14px]">Forgot your password?</p>
                    <p className="cursor-pointer font-normal text-[14px]" onClick={() => navigate("/login")}>Login Here</p>
                </div>
                <button type="submit" className="bg-black text-white font-light px-8 py-2 mt-4">Sign Up</button>
            </form>
            <Footer />
        </div>
    );
}

export default Register;