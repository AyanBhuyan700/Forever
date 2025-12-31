import Product from "../models/ProductModel.js";
import { v2 as cloudinary } from "cloudinary";


export const createProduct = async (req, res) => {
    try {
        const { name, description, price, category, sizes, subCategory, bestSeller } = req.body;
        const image1 = req.files?.image1?.[0];
        const image2 = req.files?.image2?.[0];

        const images = [image1, image2].filter((item) => item !== undefined);

        let imageUrl = await Promise.all(
            images.map(async (image) => {
                const { path } = image
                const result = await cloudinary.uploader.upload(path);
                return result.secure_url;
            })
        );

        const productData = await Product.create({
            name,
            description,
            price: Number(price),
            category,
            sizes: JSON.parse(sizes),
            subCategory,
            bestSeller: bestSeller === "true" ? true : false,
            image: imageUrl
        });

        res.status(201).json({ message: "Product created successfully" });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

export const getAllProduct = async (req, res) => {
    try {
        const products = await Product.find();
        res.json({ success: true, products })
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

export const deleteProduct = async (req, res) => {
    try {
        await Product.deleteOne(req.query.id)

        res.status(201).json({ message: "Product deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

export const getProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);

        if (!product) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }

        res.status(200).json({ success: true, product });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};
