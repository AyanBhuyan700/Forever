import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import CartTotal from "./CartTotal";
import Footer from "../components/Footer";
import axios from "axios";
import toastr from "toastr";
import "toastr/build/toastr.min.css";


function PlaceOrder() {
    const url = import.meta.env.VITE_PORT_API_URL;
    const [method, setMethod] = useState("cod");
    const token = localStorage.getItem("token")
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        street: "",
        city: "",
        state: "",
        zipcode: "",
        country: "",
        phone: "",
    });

    const navigate = useNavigate();
    const { cartItem, getCartAmount, delivery_fee, } = useContext(ShopContext);

    const cartArray = Object.entries(cartItem);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!token) {
            toastr.error("You must be logged in to place an order.");
            navigate("/login")
            return;
        }

        if (method === "razorpay") {
            toastr.error("Razorpay is not available");
            return;
        }

        const orderData = {
            items: cartArray.map(([itemId, quantity]) => ({
                itemId,
                quantity,
            })),
            address: formData,
            amount: getCartAmount() + delivery_fee,
            paymentMethod: method,
        };

        try {
            if (method === "cod") {
                const response = await axios.post(`${url}/api/order/place`, orderData, {
                    headers: { Authorization: token },
                });

                if (response.data.success) {
                    console.log("Order placed successfully!", response.data.order);
                    navigate("/orders", { state: method });
                } else {
                    console.error("Failed to place order:", response.data.message);
                }
            } else if (method === "stripe") {
                navigate("/stripe-payment", { state: { orderData, method } });
            }
        } catch (error) {
            console.error("Error placing order:", error);
        }
    };


    return (
        <>
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t border-[#e5e7eb]">

                <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
                    <div className="text-xl sm:text-2xl my-3">
                        <div className="inline-flex gap-2 items-center mb-3">
                            <p className="text-gray-500">DELIVERY <span className="text-gray-700 font-medium">INFORMATION</span></p>
                            <p className="w-8 sm:w-12 h-[1px] sm:h-[2px] bg-gray-700"></p>
                        </div>
                    </div>
                    <div className="flex gap-3">
                        <input required name="firstName" className="border border-gray-300 rounded py-1.5 px-3.5 w-full" type="text" placeholder="First name" value={formData.firstName} onChange={handleChange} />
                        <input required name="lastName" className="border border-gray-300 rounded py-1.5 px-3.5 w-full" type="text" placeholder="Last name" value={formData.lastName} onChange={handleChange} />
                    </div>
                    <input required name="email" className="border border-gray-300 rounded py-1.5 px-3.5 w-full" type="email" placeholder="Email address" value={formData.email} onChange={handleChange} />
                    <input required name="street" className="border border-gray-300 rounded py-1.5 px-3.5 w-full" type="text" placeholder="Street" value={formData.street} onChange={handleChange} />
                    <div className="flex gap-3">
                        <input required name="city" className="border border-gray-300 rounded py-1.5 px-3.5 w-full" type="text" placeholder="City" value={formData.city} onChange={handleChange} />
                        <input name="state" className="border border-gray-300 rounded py-1.5 px-3.5 w-full" type="text" placeholder="State" value={formData.state} onChange={handleChange} />
                    </div>
                    <div className="flex gap-3">
                        <input required name="zipcode" className="border border-gray-300 rounded py-1.5 px-3.5 w-full" type="number" placeholder="Zipcode" value={formData.zipcode} onChange={handleChange} />
                        <input required name="country" className="border border-gray-300 rounded py-1.5 px-3.5 w-full" type="text" placeholder="Country" value={formData.country} onChange={handleChange} />
                    </div>
                    <input required name="phone" className="border border-gray-300 rounded py-1.5 px-3.5 w-full" type="number" placeholder="Phone" value={formData.phone} onChange={handleChange} />
                </div>

                <div className="mt-8">
                    <div className="mt-8 min-w-80">
                        <div className="w-full">
                            <CartTotal />
                        </div>
                    </div>

                    <div className="mt-12">
                        <div className="inline-flex gap-2 items-center mb-3">
                            <p className="text-gray-500">PAYMENT <span className="text-gray-700 font-medium">METHOD</span></p>
                            <p className="w-8 sm:w-12 h-[1px] sm:h-[2px] bg-gray-700"></p>
                        </div>
                        <div className="flex gap-3 flex-col lg:flex-row">
                            {["stripe", "razorpay", "cod"].map((payMethod) => (
                                <div key={payMethod} onClick={() => setMethod(payMethod)} className="flex items-center gap-3 border p-2 px-3 cursor-pointer border-[#e5e7eb]">
                                    <p className={`min-w-3.5 h-3.5 border rounded-full border-[#e5e7eb] ${method === payMethod ? "bg-green-400" : ""}`}></p>
                                    {payMethod !== "cod" ? (
                                        <img className="h-5 mx-4" src={`/images/${payMethod}.png`} alt={payMethod} />
                                    ) : (
                                        <p className="text-gray-500 text-sm font-medium mx-4">CASH ON DELIVERY</p>
                                    )}
                                </div>
                            ))}
                        </div>

                        <div className="w-full text-end mt-8">
                            <button type="submit" className="bg-black text-white px-16 py-3 text-sm">PLACE ORDER</button>
                        </div>
                    </div>
                </div>
            </form>
            <Footer />
        </>
    );
}

export default PlaceOrder;
