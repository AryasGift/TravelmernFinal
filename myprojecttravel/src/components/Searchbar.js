import React, { useRef } from 'react'
import { Button } from 'react-bootstrap'
import { BASE_URL } from '../utils/config'
import { useNavigate } from 'react-router-dom'


function Searchbar() {
    const locationRef=useRef("")
    const distanceRef=useRef(0)
    const maxGroupSizeRef=useRef(0)
    const navigate=useNavigate()
    const searchHandler=async()=>{
        const location=locationRef.current.value;
        const distance=distanceRef.current.value;
        const maxGroupSize=maxGroupSizeRef.current.value;

        if(location === "" || distance=== "" || maxGroupSize ===""){
            return alert("All fields are required")
        }
        const res=await fetch(`${BASE_URL}/tours/search/getTourBySearch?city=${location}&distance=${distance}&maxGroupSize=${maxGroupSize}`)
        if(!res.ok){
            alert("something went wrong")
        }
        const result=await res.json()
        navigate(`/tours/search?city=${location}&distance=${distance}&maxGroupSize=${maxGroupSize}`,{state:result.data})
    }
  return (
    <div>
       <div className='search d-flex justify-content-around align-items-center p-2 ms-5 mt-3' style={{ width: '80%', maxWidth: '600px', borderRadius: '15px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
                    <div className='search1 align-items-center'>
                        <i className="fa-solid fa-location-dot" style={{ fontSize: '1rem' }}></i>
                        <span className='ms-2' style={{ fontSize: '0.9rem' }}>Location</span>
                        <br />
                        <input type="text" 
                        className='no-border ms-2' 
                        placeholder="Enter location" 
                        ref={locationRef}
                        />
                    </div>
                    <div className='search2 align-items-center'>
                        <i className="fa-solid fa-clock-rotate-left" style={{ fontSize: '1rem' }}></i>
                        <span className='ms-2' style={{ fontSize: '0.9rem' }}>Distance</span>
                        <br />
                        <input type="text" 
                        className='no-border ms-2' 
                        placeholder="Distance km"
                        ref={distanceRef}
                        />
                    </div>
                    <div className='search3 align-items-center'>
                        <i className="fa-solid fa-user-group" style={{ fontSize: '1rem' }}></i>
                        <span className='ms-2' style={{ fontSize: '0.9rem' }}>Max People</span>
                        <br />
                        <input type="text" 
                        className='no-border ms-2' 
                        placeholder='0' 
                        style={{ width: '80px' }} 
                        ref={maxGroupSizeRef}
                       />
                    </div>
                    <div className='search4'>
                        <Button style={{ backgroundColor: '#ff9f00', border: 'none', padding: '5px 10px' }} onClick={searchHandler}><i className="fa-solid fa-magnifying-glass" style={{ fontSize: '1rem' }}></i></Button>
                    </div>
                </div>
    </div>
  )
}

export default Searchbar
