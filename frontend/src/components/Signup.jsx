import React, { useState } from 'react';
import axios from 'axios';
import { Navigate } from 'react-router-dom';

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',  // changed fullName to name
    username: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    gender: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleGenderChange = (e) => {
    setFormData({ ...formData, gender: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send the data to the backend
      const response = await axios.post('http://localhost:5000/api/admins/signup', formData);
      console.log('Registration successful:', response.data);
      // You can redirect the user or display a success message
      Navigate('/login');
    } catch (err) {
      console.error('Registration error:', err);
      // Handle error (e.g., display error message to the user)
    }
  };

  // Inline styles...
  const styles = {
    container: {
      width: '100%',
      maxWidth: '600px',
      margin: 'auto',
      backgroundColor: '#fff',
      padding: '30px',
      borderRadius: '8px',
      boxShadow: '0 0 15px rgba(0, 0, 0, 0.1)',
    },
    title: {
      textAlign: 'center',
      fontSize: '28px',
      marginBottom: '20px',
      fontWeight: 'bold',
    },
    inputBox: {
      marginBottom: '20px',
      display: 'flex',
      flexDirection: 'column',
    },
    input: {
      padding: '10px',
      borderRadius: '5px',
      border: '1px solid #ccc',
      fontSize: '16px',
    },
    genderDetails: {
      marginBottom: '20px',
    },
    genderTitle: {
      fontSize: '18px',
      marginBottom: '10px',
    },
    category: {
      display: 'flex',
      justifyContent: 'space-around',
    },
    dot: {
      height: '15px',
      width: '15px',
      borderRadius: '50%',
      marginRight: '5px',
      display: 'inline-block',
      cursor: 'pointer',
    },
    button: {
      textAlign: 'center',
    },
    submitButton: {
      padding: '10px 20px',
      backgroundColor: '#6a11cb',
      color: '#fff',
      border: 'none',
      borderRadius: '5px',
      fontSize: '18px',
      cursor: 'pointer',
    },
  };
  
  return (
    <div style={styles.container}>
      <div style={styles.title}>Registration</div>
      <form onSubmit={handleSubmit}>
        <div className="user-details">
          <div style={styles.inputBox}>
            <label>Full Name</label>
            <input
              type="text"
              placeholder="Enter your name"
              value={formData.name}  // changed fullName to name
              onChange={handleChange}
              name="name"  // changed fullName to name
              style={styles.input}
              required
            />
          </div>

          <div style={styles.inputBox}>
            <label>Username</label>
            <input
              type="text"
              placeholder="Enter your username"
              value={formData.username}
              onChange={handleChange}
              name="username"
              style={styles.input}
              required
            />
          </div>

          <div style={styles.inputBox}>
            <label>Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              name="email"
              style={styles.input}
              required
            />
          </div>

          <div style={styles.inputBox}>
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              name="password"
              style={styles.input}
              required
            />
          </div>

          <div style={styles.inputBox}>
            <label>Confirm Password</label>
            <input
              type="password"
              placeholder="Confirm your password"
              value={formData.confirmPassword}
              onChange={handleChange}
              name="confirmPassword"
              style={styles.input}
              required
            />
          </div>
        </div>

        <div style={styles.button}>
          <input type="submit" value="Register" style={styles.submitButton} />
        </div>
      </form>
    </div>
  );
};

export default Signup;
