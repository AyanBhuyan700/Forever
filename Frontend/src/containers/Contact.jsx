import React, { useEffect } from "react";
import Footer from "../components/Footer";

function Contact() {

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <>
            <div className="text-center text-2xl pt-10 border-t border-[#e5e7eb]">
                <div className="inline-flex gap-2 items-center mb-3">
                    <p className="text-gray-500">
                        CONTACT
                        <span className="text-gray-700 font-medium"> US</span>
                    </p>
                    <p className="w-8 sm:w-12 h-[1px] sm:h-[2px] bg-gray-700"></p>
                </div>
                <div className="my-10 flex flex-col justify-center md:flex-row gap-10 mb-28 text-[16px] text-justify">
                    <img className="w-full md:max-w-[480px]" src="/images/contact.png" loading="lazy" decoding="async" />
                    <div className="flex flex-col justify-center items-start gap-6">
                        <p className="font-semibold text-xl text-gray-600">Our Store</p>
                        <p className=" text-gray-500">Mönckebergstrasse 11<br />
                            20095 HAMBURG - Germany</p>
                        <p className=" text-gray-500">Tel. 49 40 30962222
                            <br />
                            Email: admin@gmail.com
                        </p>
                        <p className="font-semibold text-xl text-gray-600">Careers at Forever</p>
                        <p className=" text-gray-500">Learn more about our teams and job openings.</p>
                        <button class="border border-black px-8 py-4 text-sm hover:bg-black hover:text-white transition-all duration-500">Explore Jobs</button>
                    </div>
                </div>
            </div>

            <div class=" text-center">
                <p class="text-2xl font-medium text-gray-800">Subscribe now &amp; get 20% off</p>
                <p class="text-gray-400 my-3"> Don’t miss out on deals, offers, discounts and bonus vouchers.</p>
                <form class="w-full sm:w-1/2 flex items-center gap-3 mx-auto my-6 border pl-3 border-[#e5e7eb]">
                    <input class="w-full sm:flex-1 outline-none" type="email" placeholder="Enter your email" required="" />
                    <button type="submit" class="bg-black text-white text-xs px-10 py-4">SUBSCRIBE</button>
                </form>
            </div>
            <Footer />
        </>
    )
}

export default Contact;
