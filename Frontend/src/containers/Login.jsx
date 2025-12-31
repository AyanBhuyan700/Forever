import React, { useState } from "react";
import Footer from "../components/Footer";
import { useNavigate } from 'react-router-dom'
import axios from "axios";
import toastr from "toastr";
import "toastr/build/toastr.min.css";


function Login() {
    const url = import.meta.env.VITE_PORT_API_URL;
    const navigate = useNavigate()
    const [form, setForm] = useState({ email: "", password: "" })

    const changeHandler = (e) => {
        setForm((prevForm) => ({
            ...prevForm,
            [e.target.name]: e.target.value,
        }));
    };

    function loginUser() {
        try {
            axios.post(`${url}/api/user/login`, form).then(response => {
                toastr.success("Login successful!", "Success");

                const token = response.data.token;
                localStorage.setItem("token", token);

                navigate("/");
            }).catch((err) => {
                const errorMessage = err.response?.data?.message || "Login failed!";
                if (errorMessage === "Invalid email or password") {
                    toastr.error(errorMessage, "Error");
                    resetForm();
                }
            })
        } catch (err) {
            toastr.error(err.message)
        }
    }

    function resetForm() {
        setForm({ email: "", password: "" });
    }

    function onLoginSubmit(e) {
        e.preventDefault();
        loginUser()
    }


    return (
        <>
            <div className="overflow-hidden min-h-screen w-full">
                <form className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800" onSubmit={onLoginSubmit}>
                    <div className="inline-flex items-center gap-2 mb-2 mt-10 justify-center">
                        <p className="text-4xl font-normal prate">Login</p>
                        <hr className="border-none h-[1.5px] w-8 bg-gray-800 mt-1.5" />
                    </div>
                    <input type="email" name="email" className="w-full px-3 py-2 border border-gray-800" placeholder="Email" value={form.email} onChange={changeHandler}></input>
                    <input type="password" name="password" className="w-full px-3 py-2 border border-gray-800" placeholder="Password" value={form.password} onChange={changeHandler}></input>
                    <div className="w-full flex justify-between text-sm mt-[-8px]">
                        <p className="cursor-pointer font-normal text-[14px]">Forgot your password?</p>
                        <p className="cursor-pointer font-normal text-[14px]" onClick={() => {
                            navigate("/register")
                        }}>Create account</p>
                    </div>
                    <button className="bg-black text-white font-light px-8 py-2 mt-4">Sign In</button>
                </form>
                <Footer />
            </div>
        </>
    )
}

export default Login;
