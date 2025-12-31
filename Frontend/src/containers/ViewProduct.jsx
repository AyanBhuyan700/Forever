import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import Footer from "../components/Footer";
import { ShopContext } from "../context/ShopContext";

function ViewProduct() {
    const { addToCart, fetchProduct } = useContext(ShopContext);
    const { id } = useParams();
    const [selectedSize, setSelectedSize] = useState(null);
    const [loading, setLoading] = useState(true);
    const [product, setProduct] = useState(null);

    useEffect(() => {
        const loadProduct = async () => {
            setLoading(true);
            const fetchedProduct = await fetchProduct(id);
            setProduct(fetchedProduct);
            setLoading(false);
        };

        loadProduct();
        window.scrollTo(0, 0);
    }, [id]);

    return (
        <>
            <div className="border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100 border-[#e5e7eb]">
                <div className="flex gap-12 sm:gap-12 flex-col sm:flex-row">
                    {loading ? (
                        <p>Loading...</p>
                    ) : product ? (
                        <>
                            <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
                                <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full">
                                    <img
                                        className="w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer"
                                        src={product.image}
                                        alt={product.name}
                                    />
                                </div>
                                <div className="w-full sm:w-[80%]">
                                    <img className="w-full h-auto" src={product.image} alt={product.name} />
                                </div>
                            </div>
                            <div className="flex-1">
                                <h1 className="font-medium text-2xl mt-2">{product.name}</h1>
                                <p className="mt-5 text-3xl font-medium">${product.price}</p>
                                <p className="mt-5 text-gray-500 md:w-4/5">{product.description}</p>


                                <div className="flex flex-col gap-4 my-8">
                                    <p>Select Size</p>
                                    <div className="flex gap-2">
                                        {["S", "M", "L", "XL", "XXL"].map((size) => (
                                            <button
                                                key={size}
                                                className={`border py-2 px-4 ${selectedSize === size ? "bg-black text-white" : "bg-gray-100"
                                                    }`}
                                                onClick={() => setSelectedSize(size)}
                                            >
                                                {size}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <button
                                    className="bg-black text-white px-8 py-3 text-sm active:bg-gray-700"
                                    onClick={() => addToCart(product._id, selectedSize)}
                                >
                                    ADD TO CART
                                </button>

                                <hr className="mt-8 sm:w-4/5 border-[#e5e7eb]" />
                                <div className="text-sm text-gray-500 mt-5 flex flex-col gap-1">
                                    <p>100% Original product.</p>
                                    <p>Cash on delivery is available on this product.</p>
                                    <p>Easy return and exchange policy within 7 days.</p>
                                </div>
                            </div>
                        </>
                    ) : (
                        <p className="text-gray-500">No product found.</p>
                    )}
                </div>
            </div>
            <Footer />
        </>
    );
}

export default ViewProduct;
