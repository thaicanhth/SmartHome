import { User } from "../models/User.js";
import { hashPassword, comparePassword } from "../helpers/auth.js";
import jwt from "jsonwebtoken";

export const test = (req, res) => {
    res.json('test is working')
}


// Register
export const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name) {
            return res.json({
                error: 'name is required'
            })
        }

        if (!password || password.length < 3) {
            return res.json({
                error: 'password is required and should be at least 3 characters long'
            })
        }

        const exist = await User.findOne({ email: email })
        if (exist) {
            return res.json({
                error: 'email is taken already'
            })
        }

        const hashedPassword = await hashPassword(password)
        const user = await User.create({
            name, email, password: hashedPassword,
        })

        return res.status(201).send(user)
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: error.message })
    }
}

// Login
export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // check if user exists
        const user = await User.findOne({ email })
        if (!user) {
            return res.json({
                error: 'No user found'
            })
        }

        // check if password match
        const match = await comparePassword(password, user.password)
        if (match) {
            jwt.sign({ email: user.email, id: user._id, name: user.name }, process.env.JWT_SECRET, {expiresIn: "1h"}, (err, token) => {
                if (err) throw err;
                res.cookie('token', token).json({ user , accessToken: token})
            })
        }
        if (!match) {
            res.json({
                error: 'passwords is not match'
            })
        }
    } catch (error) {
        console.log(error);
    }
}

// Profile
export const getProfile = (req, res) => {
    const { token } = req.cookies
    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, {}, (err, user) => {
            if (err) throw err;
            res.json(user)
        })
    } else {
        res.json(null)
    }
}