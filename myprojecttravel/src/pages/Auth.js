import React, { useState, useContext } from 'react';
import { Col, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { BASE_URL } from '../utils/config';

function Auth() {
  const [credentials, setCredentials] = useState({
    username: '',
    email: '',
    password: ''
  });

  const [errors, setErrors] = useState({
    email: '',
    password: ''
  });

  const { dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const validatePassword = (password) => {
    // Password must be at least 8 characters long and contain at least one number
    const regex = /^(?=.*\d)(?=.*[a-zA-Z]).{8,}$/;
    return regex.test(password);
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setCredentials((prev) => ({ ...prev, [id]: value }));

    // Validate inputs as they are typed
    if (id === 'email') {
      setErrors((prev) => ({
        ...prev,
        email: validateEmail(value) ? '' : 'Invalid email address'
      }));
    } else if (id === 'password') {
      setErrors((prev) => ({
        ...prev,
        password: validatePassword(value) ? '' : 'Password must be at least 8 characters long and contain at least one number'
      }));
    }
  };

  const handleClick = async (e) => {
    e.preventDefault();
    // Validate email and password before sending request
    if (!validateEmail(credentials.email)) {
      alert('Please enter a valid email address');
      return;
    }
    if (!validatePassword(credentials.password)) {
      alert('Password must be at least 8 characters long and contain at least one number');
      return;
    }

    try {
      const res = await fetch(`${BASE_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
      });
      const result = await res.json();
      if (!res.ok) {
        alert(result.message);
        return;
      }
      dispatch({ type: 'REGISTER_SUCCESS' });
      navigate('/login');
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className='mainBack'>
      <div className='register shadow'>
        <center>
          <h1 style={{ color: '#177ad1' }}>Register</h1>
          <Form>
            <div className='input-box'>
              <input type="text" placeholder='Username' id='username' onChange={handleChange} required />
              <i className='bx bxs-user'></i>
            </div>
            <div className='input-box'>
              <input type="text" placeholder='Email' id='email' onChange={handleChange} required />
              <i className='bx bxs-envelope'></i>
              {errors.email && <small style={{ color: 'red' }}>{errors.email}</small>}
            </div>
            <div className='input-box'>
              <input type="password" placeholder='Password' id='password' onChange={handleChange} required />
              <i className='bx bxs-lock-alt'></i>
              {errors.password && <small style={{ color: 'red' }}>{errors.password}</small>}
            </div>
            <Button className='w-100' style={{ backgroundColor: '#177ad1', borderRadius: '40px' }} onClick={handleClick}>Register</Button>{' '}
            <Link to="/login" style={{ textDecoration: 'none' }}><span style={{ color: 'white' }}>Already registered? Login here</span></Link>
          </Form>
        </center>
      </div>
    </div>
  );
}

export default Auth;
