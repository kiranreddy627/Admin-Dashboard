import React, { useState, useEffect } from 'react';
import {
  TextField,
  Button,
  Select,
  MenuItem,
  Container,
  Typography,
  Box,
  Grid,
  FormControl,
  InputLabel,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  RadioGroup,
  Radio,
  FormControlLabel,
  Paper,
} from '@mui/material';
import axios from 'axios';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState(['Admin', 'Editor', 'Viewer']);
  const [newUser, setNewUser] = useState({ username: '', email: '', role: '', status: 'active' });
  const [editingUser, setEditingUser] = useState(null);
  const [openEditDialog, setOpenEditDialog] = useState(false);

  // Fetch existing users
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/users/getUsers');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleCreateUser = async () => {
    try {
      await axios.post('http://localhost:5000/api/users/createUser', newUser);
      fetchUsers();
      setNewUser({ username: '', email: '', role: '', status: '' });
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };

  const handleRoleUpdate = async (userId, newRole) => {
    try {
      await axios.put(`http://localhost:5000/api/users/updateUser/${userId}`, { role: newRole });
      fetchUsers();
      alert('Role updated successfully');
    } catch (error) {
      console.error('Error updating role:', error);
    }
  };

  const handleDeleteUser = async (userId) => {
    try {
      await axios.delete(`http://localhost:5000/api/users/deleteUser/${userId}`);
      fetchUsers();
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handleEditUser = (user) => {
    setEditingUser(user);
    setOpenEditDialog(true);
  };

  const handleUpdateUser = async () => {
    try {
      await axios.put(`http://localhost:5000/api/users/updateUser/${editingUser._id}`, {
        username: editingUser.username,
        email: editingUser.email,
        status: editingUser.status,
      });
      fetchUsers();
      setOpenEditDialog(false);
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Admin Dashboard
      </Typography>

      {/* User Creation Form */}
      <Paper elevation={3} sx={{ p: 4, mb: 4 }}>
        <Typography variant="h6" gutterBottom>Create New User</Typography>
        <Grid container spacing={2}>
          <Grid item xs={3}>
            <TextField
              fullWidth
              label="Username"
              value={newUser.username}
              onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              fullWidth
              label="Email"
              value={newUser.email}
              onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
            />
          </Grid>
          <Grid item xs={3}>
            <FormControl fullWidth>
              <InputLabel>Role</InputLabel>
              <Select
                value={newUser.role}
                onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
              >
                {roles.map((role, index) => (
                  <MenuItem key={index} value={role}>
                    {role}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={3}>
            <FormControl component="fieldset">
              <RadioGroup
                row
                value={newUser.status}
                onChange={(e) => setNewUser({ ...newUser, status: e.target.value })}
              >
                <FormControlLabel value="Active" control={<Radio />} label="Active" />
                <FormControlLabel value="Inactive" control={<Radio />} label="Inactive" />
              </RadioGroup>
            </FormControl>
          </Grid>
          <Grid item xs={12} align="right">
            <Button variant="contained" color="primary" onClick={handleCreateUser}>
              Create User
            </Button>
          </Grid>
        </Grid>
      </Paper>

      {/* User List */}
      <Typography variant="h5" gutterBottom>User List</Typography>
      {users.map((user) => (
        <Paper key={user._id} elevation={3} sx={{ mb: 2, p: 3, borderRadius: '8px' }}>
          <Grid container alignItems="center" spacing={2}>
            <Grid item xs={3}>
              <Typography variant="subtitle1"><strong>{user.username}</strong></Typography>
              <Typography variant="body2" color="textSecondary">{user.status}</Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography>{user.email}</Typography>
            </Grid>
            <Grid item xs={3}>
              <FormControl fullWidth>
                <Select
                  value={user.role}
                  onChange={(e) => handleRoleUpdate(user._id, e.target.value)}
                >
                  {roles.map((role, index) => (
                    <MenuItem key={index} value={role}>
                      {role}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={3} display="flex" justifyContent="space-around">
              <Button variant="outlined" color="primary" onClick={() => handleEditUser(user)}>
                Edit
              </Button>
              <Button variant="outlined" color="secondary" onClick={() => handleDeleteUser(user._id)}>
                Delete
              </Button>
            </Grid>
          </Grid>
        </Paper>
      ))}

      {/* Edit User Dialog */}
      {editingUser && (
        <Dialog open={openEditDialog} onClose={() => setOpenEditDialog(false)}>
          <DialogTitle>Edit User</DialogTitle>
          <DialogContent>
            <TextField
              margin="dense"
              label="Username"
              fullWidth
              value={editingUser.username}
              onChange={(e) => setEditingUser({ ...editingUser, username: e.target.value })}
            />
            <TextField
              margin="dense"
              label="Email"
              fullWidth
              value={editingUser.email}
              onChange={(e) => setEditingUser({ ...editingUser, email: e.target.value })}
            />
            <FormControl component="fieldset" sx={{ mt: 2 }}>
              <RadioGroup
                row
                value={editingUser.status}
                onChange={(e) => setEditingUser({ ...editingUser, status: e.target.value })}
              >
                <FormControlLabel value="active" control={<Radio />} label="Active" />
                <FormControlLabel value="inactive" control={<Radio />} label="Inactive" />
              </RadioGroup>
            </FormControl>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenEditDialog(false)} color="secondary">
              Cancel
            </Button>
            <Button onClick={handleUpdateUser} color="primary">
              Update
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </Container>
  );
};

export default AdminDashboard;
