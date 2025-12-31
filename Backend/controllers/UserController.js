import { generateToken } from '../config/GenerateToken.js'
import User from '../models/UserModel.js'
import bcrypt from 'bcrypt'
import validator from 'validator'
import jwt from "jsonwebtoken";


export const registerUser = async (req, res) => {
    try {
        const { username, email, password } = req.body
        let user = await User.findOne({ email })
        if (user) {
            return res.status(400).json({ message: 'User already exists' })
        }
        if (!validator.isEmail(email)) {
            return res.status(400).json({ message: 'Please enter a valid email' })
        }
        if (password.length < 8) {
            return res.status(400).json({ message: 'Password must be at least 8 characters long and contain at least one lowercase letter, one uppercase letter, one number and one special character' })
        }
        bcrypt.genSalt(10, function (err, salt) {
            bcrypt.hash(password, salt, async function (err, hash) {
                let newUser = await User.create({
                    username,
                    email,
                    password: hash
                })
                let token = generateToken(newUser);
                res.cookie("token", token, { httpOnly: true });
                res.status(201).json({ message: "User created", token });

            });
        })
    } catch (err) {
        res.status(500).json({ message: 'Internal server error' })
    }
}

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        const token = generateToken(user);

        res.cookie("token", token, {
            httpOnly: true,
            sameSite: "Strict",
        });
        res.status(201).json({ message: "Login successful", token });

    } catch (error) {
        return res.status(500).json({ message: "Server error, please try again" });
    }
};


export const adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!process.env.ADMIN_EMAIL || !process.env.ADMIN_PASSWORD || !process.env.JWT_SECRET) {
            return res.status(500).json({ message: "Server configuration error" });
        }

        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: "2h" });

            return res.json({ success: true, token });
        } else {
            return res.status(401).json({ message: "Invalid email or password" });
        }
    } catch (err) {
        return res.status(500).json({ message: "Server error, please try again" });
    }
};

