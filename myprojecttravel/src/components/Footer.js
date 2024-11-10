import { type } from '@testing-library/user-event/dist/type'
import React from 'react'

function Footer() {
    return (
        <div>
            <div className='footer d-flex mt-5'>
                <div className='footer1 m-5'>
                    <img src="https://i.postimg.cc/76bZSbZ3/005-removebg-preview.png" alt="" width="140" height="35" class="d-inline-block align-text-top" />
                    <p className='mt-3'>Lorem ipsum dolor, sit amet consectetur adipisicing elit.</p>
                    <div className='icons d-flex mt-3'>
                        <i className="fa-brands fa-youtube"></i>
                        <i className="fa-brands fa-github ms-3"></i>
                        <i className="fa-brands fa-facebook ms-3"></i>
                        <i className="fa-brands fa-instagram ms-3"></i>
                    </div>
                </div>
                <div className='footer2 m-5'>
                    <h4 style={{ color: '#1a4da1'}} className='ms-4'>Discover</h4>
                    <ul style={{"list-style-type":'none'}}>
                        <li className='mt-3'>Home</li>
                        <li className='mt-3'>About</li>
                        <li className='mt-3'>Tour</li>
                    </ul>
                </div>
                <div className='footer3 m-5'>
                    <h4 style={{ color: '#1a4da1'}} className='ms-4'>Quick Links</h4>
                    <ul style={{"list-style-type":'none'}}>
                        <li className='mt-3'>Gallery</li>
                        <li className='mt-3'>Login</li>
                        <li className='mt-3'>Register</li>
                    </ul>
                </div>
                <div className='footer4 mt-5'>
                    <h4 style={{ color: '#1a4da1'}} className='ms-4'>Contact</h4>
                    <ul style={{"list-style-type":'none'}}>
                        <li className='mt-3'><i className="fa-solid fa-location-dot me-2"></i>Address: Civil Station,kozhikode</li>
                        <li className='mt-3'><i className="fa-solid fa-envelope me-2"></i>Email: aryavidyar21@gmail.com</li>
                        <li className='mt-3'><i className="fa-solid fa-phone me-2"></i>Phone: +919078399054</li>
                    </ul>
                </div>

            </div>
        </div>
    )
}

export default Footer
