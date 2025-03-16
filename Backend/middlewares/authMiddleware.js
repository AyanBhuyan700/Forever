import jwt from "jsonwebtoken";

export const authMiddleware = async (req, res, next) => {
    const token = req.header("Authorization");
    try {
        const { token } = req.headers
        if (!token) {
            return res.json({ success: false, message: "Access denied. No token provided." });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.body.userId = decoded.id;
        next();
    } catch (error) {
        return res.status(401).json({ success: false, message: "Invalid or expired token." });
    }
};
