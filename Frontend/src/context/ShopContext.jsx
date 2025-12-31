import React, { useState, createContext, useEffect } from "react";
import toastr from "toastr";
import axios from "axios";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
    const url = import.meta.env.VITE_PORT_API_URL;
    const currency = "$";
    const delivery_fee = 10;
    const [token, setToken] = useState(null);
    const [cartItem, setCartItem] = useState({});
    const [productData, setProductData] = useState({});

    const addToCart = async (itemId, size) => {
        let cartData = JSON.parse(JSON.stringify(cartItem));

        if (!size) {
            toastr.error("Please select product size");
            return;
        }

        if (!cartData[itemId]) {
            cartData[itemId] = {};
        }
        if (!cartData[itemId][size]) {
            cartData[itemId][size] = 0;
        }
        cartData[itemId][size] += 1;

        setCartItem(cartData);

        if (token) {
            try {
                await axios.post(`${url}/api/cart/add`, { itemId, size }, { headers: { token } });
            } catch (err) {
                console.error(err.message);
            }
        }
    };

    const updateCart = async (itemId, size, quantity) => {
        let cartData = JSON.parse(JSON.stringify(cartItem));
        if (cartData[itemId]) {
            cartData[itemId][size] = quantity;
        }
        setCartItem(cartData);

        if (token) {
            try {
                await axios.put(`${url}/api/cart/update`, { itemId, size, quantity }, { headers: { token } });
            } catch (err) {
                toastr.error(err.response?.data?.message);
            }
        }
    };

    const getCartCount = () => {
        let totalCount = 0;
        for (const items in cartItem) {
            for (const item in cartItem[items]) {
                if (cartItem[items][item] > 0) {
                    totalCount += cartItem[items][item];
                }
            }
        }
        return totalCount;
    };

    const getUserCart = async () => {
        if (!token) return;
        try {
            const response = await axios.get(`${url}/api/cart/get`, { headers: { token } });
            if (response.data.success) {
                setCartItem(response.data.cartData);
            }
        } catch (err) {
            toastr.error(err.response?.data?.message);
        }
    };

    const removeCartItem = async (itemId, size) => {
        let cartData = JSON.parse(JSON.stringify(cartItem));

        if (cartData[itemId] && cartData[itemId][size]) {
            delete cartData[itemId][size];

            // If no sizes remain for the item, remove the item from the cart
            if (Object.keys(cartData[itemId]).length === 0) {
                delete cartData[itemId];
            }

            setCartItem(cartData);

            if (token) {
                try {
                    await axios.delete(`${url}/api/cart/remove`, {
                        data: { itemId, size },
                        headers: { token }
                    });
                    toastr.success("Item removed from cart");
                } catch (err) {
                    toastr.error(err.response?.data?.message);
                }
            }
        }
    };


    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        if (storedToken) {
            setToken(storedToken);
        }
    }, []);

    useEffect(() => {
        if (token) {
            getUserCart();
        }
    }, [token]);

    const fetchProduct = async (id) => {
        if (productData[id]) {
            return productData[id];
        }

        try {
            const res = await axios.get(`${url}/api/product/${id}`);
            const product = res.data.product;
            setProductData((prev) => ({ ...prev, [id]: product }));
            return product;
        } catch (err) {
            toastr.error(err.response?.data?.message);
            return null;
        }
    };

    const getCartAmount = () => {
        let totalAmount = 0;

        for (const itemId in cartItem) {
            const itemInfo = productData[itemId]; // Directly access the product data

            if (!itemInfo) continue; // Skip if product data is not available

            for (const size in cartItem[itemId]) {
                try {
                    if (cartItem[itemId][size] > 0) {
                        totalAmount += itemInfo.price * cartItem[itemId][size];
                    }
                } catch (err) {
                    toastr.error(err.response?.data?.message);
                }
            }
        }

        return totalAmount;
    };


    const value = {
        currency,
        delivery_fee,
        cartItem,
        getCartCount,
        addToCart,
        updateCart, // ✅ Included updateCart in context
        getUserCart,
        removeCartItem,
        fetchProduct,
        productData,
        getCartAmount,
    };

    return <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>;
};

export default ShopContextProvider;
