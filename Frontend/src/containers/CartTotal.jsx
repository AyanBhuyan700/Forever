import React, { useContext } from "react";
import { ShopContext } from "../context/ShopContext";

function CartTotal() {
    const { currency, delivery_fee, getCartAmount } = useContext(ShopContext)
    return (
        <>
            <div class="w-full">
                <div class="text-2xl">
                    <div class="inline-flex gap-2 items-center mb-3">
                        <p class="text-gray-500">CART
                            <span class="text-gray-700 font-medium"> TOTALS</span>
                        </p>
                        <p class="w-8 sm:w-12 h-[1px] sm:h-[2px] bg-gray-700">
                        </p>
                    </div>
                </div>
                <div class="flex flex-col gap-2 mt-2 text-sm">
                    <div class="flex justify-between">
                        <p>Subtotal</p>
                        <p>{currency}{getCartAmount()}.00</p>
                    </div>
                    <hr className="border-[#e5e7eb]" />
                    <div class="flex justify-between">
                        <p>Shipping Fee</p>
                        <p>{currency}{delivery_fee}.00</p>
                    </div>
                    <hr className="border-[#e5e7eb]" />
                    <div class="flex justify-between">
                        <b>Total</b>
                        <b>{currency}{getCartAmount() === 0 ? 0 : getCartAmount() + delivery_fee}</b>
                    </div>
                </div>
            </div>

        </>
    );
}

export default CartTotal;
