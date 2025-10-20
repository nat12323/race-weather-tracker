const User = require('../models/user');
const jwt = require('jsonwebtoken');

//Create a JWT
const generateToken = (userId, email) => {
    return jwt.sign(
        { userId, email },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN || '24h' }
    );
};

//Register user
const register = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        //Validate the user
        if (!username || !email || !password) {
            return res.status(400).json('All fields required. Try again');
        }

        //Ensure email correct formatting
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json('Incorrect email formatting');
        }

        //Password length check
        if (password.length < 6) {
            return res.status(400).json({ error: 'Password must be at least 6 characters long'});
        }

        //Check if email exists
        const existingEmail = await User.findByEmail(email);
        if (existingEmail) {
            return res.status(400).json({ error: 'Email already in use'});
        }
        

        //Check if user exists
        const existingUser = await User.findByUsername(username)
        if (existingUser) {
            return res.status(400).json({ error: 'Username already in us' });
        }

        //Create user
        const newUser = await User.createUser(username, email, password);

        //Create token
        const token = generateToken(newUser.id, newUser.email);


        res.status(201).json({
            message: 'User registered successfully',
            token,
            user: {
                id: newUser.id,
                username: newUser.username,
                email: newUser.email
            }
        })

    } catch (error) {
        console.error('Registration error', error);
        res.status(500).json({ error: 'Registration failed' });
    }
}

//User Login
const login = async (req, res) => {

    try {
    
        const { email, password } = req.body;

        //Validate
        if (!email || !password) {
            return res.status(400).json({ error: 'Email and password required'})
        }

        //Find user
        const user = await User.findByEmail(email);
        if (!user) {
            return res.status(400).json({ error: 'User not foound'})
        }

        //Password check
        const passwordCheck = await User.comparePassword(password, user.password)
        if (!passwordCheck) {
            return res.status(401).json({ error: 'Invalid email or password' })
        }

        //Generate token
        const token = generateToken(user.id, user.email);

        res.json({
            message: 'Login successful',
            token,
            user: {
                id: user.id,
                username: user.username,
                email: user.email
            }
        })


    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ error: 'Login failed' })
    }




}

module.exports = {
    generateToken,
    register,
    login
};