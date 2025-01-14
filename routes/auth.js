// routes/auth.js
const express = require('express');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
require('dotenv').config
const router = express.Router();



router.post('/register', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = new User({ username, password });
        await user.save();
        res.status(201).send('User registered successfully');
    } catch (error) {
        res.status(400).send(error.message);
    }
});

router.post('/login', async (req, res) => {
    // Log because I'm unsure
    console.log('Login route hit');

    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        if (!user || !(await user.comparePassword(password))) {
            return res.status(400).send('Invalid credentials');
        }
        const secret = process.env.JWT_SECRET
        const token = jwt.sign({ id: user._id }, secret);
        res.send({ token });
    } catch (error) {
        res.status(400).send(error.message);
    }
});

module.exports = router;