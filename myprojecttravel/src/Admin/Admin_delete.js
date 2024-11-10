import React, { useEffect, useState } from 'react'
import useFetch from '../hooks/useFetch'
import { BASE_URL } from '../utils/config'
import { Card, Col, Container, Row } from 'react-bootstrap'
import CommonSection from '../pages/CommonSection'
import { Link } from 'react-router-dom'
import Searchbar from '../components/Searchbar'
import NewsLetter from '../components/NewsLetter'

function Admin_delete() {
  const [pageCount, setPageCount] = useState(0)
  const [page, setPage] = useState(0)
  const {
    data:tours,
    loading,
    error}=useFetch(`${BASE_URL}/tours?page=${page}`)
  const {data:tourCount}=useFetch(`${BASE_URL}/tours/search/getTourCount`)
  useEffect(() => {
    const pages = Math.ceil(tourCount/ 8)
    setPageCount(pages)
    window.scrollTo(0,0)
  }, [page,tourCount,tours])
  const handleDelete=async(tourId)=>{
   try{
    const res=await fetch(`${BASE_URL}/tours/${tourId}`,{
        method:'DELETE',
        headers:{
            'Content-Type':'application/json',
        },
         credentials: 'include'
    })
    if (res.ok) {
        // Refetch tours after deletion
        // refetch();
        alert('Tour deleted successfully!');
      } else {
        const result = await res.json();
        throw new Error(result.message);
      }

   }
    catch(err){
        console.error('Error deleting tour:', err);
        alert(`Error deleting tour: ${err.message}`); 
    }
  }
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
          {loading && <h4 className='text-center pt-5'>loading......</h4>}
          {error && <h4 className='text-center pt-5'>{error}</h4>}

          {
          !loading && !error && <Row>{
            
          <>
              {tours?.map((i, index) => (
                <Col lg={3} key={i._id}>
                  <Card key={index} style={{ width: '16rem' }} className='mt-3'>
                    <Card.Img variant="top" src={i.photo} style={{width:'254.67px',height:'169.85px'}}/>
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
                        <div>
                           <Link to={`/admin/updateTours/${i._id}`}>
                           <button className="ms-2" style={{ backgroundColor: '#fc9803', border: 'none', color: 'aliceblue', borderRadius: '5px' }}><i class="fa-solid fa-eye"></i></button>
                           </Link>
                          <button className="ms-2" onClick={()=>handleDelete(i._id)} style={{ backgroundColor: '#fc9803', border: 'none', color: 'aliceblue', borderRadius: '5px' }}><i class="fa-solid fa-trash"></i></button>
                    
                          </div>
                      </footer>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
              <Col lg="12">
                 <div className="pagination d-flex align-items-center justify-content-center mt-4 gap-3">
                  {[...Array(pageCount).keys()].map(number=>(
                    <span key={number} 
                    onClick={()=>setPage(number)}
                    className={page === number ? "active_page":" "}
                    >
                      {number+1}
                    </span>
                  ))}
                 </div>
              </Col>
            </>
          }
         
        </Row>}

        </Container>
      </section>
      <NewsLetter></NewsLetter>
    </div>
  )
}

export default Admin_delete
