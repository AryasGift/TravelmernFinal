import React from 'react'
import './commonsection.css'
import { Col, Container, Row } from 'react-bootstrap'

function CommonSection({title}) {
  return (
    <div>
      <section className='common_section'>
       <Container>
        <Row>
            <Col lg={12}>
            <h1>{title}</h1>
            </Col>
        </Row>
       </Container>
      </section>
    </div>
  )
}

export default CommonSection
