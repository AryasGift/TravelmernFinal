import React, { useEffect, useState } from 'react'
import { Alert, Container, Spinner, Table } from 'react-bootstrap'
import { BASE_URL } from '../utils/config'

function Admin_all_booking() {
 const[bookings,setBooking]=useState([]);
 const[loading,setLoading]=useState(true);
 const[error,setError]=useState(null)
 useEffect(()=>{
    const fetchBooking=async()=>{
        try{
           const response=await fetch(`${BASE_URL}/booking/`,{
             method:'GET',
             headers:{
                'Content-Type':'application/json',
             },
             credentials:'include'
           });
           if(!response.ok){
            throw new Error('Failed to fetch booking')
           } 
           const result=await response.json();
           console.log(result.data);
           setBooking(result.data) 
        }
        catch(err){
            setError(err.message)
        }
        finally{
            setLoading(false)
        }
    }
    fetchBooking()
 },[])
 if (loading) return <Spinner animation="border" className="d-block mx-auto mt-5" />;
 if (error) return <Alert variant="danger" className="text-center mt-5">{error}</Alert>;
  return (
    <div>
       <Container>
      <h1 className="mt-5">All Bookings</h1>
      <Table striped bordered hover className="mt-3">
        <thead>
          <tr>
            <th>index</th>
            <th>Full Name</th>
            <th>Tour Name</th>
            <th>GuestSize</th>
            <th>Phone Number</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {bookings?.map((booking, index) => (
            <tr key={booking._id}>
              <td>{index + 1}</td>
              <td>{booking.fullName}</td>
              <td>{booking.tourName}</td>
              <td>{booking.guestSize}</td>
              <td>{booking.phone}</td>
              <td>{new Date(booking.createdAt).toLocaleDateString()}</td>
              {/* <td>{booking.}</td> */}
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
    </div>
  )
}

export default Admin_all_booking
