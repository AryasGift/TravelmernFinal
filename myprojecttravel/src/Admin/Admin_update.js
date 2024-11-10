import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import { Col, Container, Row, Form, Button } from 'react-bootstrap';
import { BASE_URL } from '../utils/config';
import './AdminUpdate.css'; // Import the custom CSS file
function Admin_update() {
    const { id } = useParams();
    const navigate=useNavigate()
    const { data: tour } = useFetch(`${BASE_URL}/tours/${id}`);
    const { photo, title, desc, price, city, distance, address, maxGroupSize } = tour || {};
   const[formData,setFormData]=useState({
    title: title || '',
    desc: desc || '',
    price: price || '',
    city: city || '',
    distance: distance || '',
    address: address || '',
    maxGroupSize: maxGroupSize || ''
   })
   useEffect(() => {
    if (tour) {
      setFormData({
        title: tour.title,
        desc: tour.desc,
        price: tour.price,
        city: tour.city,
        distance: tour.distance,
        address: tour.address,
        maxGroupSize: tour.maxGroupSize,
      });
    }
  }, [tour]);
  const handleChange=(e)=>{
    const {id,value}=e.target;
    setFormData((prevData)=>({
        ...prevData,
        [id]:value
    }))
  }
  const handleSubmit=async(e)=>{
    e.preventDefault();
    try{
        const response=await fetch(`${BASE_URL}/tours/${id}`,{
            method:'PUT',
            headers:{
                'Content-Type': 'application/json',
            },
            credentials:'include',
            body: JSON.stringify(formData)
        })
        const result=await response.json()
        if (response.ok) {
            alert('Tour updated successfully!');
            navigate(`/`);
          } else {
            alert(result.message || 'Failed to update tour');
          }
    }
    catch(err){
        alert('An error occurred: ' + err.message);
    }
  }
    return (
        <Container className="mt-5">
            <Row>
                <Col lg={6} md={8} sm={12} className='d-flex img-col'>
                    <img src={photo} alt="Tour" style={{ objectFit: 'cover' }} className=' w-100 h-100 rounded shadow' />
                </Col>
                <Col lg={6} md={8} sm={12}>
                    <div className='border p-4 rounded shadow'>
                        <div className='mb-4'>
                            <h1>{formData.title}</h1>
                        </div>
                        <div className='mb-4'>
                            <h4>Description</h4>
                            <textarea name="desc" id="desc" className='w-100 custom-textarea' value={formData.desc} onChange={handleChange}></textarea>
                            {/* <p>{desc}</p> */}
                        </div>
                        <Form>
                            <Form.Group className='mb-3'>
                                <Form.Label>City</Form.Label>
                                <Form.Control type="text" id='city' value={formData.city} onChange={handleChange}/>
                            </Form.Group>
                            <Form.Group className='mb-3'>
                                <Form.Label>Price</Form.Label>
                                <Form.Control type="text" id='price' value={formData.price} onChange={handleChange} />
                            </Form.Group>
                            <Form.Group className='mb-3'>
                                <Form.Label>Address</Form.Label>
                                <Form.Control type="text" id='address' value={formData.address} onChange={handleChange}/>
                            </Form.Group>
                            <Form.Group className='mb-3'>
                                <Form.Label>Distance</Form.Label>
                                <Form.Control type="text" id='distance' value={formData.distance} onChange={handleChange} />
                            </Form.Group>
                            <Form.Group className='mb-3'>
                                <Form.Label>Max Group Size</Form.Label>
                                <Form.Control type="text" id='maxGroupSize' value={formData.maxGroupSize} onChange={handleChange}/>
                            </Form.Group>
                            <Button variant="warning" className="me-2" onClick={(e)=>handleSubmit(e)}>Edit Now</Button>
                            <Link to="/">
                            <Button variant="secondary">Cancel</Button>
                            </Link>
                        </Form>
                    </div>
                </Col>
            </Row>
        </Container>
    );
}

export default Admin_update;
