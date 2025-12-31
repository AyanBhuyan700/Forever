import React, { useEffect } from "react";
import Footer from "../components/Footer";

function About() {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <div className="text-2xl text-center pt-8 border-t border-[#e5e7eb]">
        <div className="inline-flex gap-2 items-center mb-3">
          <p className="text-gray-500">ABOUT
            <span className="text-gray-700 font-medium"> US</span>
          </p>
          <p className="w-8 sm:w-12 h-[1px] sm:h-[2px] bg-gray-700"></p>
        </div>
        <div className="my-10 flex flex-col md:flex-row gap-16">
          <img src="/images/about.png" className="w-full md:max-w-[450px]" loading="lazy" decoding="async"/>
          <div className="flex flex-col justify-center gap-6 md:w-2/4 text-gray-600 text-start">
            <p className="font-medium text-[16px]">Forever was born out of a passion for innovation and a desire to revolutionize the way people shop online. Our journey began with a simple idea: to provide a platform where customers can easily discover, explore, and purchase a wide range of products from the comfort of their homes.</p>
            <p className="font-medium text-[16px]">Since our inception, we've worked tirelessly to curate a diverse selection of high-quality products that cater to every taste and preference. From fashion and beauty to electronics and home essentials, we offer an extensive collection sourced from trusted brands and suppliers.</p>
            <b className="text-gray-800 text-[16px] font-bold">Our Mission</b>
            <p className="font-medium text-[16px]">Our mission at Forever is to empower customers with choice, convenience, and confidence. We're dedicated to providing a seamless shopping experience that exceeds expectations, from browsing and ordering to delivery and beyond.</p>
          </div>
        </div>
      </div>
      <div className="text-xl py-4">
        <div className="inline-flex gap-2 items-center mb-3">
          <p className="text-gray-500">WHY
            <span className="text-gray-700 font-medium"> CHOOSE US</span>
          </p>
          <p className="w-8 sm:w-12 h-[1px] sm:h-[2px] bg-gray-700"></p>
        </div>
      </div>
      <div className="flex flex-col md:flex-row text-sm mb-20 ">

        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5 border-[#e5e7eb]">
          <b>Quality Assurance:</b>
          <p className="text-gray-600">We meticulously select and vet each product to ensure it meets our stringent quality standards.</p>
        </div>

        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5 border-[#e5e7eb]">
          <b>Convenience:</b>
          <p className="text-gray-600">With our user-friendly interface and hassle-free ordering process, shopping has never been easier.</p>
        </div>

        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5 border-[#e5e7eb]">
          <b>Exceptional Customer Service:</b>
          <p className="text-gray-600">Our team of dedicated professionals is here to assist you the way, ensuring your satisfaction is our top priority.</p>
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

export default About;
