import React from "react";
import { useNavigate, Link } from 'react-router-dom'


function Footer() {
    const navigate = useNavigate()
    return (
        <>
            <div>
                <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm">
                    <div>
                        <img src="/images/1.png" className="mb-5 w-32"></img>
                        <p className="w-full md:w-2/3 text-gray-600">Forever was born out of a passion for innovation and a desire to revolutionize the way people shop online. Our journey began with a simple idea: to provide a platform where customers can easily discover, explore, and purchase a wide range of products from the comfort of their homes.</p>
                    </div>
                    <div>
                        <p className="text-2xl font-medium mb-5">COMPANY</p>
                        <ul className="flex flex-col gap-1 text-gray-600 cursor-pointer">
                            <li onClick={() => { navigate("/") }}>Home</li>
                            <li onClick={() => { navigate("/about") }}>About us</li>
                            <li onClick={() => { navigate("/orders") }}>Delivery</li>
                            <li onClick={() => { navigate("/privacy") }}>Privacy policy</li>
                        </ul>
                    </div>
                    <div>
                        <p className="text-xl font-medium mb-5">GET IN TOUCH</p>
                        <ul className="flex flex-col gap-1 text-gray-600">
                            <li>+1-000-000-0000</li>
                            <Link to="https://x.com/AyanBhuyan3" target="_blank" className="cursor-pointer">Twitter</Link>
                            <Link to="https://www.instagram.com/ayanbhuyan04/?hl=en" target="_blank" className="cursor-pointer">Instagram</Link>
                            <Link to="https://www.linkedin.com/in/ayan-bhuyan-2a957a231/" target="_blank" className="cursor-pointer">Linkedin</Link>
                        </ul>
                    </div>
                </div>
                <hr className="border-[#e5e7eb]" />
                <p className="py-5 text-sm text-center">Copyright {new Date().getFullYear()}@forever - All Right Reserved.</p>

            </div>
        </>
    )
}

export default Footer;
