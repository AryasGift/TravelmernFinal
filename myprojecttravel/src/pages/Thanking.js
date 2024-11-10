import React from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './thankYou.css';

function Thanking() {
    const navigate = useNavigate();

    const handleHomeClick = () => {
        navigate('/');
    };

    return (
        <div className="thank-you">
            <div className="thank-you__content text-center">
                <i className="fa-solid fa-check-circle thank-you__icon"></i>
                <h1>Thank You!</h1>
                <p>Your booking was successful.</p>
                <p>We look forward to seeing you on your tour.</p>
                <Button className="btn primary__btn mt-4" style={{ backgroundColor: '#fc9803' }} onClick={handleHomeClick}>
                    Go to Home
                </Button>
            </div>
        </div>
    );
}

export default Thanking;
