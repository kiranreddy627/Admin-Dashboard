import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/api/admins/login', {
        usernameOrEmail: email,
        password,
        rememberMe,
      });

      console.log('Login successful:', response.data);

      // Store token in localStorage (or sessionStorage, based on preference)
      localStorage.setItem('token', response.data.token); // Store JWT token

      // Redirect to dashboard after login success
      navigate('/dashboard'); // Use 'navigate' from react-router-dom

    } catch (err) {
      setError('Login failed. Please check your credentials and try again.');
      console.error('Login error:', err.response ? err.response.data : err.message);
    }
  };

  // Inline styles
  const styles = {
    wrapper: {
      backgroundColor: '#fff',
      borderRadius: '12px',
      boxShadow: '0 0 20px rgba(0, 0, 0, 0.1)',
      width: '100%',
      maxWidth: '400px',
      padding: '30px',
      textAlign: 'center',
      margin: 'auto',
    },
    title: {
      fontSize: '28px',
      fontWeight: 'bold',
      color: '#333',
      marginBottom: '20px',
    },
    field: {
      position: 'relative',
      marginBottom: '20px',
    },
    input: {
      width: '100%',
      padding: '14px',
      border: '1px solid #ccc',
      borderRadius: '8px',
      outline: 'none',
      fontSize: '16px',
    },
    label: {
      position: 'absolute',
      left: '14px',
      top: '14px',
      color: '#999',
      fontSize: '16px',
      pointerEvents: 'none',
      transition: '0.3s',
    },
    content: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '20px',
      fontSize: '14px',
      color: '#555',
    },
    checkbox: {
      marginRight: '8px',
    },
    link: {
      color: '#6a11cb',
      textDecoration: 'none',
      fontWeight: 'bold',
    },
    submitButton: {
      background: 'linear-gradient(to right, #6a11cb, #2575fc)',
      color: 'white',
      border: 'none',
      cursor: 'pointer',
      fontSize: '18px',
      padding: '12px',
      borderRadius: '8px',
      transition: 'opacity 0.3s',
    },
    error: {
      color: 'red',
      fontSize: '14px',
      marginBottom: '20px',
    },
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.title}>Login Form</div>
      {error && <div style={styles.error}>{error}</div>}
      <form onSubmit={handleSubmit}>
        <div style={styles.field}>
          <input
            type="text"
            style={styles.input}
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label style={styles.label}>Email Address or Username</label>
        </div>
        <div style={styles.field}>
          <input
            type="password"
            style={styles.input}
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <label style={styles.label}>Password</label>
        </div>
        <div style={styles.content}>
          <div>
            <input
              type="checkbox"
              id="remember-me"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              style={styles.checkbox}
            />
            <label htmlFor="remember-me">Remember me</label>
          </div>
          <div>
            <a href="" style={styles.link}>
              Forgot password?
            </a>
          </div>
        </div>
        <div>
          <input type="submit" value="Login" style={styles.submitButton} />
        </div>
        <div style={{ marginTop: '20px' }}>
          Not a member?{' '}
          <a href="/signup" style={styles.link}>
            Signup now
          </a>
        </div>
      </form>
    </div>
  );
};

export default Login;
