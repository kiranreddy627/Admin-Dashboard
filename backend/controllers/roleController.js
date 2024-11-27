const Role = require('../models/Role');

// Get all roles
exports.getRoles = async (req, res) => {
  try {
    const roles = await Role.find();
    res.json(roles);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
};

// Get a single role by ID
exports.getRoleById = async (req, res) => {
  try {
    const role = await Role.findById(req.params.id);
    if (!role) return res.status(404).json({ message: 'Role not found' });
    res.json(role);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
};

// Create or update a role
exports.createOrUpdateRole = async (req, res) => {
  const { name, permissions } = req.body;
  try {
    let role = await Role.findOne({ name });
    if (role) {
      // Update existing role
      role.permissions = permissions;
    } else {
      // Create new role
      role = new Role({ name, permissions });
    }
    await role.save();
    res.status(201).json(role);
  } catch (error) {
    res.status(400).json({ message: 'Failed to create/update role', error });
  }
};

// Delete a role by ID
exports.deleteRole = async (req, res) => {
  try {
    const deletedRole = await Role.findByIdAndDelete(req.params.id);
    if (!deletedRole) return res.status(404).json({ message: 'Role not found' });
    res.json({ message: 'Role deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
};
