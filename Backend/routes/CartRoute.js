import express from "express";
import { addToCart, updateCart, getUserCart, removeCartItem } from "../controllers/CartController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/add", authMiddleware, addToCart);
router.put("/update", authMiddleware, updateCart);
router.get("/get", authMiddleware, getUserCart);
router.delete("/remove", authMiddleware, removeCartItem);

export default router;
