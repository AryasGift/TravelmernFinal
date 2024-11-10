import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Button, Card, Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import Searchbar from '../components/Searchbar';
import TourCards from '../components/TourCards';
import NewsLetter from '../components/NewsLetter';

function Landing() {
    return (
        <div>

            <div>
                <Row>
                    <Col lg={6} md={6} style={{ overflowX: 'hidden' }}>
                        <div className='section1 m-5' style={{ overflowX: 'hidden' }}>
                            <span className='ms-4 pe-3 head1' style={{ backgroundColor: '#ff9f00', borderRadius: '5px', padding: '5px 10px' }}>
                                Know Before you go <i className="fa-solid fa-earth-americas"></i>
                            </span>
                            <h1 className='ms-4 mt-3' style={{ color: '#1a4da1' }}>
                                Traveling opens the door to creating <span style={{ color: '#ff9f00' }}>memories</span>
                            </h1>
                            <p className='ms-4' style={{ fontSize: '1.1rem', lineHeight: '1.5' }}>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae accusamus quod pariatur vero enim ab doloremque error eligendi atque porro perspiciatis possimus optio blanditiis placeat, rerum animi facere velit quisquam?
                            </p>
                        </div>
                    </Col>
                    <Col lg={6} md={6} sm={6} style={{ overflow: 'hidden' }}>
                        <div className='mainSection d-flex justify-content-center align-items-center' style={{ overflow: 'hidden' }}>
                            <div className='section2 mt-2' style={{ width: '150px', height: '300px', borderRadius: '25px', backgroundColor: '#e0e0e0' }}></div>
                            <div className='section3 ms-3 mt-4' style={{ width: '150px', height: '300px', borderRadius: '25px', backgroundColor: '#d0d0d0' }}></div>
                            <div className='section4 ms-3 mt-5' style={{ width: '150px', height: '300px', borderRadius: '25px', backgroundColor: '#c0c0c0' }}></div>
                        </div>
                    </Col>
                </Row>
            </div>
            <div className='m-3'>
            <Searchbar></Searchbar>
            </div>

            <div className='mt-4 explore'>
                <Container>
                    <span className='pe-3 mt-5 head1' style={{ backgroundColor: '#ff9f00', borderRadius: '25px', padding: '5px 10px' }}>
                        Explore</span>
                    <h3 className='mt-3'>Our Featured Tours</h3>
                    
                    <TourCards></TourCards>
                </Container>

            </div>
            <div className='mt-4 experience'>
                <Container>
                    <span className='pe-3 mt-4 head1' style={{ backgroundColor: '#ff9f00', borderRadius: '25px', padding: '5px 10px' }}>
                        gallery</span>
                    <div className=' mt-4 photo-gallery'>
                        <div className="column">
                            <div className="photo">
                                <img src="https://i.postimg.cc/cCv2PVb7/p6.jpg" alt="" />
                            </div>
                            <div className="photo">
                                <img src="https://i.postimg.cc/44t85qvW/photographers-travelling-23-2147643224.jpg" alt="" />
                            </div>
                            <div className="photo">
                                <img src="https://i.postimg.cc/RCnN7qPF/p7.avif" style={{ height: '220px' }} />
                            </div>

                        </div>
                        <div className="column">
                            <div className="photo">
                                <img src="https://i.postimg.cc/CKpDFh68/p1.jpg" alt="" />
                            </div>
                            <div className="photo">
                                <img src="https://i.postimg.cc/DZzTsF4p/hiker-biker-trail-1426-20857.avif" alt="" />
                            </div>
                            <div className="photo">
                                <img src="https://i.postimg.cc/VkLQ2mDf/A1.jpg" alt="" style={{ height: '238px' }} />
                            </div>
                        </div>
                        <div className="column">
                            <div className="photo">
                                <img src="https://i.postimg.cc/zvj2kRmn/A2.jpg" alt="" />
                            </div>
                            <div className="photo">
                                <img src="https://i.postimg.cc/SN1DN4mN/A3.jpg" alt="" />
                            </div>
                            <div className="photo">
                                <img src="https://i.postimg.cc/MGqcCcgc/cheerful-woman-with-map-23-2147813946.jpg" style={{ height: '273px' }} />
                            </div>
                        </div>
                    </div>
                </Container>
            </div>
            <NewsLetter></NewsLetter>
        </div>
    );
}

export default Landing;
