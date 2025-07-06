
const User = require('../models/User');
const jsonwebtoken = require('jsonwebtoken');
const signin = async (req, res) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        return res.status(400).json({ msg: "All fields are required" });
    }
    const existing = await User.findOne({ email });
    if (existing) {
        return res.status(400).json({ msg: "User already exists" });
    }
    const user = new User({ username, email, password });
    await user.save();
    res.status(201).json({ msg: "User registered successfully" });
};


const login = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).send("Email and password are required");
    }
    const found = await User.findOne({ email });
    if (!found) {
        return res.status(404).send("User not found");
    }
    if (found.password !== password) {
        return res.status(401).send("Invalid password");
    }
    const token = jsonwebtoken.sign({ id: found._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ message: "Login successful", token });
}

module.exports = { signin, login };
