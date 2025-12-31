import React, { useEffect } from "react";
import Footer from "../components/Footer";

function Privacy() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])
    return (
        <>
            <div className="text-2xl text-center pt-8 border-t border-[#e5e7eb]">
                <div className="inline-flex gap-2 items-center mb-3">
                    <p className="text-gray-500">PRIVACY
                        <span className="text-gray-700 font-medium"> POLICY</span>
                    </p>
                    <p className="w-8 sm:w-12 h-[1px] sm:h-[2px] bg-gray-700"></p>
                </div>
                <div className="my-10 md:flex-row gap-16 text-start">
                    <p className="text-gray-700 font-medium">Forever Group Privacy Commitment</p>
                    <p className="mt-5 text-gray-500 text-[18px]">
                        We are the Forever Group, comprising the affiliated companies of H & M Hennes & Mauritz AB and its brands:
                        <br />Forever, COS, Weekday, Monki, Forever HOME, & Other Stories, and ARKET.
                    </p>
                    <p className="mt-5 text-gray-500 text-[18px]">When you shop with us or use one of our services, you trust us with your information.
                        <br />Protecting personal data and your privacy is of the greatest priority for the Forever Group.
                        <br />It is important to us to give you clear and transparent information about the personal data we collect.</p>
                    <div className="mt-5">
                        <p className="text-gray-700 font-medium">Forever Group personal data handling in brief</p>
                        <p className="mt-5 text-gray-700 text-[18px]">Who is responsible for processing your personal data?</p>
                        <p className="mt-5 text-gray-500 text-[18px]">The Forever Group consists of different brands and legal entities for the processing of your personal data.<br />
                            For each processing purpose you will be informed of the responsible company.
                            <br />It will be either the Swedish company Forever Hennes & Mauritz GBC AB, or one of our local affiliates.</p>
                    </div>

                    <div className="mt-5">
                        <p className="mt-5 text-gray-700 text-[18px]">Why do we process your personal data?</p>
                        <p className="mt-5 text-gray-500 text-[18px]">We use and process your personal data to be able to give you the best customer experience .<br />
                            We also process your personal data upon your request to be able to provide you.
                        </p>
                    </div>

                </div>

            </div>
            <Footer />
        </>
    )
}

export default Privacy;
