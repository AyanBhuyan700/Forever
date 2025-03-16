import React, { useState, useEffect } from "react";
import Footer from "../components/Footer";
import axios from "axios";
import toastr from "toastr";
import { Link } from "react-router-dom";

function Home() {
    const url = "https://forever-backend-0iz9.onrender.com";
    const [products, setProducts] = useState([]);

    async function getProduct() {
        try {
            const response = await axios.get(`${url}/api/product/view`);
            const allProducts = response.data.products || [];
            setProducts(allProducts);
        } catch (error) {
            toastr.error("Something went wrong!");
        }
    }

    useEffect(() => {
        getProduct();
        window.scrollTo(0, 0);
    }, []);

    return (
        <>
            <div className="flex flex-col sm:flex-row border border-gray-400">
                <div className="w-full sm:w-1/2 flex items-center justify-center py-10 sm:py-0">
                    <div className="text-[#414141]">
                        <div className="flex items-center gap-2">
                            <p className="w-8 md:w-11 h-[2px] bg-[#414141]"></p>
                            <p className="font-medium text-sm md:text-base">OUR BESTSELLERS</p>
                        </div>
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl sm:py-3 prate">Latest Arrivals</h1>
                        <div className="flex items-center gap-2">
                            <p className="font-semibold text-sm md:text-base">SHOP NOW</p>
                            <p className="w-8 md:w-11 h-[1px] bg-[#414141]"></p>
                        </div>
                    </div>
                </div>
                <img className="w-full sm:w-1/2" src="/images/hero.png" alt="Hero" />
            </div>

            <div className="my-10">
                <div className="text-center py-8 text-3xl">
                    <div className="inline-flex gap-2 items-center mb-3">
                        <p className="text-gray-500">
                            LATEST <span className="text-gray-700 font-medium">COLLECTIONS</span>
                        </p>
                        <p className="w-8 sm:w-12 h-[1px] sm:h-[2px] bg-gray-700"></p>
                    </div>
                    <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600">
                        Step Into the Future of Fashion – Our New Collection is Here!
                    </p>
                </div>
            </div>

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

            <div class="flex flex-col sm:flex-row justify-around gap-12 sm:gap-2 text-center py-20 text-xs sm:text-sm md:text-base text-gray-700">
                <div>
                    <img src="/images/2.png" class="w-12 m-auto mb-5" alt="" />
                    <p class=" font-semibold">Easy Exchange Policy</p>
                    <p class=" text-gray-400">We offer hassle free exchange policy</p>
                </div>
                <div>
                    <img src="/images/3.png" class="w-12 m-auto mb-5" alt="" />
                    <p class=" font-semibold">7 Days Return Policy</p>
                    <p class=" text-gray-400">We provide 7 days free return policy</p>
                </div>
                <div>
                    <img src="/images/4.png" class="w-12 m-auto mb-5" alt="" />
                    <p class=" font-semibold">Best customer support</p>
                    <p class=" text-gray-400">we provide 24/7 customer support</p>
                </div>
            </div>

            <div class="text-center">
                <p class="text-2xl font-medium text-gray-800">Subscribe now &amp; get 20% off</p>
                <p class="text-gray-400 my-3"> Don’t miss out on deals, offers, discounts and bonus vouchers.</p>
                <form class="w-full sm:w-1/2 flex items-center gap-3 mx-auto my-6 border pl-3 border-[#e5e7eb]">
                    <input class="w-full sm:flex-1 outline-none" type="email" placeholder="Enter your email" required="" />
                    <button type="submit" class="bg-black text-white text-xs px-10 py-4">SUBSCRIBE</button>
                </form>
            </div>

            <Footer />
        </>
    );
}

export default Home;
