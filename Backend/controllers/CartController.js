import User from '../models/UserModel.js';

export const addToCart = async (req, res) => {
    try {
        const { userId, itemId, size } = req.body;

        const userData = await User.findById(userId);

        let cartData = await userData.cartData;

        if (!cartData[itemId]) {
            cartData[itemId] = {};
        }
        cartData[itemId][size] = (cartData[itemId][size] || 0) + 1;

        await User.findByIdAndUpdate(userId, { cartData });

        res.json({ success: true, message: "Added to cart", cartData });

    } catch (err) {
        res.status(500).json({ success: false, message: "Server error" });
    }
};

export const updateCart = async (req, res) => {
    try {
        const { userId, itemId, size, quantity } = req.body;

        const userData = await User.findById(userId);

        let cartData = await userData.cartData;
        cartData[itemId][size] = quantity;

        await User.findByIdAndUpdate(userId, { cartData });

        res.json({ success: true, message: "Cart Updated", cartData });
    } catch (err) {
        res.status(500).json({ success: false, message: "Server error" });
    }
};

export const getUserCart = async (req, res) => {
    try {
        const { userId } = req.body;

        const userData = await User.findById(userId);
        let cartData = await userData.cartData;

        res.json({ success: true, cartData: userData.cartData || {} });
    } catch (err) {
        res.status(500).json({ success: false, message: "Server error" });
    }
};

export const removeCartItem = async (req, res) => {
    try {
        const { userId, itemId, size } = req.body;

        const userData = await User.findById(userId);
        let cartData = userData.cartData;

        if (cartData[itemId] && cartData[itemId][size]) {
            delete cartData[itemId][size];

            if (Object.keys(cartData[itemId]).length === 0) {
                delete cartData[itemId];
            }

            await User.findByIdAndUpdate(userId, { cartData });

            res.json({ success: true, message: "Item removed from cart", cartData });
        } else {
            res.status(404).json({ success: false, message: "Item not found in cart" });
        }
    } catch (err) {
        res.status(500).json({ success: false, message: "Server error" });
    }
};
