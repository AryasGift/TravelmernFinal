import React, { useState } from 'react';
import { Col, Row, Form, Button, Container, Alert, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { addTravelApi } from '../services/allApis';

function Admin_create() {
  const [credentials, setCredentials] = useState({
    title: '',
    city: '',
    address: '',
    distance: '',
    desc: '',
    price: '',
    maxGroupSize: '',
    photo:''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setCredentials((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (localStorage.getItem('token')) {
      try {
        const token=localStorage.getItem('token')
        console.log(token);
        const{title,city,address,distance,desc,price,maxGroupSize,photo}=credentials
        const headerConfig={
          "Content-Type":"multipart/formdata",
          "access_token":`bearer ${token}`
        }
        const reqBody=new FormData;
        reqBody.append("title",title)
        reqBody.append("city",city)
        reqBody.append("address",address)
        reqBody.append("distance",distance)
        reqBody.append("desc",desc)
        reqBody.append("price",price)
        reqBody.append("maxGroupSize",maxGroupSize)
        reqBody.append("photo",photo)
        const res= await addTravelApi(reqBody,headerConfig)
        console.log(res);
        if(res.status==200){
          alert("successfully created")
          navigate('/')
        }
        else{
          alert("error occurred.try again later")
        }
      } catch (err) {
        setLoading(false);
        setError(err.message);
      }
    } else {
      setLoading(false);
      setError('User is not authenticated');
    }
  };

  return (
    <Container className="mt-5">
      <h1>Create New Tour</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group as={Row} className="mb-3" controlId="title">
          <Form.Label column sm="2">Title:</Form.Label>
          <Col sm="10">
            <Form.Control type="text" onChange={handleChange} required />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3" controlId="city">
          <Form.Label column sm="2">City:</Form.Label>
          <Col sm="10">
            <Form.Control type="text" onChange={handleChange} required />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3" controlId="address">
          <Form.Label column sm="2">Address:</Form.Label>
          <Col sm="10">
            <Form.Control type="text" onChange={handleChange} required />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3" controlId="distance">
          <Form.Label column sm="2">Distance:</Form.Label>
          <Col sm="10">
            <Form.Control type="text" onChange={handleChange} required />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3" controlId="desc">
          <Form.Label column sm="2">Description:</Form.Label>
          <Col sm="10">
            <Form.Control as="textarea" rows={3} onChange={handleChange} required />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3" controlId="price">
          <Form.Label column sm="2">Price:</Form.Label>
          <Col sm="10">
            <Form.Control type="text" onChange={handleChange} required />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3" controlId="maxGroupSize">
          <Form.Label column sm="2">Max Group Size:</Form.Label>
          <Col sm="10">
            <Form.Control type="number" onChange={handleChange} required />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3" controlId="photo">
          <Form.Label column sm="2">Photo:</Form.Label>
          <Col sm="10">
          <input type="file"  onChange={(e)=>setCredentials({...credentials,["photo"]:e.target.files[0]})} />
          </Col>
        </Form.Group>
        <Button type="submit" variant="primary" disabled={loading}>
          {loading ? <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" /> : 'Create Tour'}
        </Button>
        {error && <Alert variant="danger" className="mt-3">{error}</Alert>}
      </Form>
    </Container>
  );
}

export default Admin_create;
