import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { useNavigate } from "react-router-dom";
import CartTotal from "./CartTotal";
import Footer from "../components/Footer";

const Cart = () => {
    const { currency, cartItem, fetchProduct, productData, updateCart, removeCartItem } = useContext(ShopContext);
    const [cartData, setCartData] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCartDetails = async () => {
            const tempData = Object.keys(cartItem).flatMap((itemId) =>
                Object.keys(cartItem[itemId])
                    .filter((size) => cartItem[itemId][size] > 0)
                    .map((size) => ({
                        _id: itemId,
                        size: size,
                        quantity: cartItem[itemId][size],
                    }))
            );

            await Promise.all(
                tempData.map(async (item) => {
                    if (!productData[item._id]) {
                        await fetchProduct(item._id);
                    }
                })
            );

            setCartData(tempData);
        };

        fetchCartDetails();
    }, [cartItem, fetchProduct, productData]);

    const handleQuantityChange = (itemId, size, newQuantity) => {
        if (isNaN(newQuantity) || newQuantity < 1) return;
        updateCart(itemId, size, newQuantity);
    };

    return (
        <>
            <div className="border-t pt-10 border-[#e5e7eb] px-4 sm:px-8">

                <div class=" text-2xl mb-3">
                    <div class="inline-flex gap-2 items-center mb-3">
                        <p class="text-gray-500">YOUR
                            <span class="text-gray-700 font-medium"> CART</span>
                        </p>
                        <p class="w-8 sm:w-12 h-[1px] sm:h-[2px] bg-gray-700"></p>
                    </div>
                </div>

                <div className="py-4 border-t border-b border-[#e5e7eb] text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4">
                    {cartData.length === 0 ? (
                        <p className="text-gray-500 text-center col-span-full">Your cart is empty.</p>
                    ) : (
                        cartData.map((item, index) => {
                            const product = productData[item._id];

                            return (
                                <>
                                    <div key={index} className="flex items-start gap-6">

                                        <img
                                            className="w-16 sm:w-20"
                                            src={product.image}
                                            alt={product.name}
                                        />
                                        <div>
                                            <p className="text-xs sm:text-lg font-medium">
                                                {product.name}
                                            </p>
                                            <div className="flex items-center gap-5 mt-2">
                                                <p>{currency}{product.price}</p>
                                                <p className="px-2 sm:px-3 sm:py-1 border bg-slate-50 border-[#e5e7eb]">
                                                    {item.size}
                                                </p>
                                            </div>
                                        </div>
                                    </div>


                                    <input
                                        className="border max-w-10 sm:max-w-20 px-1 sm:px-2 py-1 border-[#e5e7eb]"
                                        type="number"
                                        min="1"
                                        value={item.quantity}
                                        onChange={(e) =>
                                            handleQuantityChange(item._id, item.size, parseInt(e.target.value, 10))
                                        }
                                    />


                                    <img
                                        className="w-4 sm:w-5 cursor-pointer"
                                        src="/images/delete.png"
                                        alt="Delete"
                                        onClick={() => removeCartItem(item._id, item.size)}
                                    />
                                </>

                            );
                        })
                    )}
                </div >

                <div className="flex justify-center sm:justify-end mt-12">
                    <div className="w-full sm:w-[450px]">
                        <CartTotal />
                        <div className="w-full text-center sm:text-right">
                            <button
                                className="bg-black text-white text-sm sm:text-base my-8 px-6 py-3 w-full sm:w-auto"
                                onClick={() => navigate("/place-order")}
                            >
                                PROCEED TO CHECKOUT
                            </button>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>

        </>
    );
};

export default Cart;
