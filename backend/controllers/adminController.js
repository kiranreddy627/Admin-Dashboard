require('dotenv').config();
const Admin = require('../models/Admin');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// const Admin = require('../models/Admin');
// const bcrypt = require('bcryptjs');

exports.signup = async (req, res) => {
    console.log(req.body);
    try {
        console.log(req.body);
        const { username, name, email, password, confirmPassword } = req.body;

        // Basic validation for required fields
        if (!username || !name || !email || !password || !confirmPassword) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        // Check if passwords match
        if (password !== confirmPassword) {
            return res.status(400).json({ message: 'Passwords do not match' });
        }

        // Check if email already exists in the database
        const existingAdmin = await Admin.findOne({ email });
        if (existingAdmin) {
            return res.status(400).json({ message: 'Email is already registered' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new admin
        const admin = new Admin({ username, name, email, password: hashedPassword });

        // Save the new admin to the database
        await admin.save();

        res.status(201).json({ message: 'Admin created successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};




exports.login = async (req, res) => {
    try {
        const { usernameOrEmail, password } = req.body;

        // Find the admin by either username or email
        const admin = await Admin.findOne({
            $or: [
                { email: usernameOrEmail },  // Check if usernameOrEmail matches the email
                { username: usernameOrEmail } // Check if usernameOrEmail matches the username
            ]
        });

        if (!admin) {
            return res.status(401).json({ message: 'Invalid credentials' }); // Invalid credentials message for both email and password errors
        }

        // Compare the provided password with the hashed password in the database
        const isPasswordValid = await bcrypt.compare(password, admin.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid credentials' }); // Keep the error message generic for security reasons
        }

        // Generate a JWT token with admin ID and expiration time
        const token = jwt.sign({ adminId: admin._id }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRATION || '1h', // Use the expiration from env, fallback to 1 hour
        });

        // Return a response with the token and admin details (excluding sensitive fields like password)
        const adminData = {
            username: admin.username,
            email: admin.email,
        };

        res.json({ token, admin: adminData });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};
