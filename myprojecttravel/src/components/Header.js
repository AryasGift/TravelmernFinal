import React, { useContext, useRef } from 'react';
import { Container, Nav, NavDropdown, Navbar } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

function Header() {
  const headerRef = useRef(null);
  const navigate = useNavigate();
  const { user, dispatch } = useContext(AuthContext);

  const logout = () => {
    dispatch({ type: 'LOGOUT' });
    navigate('/');
  };

  const handleUserClick = () => {
    if (user && user.username === 'admin') {
      navigate('/admin/deleteBooking');
    } else {
      navigate('/booking/book_list');
    }
  };

  return (
    <div>
      <nav className="navbar sticky-top navbar-expand-lg bg-body-tertiary">
        <div className="container d-flex justify-content-between align-items-center">

          <a className="navbar-brand" href="#">
            <img src="https://i.postimg.cc/76bZSbZ3/005-removebg-preview.png" alt="" width="140" height="35" className="d-inline-block align-text-top" />
          </a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse container" id="navbarSupportedContent">
            <ul className="navbar-nav mb-lg-0 ms-auto ps-5">
              {
                user && user.username === "admin" ?
                <Link to="/admin/allBooking" style={{textDecoration:'none'}}>
                  <li className="nav-item">
                    <a className="nav-link" aria-current="page" href="#" style={{ color: 'black' }}>Booking</a>
                  </li>
                  </Link> :
                  <Link to="/" style={{ textDecoration: 'none' }}>
                    <li className="nav-item">
                      <a className="nav-link" aria-current="page" href="#" style={{ color: 'black' }}>Home</a>
                    </li>
                  </Link>
              }

              {user && user.username === "admin" ?
                <Link to={'/admin/createBooking'} style={{ textDecoration: 'none' }}>
                  <li className="nav-item">
                    <a className="nav-link" href="#" style={{ color: 'black' }}>Add</a>
                  </li>
                </Link> :
                <li className="nav-item">
                  <a className="nav-link" href="#" style={{ color: 'black' }}>About</a>
                </li>
              }
              <li className="nav-item">
                <Link to='/tours' style={{ textDecoration: 'none' }}>
                  <a className="nav-link" href="#" style={{ color: 'black' }}>Tour</a>
                </Link>
              </li>
            </ul>
          </div>
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav mb-2 mb-lg-0 mx-5 ms-auto ps-3">
              {user ? (
                <li className="nav-item d-flex">
                  <a className="nav-link" href="#" style={{ color: 'black' }} onClick={handleUserClick}>{user.username}</a>
                  <li className='nav-item ms-3'>
                    <Button onClick={logout} style={{ backgroundColor: '#ff9f00', borderRadius: '20px' }}>LogOut</Button>
                  </li>
                </li>
              ) : (
                <li className="nav-item d-flex">
                  <Link to="/login" style={{ textDecoration: 'none' }}>
                    <a className="nav-link" href="#" style={{ color: 'black' }}>Login</a>
                  </Link>
                  <li className='nav-item ms-3'>
                    <Link to="/register">
                      <Button style={{ backgroundColor: '#ff9f00', borderRadius: '20px' }}>Register</Button>
                    </Link>
                  </li>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Header;
