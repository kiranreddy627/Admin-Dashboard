const mongoose = require('mongoose');

const roleEnum = ['Admin', 'Editor', 'Viewer', 'Moderator'];

const roleSchema = new mongoose.Schema({
  name: {
    type: String,
    enum: roleEnum, 
    required: true,
    unique: true,
  },
  permissions: [
    {
      type: String,
      enum: ['read', 'write', 'delete', 'update'], 
    },
  ],
});

module.exports = mongoose.model('Role', roleSchema);
