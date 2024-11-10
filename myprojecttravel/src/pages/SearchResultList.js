import React, { useState } from 'react'
import CommonSection from './CommonSection'
import { Card, Col, Container, Row } from 'react-bootstrap'
import { Link, useLocation } from 'react-router-dom'
import NewsLetter from '../components/NewsLetter'

function SearchResultList() {
    const location = useLocation()
    const [data] = useState(location.state)
    console.log(data);
    return (
        <div>
            <CommonSection title={"Your Tour"}></CommonSection>
            <section>
                <Container>
                    <Row>
                        {
                            data.length === 0 ? <h4 className='center'>No tour found</h4> :
                                data?.map(i =>
                                    <Col lg={3} className='mb-4' key={i._id}>
                                        <Card style={{ width: '16rem' }} className='mt-3'>
                                            <Card.Img variant="top" src={i.photo} />
                                            <Card.Body>
                                                <Card.Title className='d-flex justify-content-between' style={{ fontSize: '1rem' }}>
                                                    <div><i class="fa-solid fa-location-dot" style={{ color: '#fc9803' }}></i> {i.city}</div>
                                                    <div><i class="fa-solid fa-star" style={{ color: '#fc9803' }}></i> {i.avgRating}</div>
                                                </Card.Title>
                                                <Card.Text>
                                                    {i.title}
                                                </Card.Text>
                                                <footer className='d-flex justify-content-between'>
                                                    <div><b>${i.price}/per person</b></div>
                                                    <Link to={`/singleView/${i._id}`}>

                                                        <div><button className="ms-2" style={{ backgroundColor: '#fc9803', border: 'none', color: 'aliceblue', borderRadius: '5px' }}>Book Now</button></div>
                                                    </Link>
                                                </footer>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                )
                        }
                    </Row>
                </Container>
            </section>
            <NewsLetter></NewsLetter>
        </div>
    )
}

export default SearchResultList
