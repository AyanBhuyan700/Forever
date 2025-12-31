import React, { useState, useEffect } from "react";
import axios from "axios";
import toastr from "toastr";
import { Link } from "react-router-dom";
import Loader from "../components/Loader";


function Latest() {
    const url = import.meta.env.VITE_PORT_API_URL;
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false)

    async function getProduct() {
        try {
            setLoading(true)
            const response = await axios.get(`${url}/api/product/view`);
            const allProducts = response.data.products || [];
            setProducts(allProducts);
            setLoading(false)
        } catch (error) {
            toastr.error("Something went wrong!");
            setLoading(false)
        }
    }

    useEffect(() => {
        getProduct();
        window.scrollTo(0, 0);
    }, []);

    if (loading) return <Loader />

    return (
        <>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
                {products.slice(0, 10).map((item) => (
                    <Link to={`/product/${item._id}`} key={item._id} className="text-gray-700 cursor-pointer">
                        <div className="overflow-hidden">
                            <img
                                className="hover:scale-110 transition ease-in-out"
                                src={item.image}
                                alt={item.name}
                            />
                        </div>
                        <p className="pt-3 pb-1 text-sm">{item.name}</p>
                        <p className="text-sm font-medium">${item.price}</p>
                    </Link>
                ))}
            </div>
        </>
    )
}

export default Latest;
