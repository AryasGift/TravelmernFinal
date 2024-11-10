import React from 'react'
import tours from '../assets/tour';
import { Card, Col, Row } from 'react-bootstrap';
import useFetch from '../hooks/useFetch';
import { BASE_URL } from '../utils/config';
import { Link } from 'react-router-dom';

function TourCards() {
  const {data:featuredTours,loading,error}=useFetch(`${BASE_URL}/tours/search/getFeaturedTours`)
  console.log(featuredTours);
  return (
    <div>
      <Row>
        <>
        {
          loading && <h4>Loading......</h4>
        }
        {
           error && <h4>{error}</h4>
        }
            {!loading && !error && featuredTours?.map((i, index) => (
                <Col lg={3}>
                <Card key={index} style={{ width: '16rem' }} className='mt-3'>
                    <Card.Img variant="top" src={i.photo} />
                    <Card.Body>
                        <Card.Title className='d-flex justify-content-between' style={{fontSize:'1rem'}}>
                           <div><i class="fa-solid fa-location-dot" style={{color: '#fc9803'}}></i> {i.city}</div> 
                           <div><i class="fa-solid fa-star" style={{color: '#fc9803'}}></i> {i.avgRating}</div> 
                            </Card.Title>
                        <Card.Text>
                           {i.title}
                        </Card.Text>
                        <footer className='d-flex justify-content-between'>
                            <div><b>${i.price}/per person</b></div>
                            <Link to={`/singleView/${i._id}`}>

                            <div><button className="ms-2" style={{backgroundColor:'#fc9803',border:'none',color:'aliceblue',borderRadius:'5px'}}>Book Now</button></div>
                            </Link>
                        </footer>
                    </Card.Body>
                </Card>
                </Col>
            ))}
        </>

</Row>
    </div>
  )
}

export default TourCards
