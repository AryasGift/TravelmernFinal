import React, { useEffect, useState } from 'react';
import CommonSection from './CommonSection';
import './tour.css';
import Searchbar from '../components/Searchbar';
import { Card, Col, Container, Row } from 'react-bootstrap';
import NewsLetter from '../components/NewsLetter';
import { Link } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import { baseuri } from '../services/base';
import { BASE_URL } from '../utils/config';

function Tours() {
  const [pageCount, setPageCount] = useState(0);
  const [page, setPage] = useState(0);
  const {
    data: tours,
    loading,
    error
  } = useFetch(`${BASE_URL}/tours?page=${page}`);
  const { data: tourCount } = useFetch(`${BASE_URL}/tours/search/getTourCount`);

  useEffect(() => {
    const pages = Math.ceil(tourCount / 8);
    setPageCount(pages);
    window.scrollTo(0, 0);
  }, [tourCount]);

  useEffect(() => {
    if (tours) {
      window.scrollTo(0, 0);
    }
  }, [page, tours]);
  console.log(tours);

  const handlePageChange = (pageNumber) => {
    setPage(pageNumber);
  };

  return (
    <div>
      <CommonSection title={"All Tours"}></CommonSection>
      <section className='mt-4'>
        <Container>
          <Row>
            <Searchbar></Searchbar>
          </Row>
        </Container>
      </section>
      <section className='mt-4'>
        <Container>
          {loading && <h4 className='text-center pt-5'>Loading...</h4>}
          {error && <h4 className='text-center pt-5'>{error}</h4>}

          {!loading && !error && (
            <Row>
              {tours?.map((tour, index) => (
                <Col lg={3} key={tour._id}>
                  <Card key={index} style={{ width: '16rem' }} className='mt-3'>
                    
                    <Card.Img variant="top" src={tour.photo.startsWith("https") ? tour.photo :`${baseuri}/uploads/${tour.photo}`} style={{ width: '254.67px', height: '169.85px' }} />

                    <Card.Body>
                      <Card.Title className='d-flex justify-content-between' style={{ fontSize: '1rem' }}>
                        <div><i className="fa-solid fa-location-dot" style={{ color: '#fc9803' }}></i> {tour.city}</div>
                        <div><i className="fa-solid fa-star" style={{ color: '#fc9803' }}></i> {tour.avgRating}</div>
                      </Card.Title>
                      <Card.Text>{tour.title}</Card.Text>
                      <footer className='d-flex justify-content-between'>
                        <div><b>${tour.price}/per person</b></div>
                        <div>
                          <Link to={`/singleView/${tour._id}`}>
                            <button className="ms-2" style={{ backgroundColor: '#fc9803', border: 'none', color: 'aliceblue', borderRadius: '5px' }}>Book Now</button>
                          </Link>
                        </div>
                      </footer>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
              <Col lg="12">
                <div className="pagination d-flex align-items-center justify-content-center mt-4 gap-3">
                  {[...Array(pageCount).keys()].map(number => (
                    <span
                      key={number}
                      onClick={() => handlePageChange(number)}
                      className={page === number ? "active_page" : ""}
                    >
                      {number + 1}
                    </span>
                  ))}
                </div>
              </Col>
            </Row>
          )}
        </Container>
      </section>
      <NewsLetter></NewsLetter>
    </div>
  );
}

export default Tours;
