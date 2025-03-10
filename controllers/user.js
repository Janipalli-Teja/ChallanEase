const { v4: uuidv4 } = require("uuid");
const User = require("../model/user");
const { setUser } = require("../service/auth");
const Joi = require('joi');


const singupValidation = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required()
})

async function handleUserSignup(req, res) {
    try {
        const result = await singupValidation.validateAsync(req.body)
    } catch (error) {
        console.error("invalid data", error)
        return res.status(400).json({message: 'invalid input data'})
    }
    try {
        const { name, email, password } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: "Duplicate registration" });
        }

        // Create new user
        const user = await User.create({ name, email, password });

        res.status(201).json({ message: "User created successfully!" , user});
    } catch (error) {
        console.error("signup failed with error : ", error)
        res.status(500).json({ error: "Signup failed. Please try again." });
    }
}

async function handleUserLogin(req, res) {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email, password });

        if (!user) {
            return res.status(401).json({ error: "Invalid email or password" });
        }

        const sessionId = uuidv4();
        setUser(sessionId, user);
        res.cookie("uid", sessionId, { httpOnly: true });

        res.status(200).json({ message: "Login successful!" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Login failed. Please try again." });
    }
}

module.exports = {
    handleUserSignup,
    handleUserLogin,
};
