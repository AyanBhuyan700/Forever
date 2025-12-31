import React, { useState, useContext, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";
import toastr from "toastr";
import "toastr/build/toastr.min.css";
import Footer from "../components/Footer";
import { useLocation, useNavigate } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";

const stripePromise = loadStripe("pk_test_51QuxIk2S4YZO9CRMvezsFpYCAZga0gxhQ6LTTgDIsEVIEgasD85ejegLAuX9UYwFf9BgapCjFCHBh7U3EmAcgUNY00ThEKwqAl");

function CheckoutForm() {
    let url = import.meta.env.VITE_PORT_API_URL
    const stripe = useStripe();
    const elements = useElements();
    const navigate = useNavigate();
    const { state } = useLocation();
    const [loading, setLoading] = useState(false);
    const [cartData, setCartData] = useState([]);
    const [formData, setFormData] = useState({ email: "", name: "" });
    const { currency, cartItem, fetchProduct, productData, delivery_fee, getCartAmount } = useContext(ShopContext);

    useEffect(() => {
        if (!state || !state.orderData) {
            toastr.error("No order data found. Redirecting to cart.");
            navigate("/cart");
        }
    }, [state, navigate]);

    if (!state || !state.orderData) return null;

    const { orderData } = state;
    const amount = orderData.amount;

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    useEffect(() => {
        const fetchCartDetails = async () => {
            const tempData = [];

            const productPromises = Object.keys(cartItem).flatMap((itemId) =>
                Object.keys(cartItem[itemId]).map(async (size) => {
                    if (cartItem[itemId][size] > 0) {
                        tempData.push({
                            _id: itemId,
                            size: size,
                            quantity: cartItem[itemId][size],
                        });

                        if (!productData[itemId]) {
                            await fetchProduct(itemId);
                        }
                    }
                })
            );

            await Promise.all(productPromises);
            setCartData(tempData);
        };

        fetchCartDetails();
    }, [cartItem, fetchProduct, productData]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);

        if (!stripe || !elements) {
            toastr.error("Stripe is not fully loaded. Please try again.");
            setLoading(false);
            return;
        }

        try {
            const { data } = await axios.post(`${url}/api/order/place`, {
                ...orderData,
                paymentMethod: "Stripe",
            });

            const clientSecret = data.clientSecret;
            if (!clientSecret) {
                toastr.error("Payment failed. No client secret received.");
                setLoading(false);
                return;
            }

            const cardElement = elements.getElement(CardElement);
            if (!cardElement) {
                toastr.error("Card details are missing. Please check and try again.");
                setLoading(false);
                return;
            }

            const paymentResult = await stripe.confirmCardPayment(clientSecret, {
                payment_method: { card: cardElement },
            });

            if (paymentResult.error) {
                toastr.error(paymentResult.error.message, "Payment Failed");
            } else if (paymentResult.paymentIntent && paymentResult.paymentIntent.status === "succeeded") {
                toastr.success("Payment successful!", "Success");
                navigate("/orders");
            } else {
                toastr.error("Payment failed. Please try again.", "Error");
            }
        } catch (error) {
            console.error("Payment Error:", error);
            toastr.error("Payment failed, please try again", "Error");
        }

        setLoading(false);
    };

    return (
        <>
            <div className="text-2xl border-t pt-8 border-[#e5e7eb] px-4">
                <div className="inline-flex gap-2 items-center mt-7 mb-5">
                    <p className="text-gray-500">
                        STRIPE <span className="text-gray-700 font-medium">PAYMENT</span>
                    </p>
                    <p className="w-8 sm:w-12 h-[1px] sm:h-[2px] bg-gray-700"></p>
                </div>
            </div>

            <div className="flex flex-col md:flex-row gap-6 px-4 sm:px-8">

                <div className="w-full md:w-1/2 text-gray-700">
                    <h1 className="text-lg">Product Payment</h1>
                    <p className="mb-6 mt-2 text-3xl ">{currency}{getCartAmount() + delivery_fee}.00</p>

                    {cartData.map((item, index) => {
                        const product = productData[item._id];

                        return (
                            <div
                                key={index}
                                className="py-4 border-t border-[#e5e7eb] text-gray-700 flex justify-between items-center"
                            >
                                <div>
                                    <p className="text-sm sm:text-lg font-medium">{product?.name || "Loading..."}</p>
                                    <p className="text-sm">Qty {item.quantity}</p>
                                </div>
                                <p className="text-sm sm:text-lg">{currency}{product?.price || "N/A"}.00</p>
                            </div>
                        );
                    })}

                    <div className="py-5 border-t border-b border-[#e5e7eb] text-gray-700 flex justify-between">
                        <p className="text-sm sm:text-lg font-medium">Delivery Charge</p>
                        <p className="text-sm sm:text-lg">{currency}{delivery_fee}.00</p>
                    </div>
                </div>

                <div className="w-full md:w-1/2 p-6 rounded-lg">
                    <form onSubmit={handleSubmit} className="w-full">
                        <input
                            required
                            name="email"
                            className="border border-gray-300 rounded py-3 px-4 w-full mb-4"
                            type="email"
                            placeholder="Email address"
                            value={formData.email}
                            onChange={handleChange}
                        />
                        <CardElement className="border border-gray-300 rounded py-3 px-4 w-full mb-4" />
                        <input
                            required
                            name="name"
                            className="border border-gray-300 rounded py-3 px-4 w-full mb-4"
                            type="text"
                            placeholder="Cardholder Name"
                            value={formData.name}
                            onChange={handleChange}
                        />

                        <button
                            type="submit"
                            className="bg-black text-white font-semibold text-lg px-6 py-3 w-full rounded-md"
                            disabled={!stripe || loading}
                        >
                            {loading ? "Processing..." : "Pay Now"}
                        </button>
                    </form>
                </div>
            </div>
            <Footer />
        </>
    );
}

function StripePayment() {
    return (
        <Elements stripe={stripePromise}>
            <CheckoutForm />
        </Elements>
    );
}

export default StripePayment;
