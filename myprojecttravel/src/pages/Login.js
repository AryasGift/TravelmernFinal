import React, { useContext, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { BASE_URL } from '../utils/config';

function Login() {
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });
  const { dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    dispatch({ type: 'LOGIN_START' });
    try {
      const res = await fetch(`${BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(credentials),
      });
      const result = await res.json();
      if (!res.ok) {
        alert(result.message);
      } else {
        localStorage.setItem('token',result.token)
        dispatch({ type: 'LOGIN_SUCCESS', payload: result.data });
        navigate('/');
      }
    } catch (err) {
      dispatch({ type: 'LOGIN_FAILURE', payload: err.message });
    }
  };

  return (
    <div>
      <div className="mainBack">
        <div className="register shadow">
          <center>
            <h1 style={{ color: '#177ad1' }}>Welcome Back</h1>
            <Form>
              <div className="input-box">
                <input
                  type="text"
                  placeholder="Email"
                  id="email"
                  required
                  onChange={handleChange}
                />
                <i className="bx bxs-envelope"></i>
              </div>
              <div className="input-box">
                <input
                  type="password"
                  placeholder="Password"
                  id="password"
                  required
                  onChange={handleChange}
                />
                <i className="bx bxs-lock-alt"></i>
              </div>
              <Button
                className="w-100"
                style={{ backgroundColor: '#177ad1', borderRadius: '40px' }}
                onClick={handleClick} // Ensure handleClick is passed as a reference
              >
                Log in
              </Button>{' '}
              <Link to="/register" style={{ textDecoration: 'none' }}>
                <span style={{ color: 'white' }}>Not registered? Register here</span>
              </Link>
            </Form>
          </center>
        </div>
      </div>
    </div>
  );
}

export default Login;
