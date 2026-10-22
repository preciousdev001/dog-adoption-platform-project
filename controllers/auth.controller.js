const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// register
const register = async (req, res) => {
    try {
        const { username, password } = req.body;

        const existingUser = await User.findOne({username});
        if (existingUser) {
            return res.status(409).json({error: 'Username is already taken.'});
        }
        const newUser = new User({username, password});
        await newUser.save(); //bcrypt pre-save hook

        res.status(201).json({message: 'User '})
    }
}