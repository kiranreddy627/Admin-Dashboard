const mongoose = require('mongoose');

// Define allowed user statuses
const statusEnum = ['Active', 'Inactive'];

// Define allowed roles (consistent with the Role model's enum)
const roleEnum = ['Admin', 'Editor', 'Viewer', 'Moderator'];

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  role: {
    type: String,
    enum: roleEnum,  // Role restriction using enum
    required: true,
    default: 'Viewer',  // Default role
  },
  status: {
    type: String,
    enum: statusEnum,  // Status restriction using enu
  },
});

module.exports = mongoose.model('User', userSchema);
