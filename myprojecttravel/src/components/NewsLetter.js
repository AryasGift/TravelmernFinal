import React from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap'

function NewsLetter() {
  return (
    <div>
       <div className='newsletter mt-4' style={{ backgroundColor: 'aliceblue' }}>
                <Container>
                    <Row>
                        <Col lg={6} md={6}>
                            <h1 style={{ color: '#1a4da1', marginTop: "100px" }}>Subscribe now to get useful traveling information.</h1>
                            <div className='d-flex position-relative input-wrapper' style={{ marginTop: '20px' }}>
                                <input type="text" className='subscribe-input' placeholder="Enter your email" />
                                <Button className='subscribe-button' style={{ backgroundColor: '#ff9f00', border: 'none' }}>Subscribe</Button>
                            </div>
                            <p className='container'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quasi dolor eligendi sed, ipsam dolores debitis consequatur pers</p>
                        </Col>
                        <Col lg={6} md={6} className="d-flex justify-content-center align-items-center">
                            <img src="https://i.postimg.cc/sxYW0FgC/j1.png" alt="please subscribe" className="img-fluid" />
                        </Col>

                    </Row>
                </Container>
            </div>
    </div>
  )
}

export default NewsLetter
