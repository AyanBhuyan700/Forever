import orderModel from "../models/OrderModel.js";
import User from "../models/UserModel.js";
import Stripe from "stripe";
import dotenv from "dotenv";
dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const placeOrder = async (req, res) => {
    try {
        const { userId, items, address, amount, paymentMethod } = req.body;

        let clientSecret = null;

        if (paymentMethod === "Stripe") {
            const paymentIntent = await stripe.paymentIntents.create({
                amount: amount * 100,
                currency: "usd",
                automatic_payment_methods: {
                    enabled: true,
                    allow_redirects: "never",
                },
            });

            clientSecret = paymentIntent.client_secret;
        }

        const orderData = {
            userId,
            items,
            address,
            amount,
            paymentMethod,
            payment: paymentMethod === "COD" ? false : true,
            status: "Order Placed",
            date: Date.now(),
        };

        const newOrder = new orderModel(orderData);
        await newOrder.save();
        await User.findByIdAndUpdate(userId, { cartData: {} });

        res.status(201).json({
            success: true,
            message: "Order placed successfully!",
            order: newOrder,
            clientSecret,
        });

    } catch (err) {
        res.status(500).json({ success: false, message: "Failed to place order. Please try again." });
    }
};
