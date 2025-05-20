import React, { useContext, useEffect } from "react";
import { ShopContext } from "../context/ShopContext";
import Footer from "../components/Footer";

function Orders() {
    const { currency, cartItem, productData, fetchProduct } = useContext(ShopContext);

    const cartArray = Object.entries(cartItem).slice(0, 3);

    useEffect(() => {
        cartArray.forEach(([itemId]) => {
            if (!productData[itemId]) {
                fetchProduct(itemId);
            }
        });
    }, [cartItem, productData]);

    return (
        <>
            <div className="border-t pt-16 border-[#e5e7eb]">
                <div className="text-2xl">
                    <div className="inline-flex gap-2 items-center mb-3">
                        <p className="text-gray-500">
                            MY <span className="text-gray-700 font-medium">ORDERS</span>
                        </p>
                        <p className="w-8 sm:w-12 h-[1px] sm:h-[2px] bg-gray-700"></p>
                    </div>
                </div>

                <div>
                    {cartArray.length > 0 ? (
                        cartArray.map(([itemId, sizes], index) => {
                            const product = productData[itemId];
                            return Object.entries(sizes).map(([size, quantity], sizeIndex) => (
                                <div
                                    key={`${index}-${sizeIndex}`}
                                    className="py-4 border-t border-b border-[#e5e7eb] text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
                                >
                                    <div className="flex items-start gap-6 text-sm">
                                        {product ? (
                                            <img
                                                className="w-16 sm:w-20"
                                                src={product.image?.[0]}
                                                alt={product.name}
                                            />
                                        ) : (
                                            <div className="w-16 sm:w-20 h-16 sm:h-20 bg-gray-200 animate-pulse"></div>
                                        )}
                                        <div>
                                            <p className="sm:text-base font-medium">{product?.name}</p>
                                            <div className="flex items-center gap-3 mt-1 text-base text-gray-700">
                                                <p>{currency}{product?.price}</p>
                                                <p>Quantity: {quantity}</p>
                                                <p>Size: {size}</p>
                                            </div>
                                            <p className="mt-1">
                                                Date: <span className="text-gray-400">{new Date().getFullYear()}</span>
                                            </p>
                                            <p className="mt-1">
                                                Payment: <span className="text-gray-400">Done</span>
                                            </p>
                                        </div>
                                    </div>
                                    <div className="md:w-1/2 flex justify-between">
                                        <div className="flex items-center gap-2">
                                            <p className="min-w-2 h-2 rounded-full bg-green-500"></p>
                                            <p className="text-sm md:text-base">Order Placed</p>
                                        </div>
                                        <button className="border px-4 py-2 text-sm font-medium rounded-sm">
                                            Track Order
                                        </button>
                                    </div>
                                </div>
                            ));
                        })
                    ) : (
                        <p className="text-gray-500 text-center py-10">No orders found.</p>
                    )}
                </div>
            </div>
            <Footer />
        </>
    );
}

export default Orders;
