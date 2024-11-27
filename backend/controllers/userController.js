const User = require('../models/User');
const bycrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
//login
// exports.login = async (req, res) => {
//     const { email, password } = req.body;
//     try {
//         const user = await User.findOne({ email });
//         if (!user) return res.status(401).json({ message: 'User not found' });
//         const isPasswordValid = await bycrypt.compare(password, user.password);
//         if (!isPasswordValid) return res.status(401).json({ message: 'Invalid password' });
//         const token = jwt.sign({ userId: user._id }, 'secret', { expiresIn: '1h' });
//         res.json({ token, user });
//     } catch (error) {
//         res.status(500).json({ message: 'Server Error', error });
//     }
// }


// //signup
// exports.signup = async (req, res) => {
//     const { username, email, password } = req.body;
//     try {
//         const existingUser = await User.findOne({ email });
//         if (existingUser) return res.status(400).json({ message: 'User already exists' });
//         const hashedPassword = await bycrypt.hash(password, 10);
//         const newUser = new User({ username, email, password: hashedPassword });
//         await newUser.save();
//         res.status(201).json({ message: 'User created successfully' });
//     } catch (error) {
//         res.status(500).json({ message: 'Server Error', error });
//     }
// }

// Get all users
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
};

// Get a single user by ID
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
};

// Create a new user
exports.createUser = async (req, res) => {
  // console.log(req.body);
  const { username, email, role, status } = req.body;
  try {
    const newUser = new User({ username, email, role, status });
    await newUser.save();
    console.log(newUser);
    res.status(201).json(newUser);
    console.log('User created successfully');
  } catch (error) {
    res.status(400).json({ message: 'Failed to create user', error });
  }
};

// Update a user by ID
 // Adjust the path as per your project structure

exports.updateUser = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedUser) return res.status(404).json({ message: 'User not found' });
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
};


// Delete a user by ID
exports.deleteUser = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) return res.status(404).json({ message: 'User not found' });
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
};
