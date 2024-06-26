import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

const dummyUser = {
    username: 'saltman',
    password: 'oai1122',
};

// Login API
router.post('/login', (req, res) => {
    const { username, password } = req.body;

    if (username !== dummyUser.username || password !== dummyUser.password) {
        return res.status(401).json({ msg: 'Invalid credentials' });
    }

    const payload = {
        user: {
            username: dummyUser.username
        }
    };

    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 3600 }, (err, token) => {
        if (err) throw err;
        res.json({ token });
    });
});

export default router;
