import React, { useContext, useEffect, useState, useRef } from 'react';
import './tour-details.css';
import { useParams } from 'react-router-dom';
import { Col, Container, Form, ListGroup, Row } from 'react-bootstrap';
import calculateAvgRating from '../utils/avgRating';
import Booking from '../components/Booking/Booking';
import useFetch from '../hooks/useFetch';
import { BASE_URL } from '../utils/config';
import { AuthContext } from '../context/AuthContext';
import { baseuri } from '../services/base';

function TourDetails() {
    const { id } = useParams();
    const reviewMsgRef = useRef('');
    const [tourRating, setTourRating] = useState(null);
    const { user } = useContext(AuthContext);
    const { data: tour } = useFetch(`${BASE_URL}/tours/${id}`);
    console.log(tour);

    const { photo, title, desc, price, reviews, city, distance, address, maxGroupSize } = tour || {};
    const { totalRating, avgRating } = calculateAvgRating(reviews);

    const options = { day: 'numeric', month: 'long', year: 'numeric' };

    const submitHandler = async (e) => {
        e.preventDefault();
        const reviewText = reviewMsgRef.current.value;

        try {
            if (!user) {
                return alert('Please sign in');
            }
            const reviewObj = {
                username: user?.username,
                reviewText,
                rating: tourRating,
            };
            const res = await fetch(`${BASE_URL}/review/${id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify(reviewObj),
            });
            const result = await res.json();
            if (!res.ok) {
                return alert(result.message);
            }
            alert(result.message);
        } catch (err) {
            alert(err.message);
        }
    };

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div>
            <section>
                <Container>
                    {
                        tour?
                            <Row>
                                <Col lg={8} className='mt-4'>
                                    <div className="tour__content">
                                        <img src={tour?.photo && tour.photo.startsWith("https") ? tour.photo : `${baseuri}/uploads/${tour.photo}`} alt={title} className="w-100 mb-4" />
                                        <div className="tour__info">
                                            <h2>{title}</h2>
                                            <div className="d-flex align-items-center gap-5">
                                                <span className="d-flex align-items-center gap-1">
                                                    <i className="fa-solid fa-star" style={{ color: '#fc9803' }}></i>
                                                    {avgRating === 0 ? null : avgRating}
                                                    {totalRating === 0 ? 'Not rated' : <span>({reviews?.length})</span>}
                                                </span>
                                                <span>
                                                    <i className="fa-solid fa-location-dot" style={{ color: '#fc9803' }}></i>
                                                    {address}
                                                </span>
                                            </div>
                                            <div className="tour__extra-details">
                                                <span>
                                                    <i className="fa-solid fa-location-dot" style={{ color: '#fc9803' }}></i>
                                                    {city}
                                                </span>
                                                <span>
                                                    <i className="fa-solid fa-dollar-sign" style={{ color: '#fc9803' }}></i>
                                                    {price}/per person
                                                </span>
                                                <span>
                                                    <i className="fa-regular fa-compass" style={{ color: '#fc9803' }}></i>
                                                    {distance} km/hr
                                                </span>
                                                <span>
                                                    <i className="fa-solid fa-user-group" style={{ color: '#fc9803' }}></i>
                                                    {maxGroupSize} people
                                                </span>
                                            </div>
                                            <h5 className='mt-3'>Description</h5>
                                            <p>{desc}</p>
                                        </div>
                                        <div className="tour__reviews mt-4">
                                            <h4>Reviews ({reviews?.length})</h4>
                                            <Form onSubmit={submitHandler}>
                                                <div className="d-flex align-items-center gap-3 mb-4 rating__group">
                                                    {[1, 2, 3, 4, 5].map((star) => (
                                                        <span key={star} onClick={() => setTourRating(star)}>
                                                            {star}
                                                            <i className="fa-solid fa-star" style={{ color: '#fc9803' }}></i>
                                                        </span>
                                                    ))}
                                                </div>
                                                <div className="review__input">
                                                    <input type="text" ref={reviewMsgRef} placeholder="Share your thoughts" required />
                                                    <button type="submit" style={{ backgroundColor: '#fc9803', border: 'none' }}>
                                                        Submit
                                                    </button>
                                                </div>
                                            </Form>
                                            <ListGroup className="user__reviews">
                                                {reviews?.map((review) => (
                                                    <div className="review__item" key={review._id}>
                                                        <img src="https://i.postimg.cc/0QXtVVTL/profile2.jpg" alt="User" />
                                                        <div className="w-100">
                                                            <div className="d-flex align-items-center justify-content-between">
                                                                <div>
                                                                    <h5>{review.username}</h5>
                                                                    <p>{new Date(review.createdAt).toLocaleDateString('en-US', options)}</p>
                                                                </div>
                                                                <span className="d-flex align-items-center">
                                                                    {review.rating}
                                                                    <i className="fa-solid fa-star" style={{ color: '#fc9803' }}></i>
                                                                </span>
                                                            </div>
                                                            <h6>{review.reviewText}</h6>
                                                        </div>
                                                    </div>
                                                ))}
                                            </ListGroup>
                                        </div>
                                    </div>
                                </Col>
                                <Col lg={4}>
                                    <Booking tour={tour} avgRating={avgRating}></Booking>
                                </Col>
                            </Row>
                        :
                        <h1>no data found</h1>
                }
                    <h1></h1>
                </Container>
            </section>
        </div>
    );
}

export default TourDetails;
