import { Route, Routes } from 'react-router-dom';
import './App.css';
import Footer from './components/Footer';
import Header from './components/Header';
import Landing from './pages/Landing';
import Auth from './pages/Auth';
import Login from './pages/Login';
import Tours from './pages/Tours';
import TourDetails from './pages/TourDetails';
import SearchResultList from './pages/SearchResultList';
import Thanking from './pages/Thanking';
import BookingList from './pages/BookList';
import Admin_create from './Admin/Admin_create';
import Admin_delete from './Admin/Admin_delete';
import Admin_all_booking from './Admin/Admin_all_booking';
import Admin_update from './Admin/Admin_update';


function App() {
  return (
    <div className="App">
      <Header></Header>
      <Routes>
       <Route path='/' element={<Landing></Landing>}></Route> 
       <Route path="/register" element={<Auth></Auth>}></Route>
       <Route path="/login" element={<Login></Login>}></Route> 
       <Route path="/tours" element={<Tours></Tours>}></Route> 
       <Route path='/singleView/:id' element={<TourDetails></TourDetails>}></Route>
       <Route path='/tours/search' element={<SearchResultList></SearchResultList>}></Route>
       {/* <Route path='/admin/services' element={<Dashboard></Dashboard>}></Route> */}
       <Route path='/booking/thank' element={<Thanking></Thanking>}></Route>
       <Route path='/booking/:id' element={<BookingList></BookingList>}></Route>
       <Route path='/admin/createBooking' element={<Admin_create></Admin_create>}></Route>
       <Route path='/admin/deleteBooking' element={<Admin_delete></Admin_delete>}></Route>
       <Route path='/admin/allBooking' element={<Admin_all_booking></Admin_all_booking>}></Route>
       <Route path='/admin/updateTours/:id' element={<Admin_update></Admin_update>}></Route>

       </Routes>
      <Footer></Footer>
    </div>
  );
}

export default App;
