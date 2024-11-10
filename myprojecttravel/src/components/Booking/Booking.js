import React, { useContext, useState, useEffect } from 'react';
import './booking.css';
import { Button, Form, FormGroup, ListGroup, ListGroupItem } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { BASE_URL } from '../../utils/config';
import { loadStripe } from '@stripe/stripe-js';

function Booking({ tour, avgRating }) {
    const { price, reviews, title ,maxGroupSize} = tour || {};
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);

    const [booking, setBooking] = useState({
        userId: user && user._id,
        userEmail: user && user.email,
        tourName: '',
        fullName: '',
        phone: '',
        guestSize: 1,
        bookAt: ''
    });

    useEffect(() => {
        if (tour) {
            setBooking(prev => ({
                ...prev,
                tourName: tour.title
            }));
        }
    }, [tour]);

    const handleChange = (e) => {
        setBooking(prev => ({ ...prev, [e.target.id]: e.target.value }));
    };
   //disable past dates
   const disableData=()=>{
    var today=new Date();
    var dd=today.getDate()+1
    var mm=today.getMonth()+1
    var yyyy=today.getFullYear()
    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;
      return  yyyy + "-" + mm + "-" +dd
   }
    const handleClick = async (e) => {
        e.preventDefault();
        try {
            if (!user || user === undefined || user === null) {
                return alert('Please sign in');
            }
            if(booking.guestSize>maxGroupSize){
                alert("guest size exceeds the maximum group size ,kindly change it")
                return
            }
            const res = await fetch(`${BASE_URL}/booking`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify(booking)
            });
            const result = await res.json();
            if (!res.ok) {
                return alert(result.message);
            }
            navigate('/booking/thank')
        } catch (err) {
            alert(err.message);
        }
    };

    const makePayment=async()=>{
        const stripe=await loadStripe("pk_test_51PbGIIC1OnbNJMjSlQhTxfCJyPGDrO2ro39axHgfT7DALpAd31n9CdG3hdk24Zq1RmWTkdQmmMLcvAJA1Q7nOghB007qroa2Ki")
    }
    const serviceFee = 10;
    const totalAmount = Number(price) * Number(booking.guestSize) + Number(serviceFee);

    return (
        <div className='booking'>
            <div className='booking__top d-flex align-items-center justify-content-between'>
                <h3>${price} <span>/per person</span></h3>
                <span className='d-flex align-items-center tour__rating'>
                    <i className="fa-solid fa-star" style={{ color: '#fc9803' }}></i>
                    {avgRating === 0 ? null : avgRating}({reviews?.length})
                </span>
            </div>
            <div className="booking__form">
                <h5>Information</h5>
                <Form className="booking__info-form" >
                    <FormGroup className='gap-3'>
                        <input type="text" placeholder='Full Name' id="fullName" required onChange={handleChange} />
                    </FormGroup>
                    <FormGroup className='gap-3'>
                        <input type="number" placeholder='Phone' id="phone" required onChange={handleChange} />
                    </FormGroup>
                    <FormGroup className="d-flex align-items-center gap-4">
                        <input type="date" min={disableData()} placeholder='' id="bookAt" required onChange={handleChange} />
                        <input type="number" placeholder='Guest' id="guestSize" required onChange={handleChange} />
                    </FormGroup>
                </Form>
            </div>
            <div className='booking__bottom'>
                <ListGroup>
                    <ListGroupItem className="d-flex justify-content-between border-0 px-0">
                        <h5 className='d-flex align-items-center gap-1'>${price}<i className="fa-solid fa-xmark"></i> 1 person</h5>
                        <span>${price}</span>
                    </ListGroupItem>
                    <ListGroupItem className="d-flex justify-content-between border-0 px-0">
                        <h5>Service charge</h5>
                        <span>${serviceFee}</span>
                    </ListGroupItem>
                    <ListGroupItem className="d-flex justify-content-between border-0 px-0 total">
                        <h5>Total</h5>
                        <span>${totalAmount}</span>
                    </ListGroupItem>
                </ListGroup>
                <Button className="btn primary__btn w-100 mt-4" style={{ backgroundColor: '#fc9803' }} onClick={handleClick}>Book Now</Button>
                {/* <Button className="btn primary__btn w-100 mt-4" style={{ backgroundColor: '#fc9803' }} onClick={makePayment}>Book Now</Button> */}

            </div>
        </div>
    );
}

export default Booking;
