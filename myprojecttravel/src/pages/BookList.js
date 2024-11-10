import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Card, Spinner, Button } from 'react-bootstrap';
import { AuthContext } from '../context/AuthContext';
import { BASE_URL } from '../utils/config';

function BookingList() {
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);
    const [booking, setBooking] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBooking = async () => {
            if (!user) {
                setError('You must be logged in to view booking details');
                setLoading(false);
                return;
            }

            const bookingUrl = `${BASE_URL}/booking/user/${user._id}`;
            console.log(`${BASE_URL}`);
            console.log(`Fetching booking from URL: ${bookingUrl}`);

            try {
                const response = await fetch(bookingUrl, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${user.token}` // Assuming you use a token for authentication
                    },
                    credentials: 'include'
                });
                const result = await response.json();
                if (response.ok) {
                    setBooking(result.data);
                    console.log(result.data);
                } else {
                    setError(result.message);
                }
            } catch (err) {
                setError('Failed to fetch booking');
            } finally {
                setLoading(false);
            }
        };
        fetchBooking();
    }, [user._id, user]);
    const handleDelete = async (bookingId) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this booking?');
        if (!confirmDelete) return;

        const deleteUrl = `${BASE_URL}/booking/${bookingId}`;
        try {
            const response = await fetch(deleteUrl, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                },
                credentials: 'include'
            });
            const result = await response.json();
            if (response.ok) {
                setBooking(booking.filter(booking => booking._id !== bookingId));
                console.log('Booking deleted:', result.message);
            } else {
                setError(result.message);
            }
        } catch (err) {
            setError('Failed to delete booking');
        }
    };
    if (loading) {
        return (
            <Container className="text-center">
                <Spinner animation="border" />
            </Container>
        );
    }

    if (error) {
        return (
            <Container className="text-center">
                <p>{error}</p>
                {!user && (
                    <Button onClick={() => navigate('/login')}>Login</Button>
                )}
            </Container>
        );
    }

    return (
        <Container>
            {booking ?booking.map (i=>(
                <Card className='mt-4'>
                    <Card.Header>Booking Details</Card.Header>
                    <Card.Body>
                        <Card.Title>{i.tourName}</Card.Title>
                        <Card.Text><strong>Full Name:</strong> {i.fullName}</Card.Text>
                        <Card.Text><strong>Email:</strong> {i.userEmail}</Card.Text>
                        <Card.Text><strong>Phone:</strong> {i.phone}</Card.Text>
                        <Card.Text><strong>Guest Size:</strong> {i.guestSize}</Card.Text>
                        <Card.Text><strong>Booked At:</strong> {new Date(i.bookAt).toLocaleDateString()}</Card.Text>
                        <Button variant="danger" onClick={()=>handleDelete(i._id)}>Delete</Button>{' '}

                        </Card.Body>
                </Card>
            )) : (
                <p>No booking found</p>
            )}
        </Container>
    );
}

export default BookingList;
