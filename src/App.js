
import { useEffect, useState } from 'react';
import { useValue } from './UserContext';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router } from 'react-router-dom';
import { Route, Routes } from 'react-router-dom';
import AppNavbar from './components/AppNavbar';
import { Login } from './pages/Login';
import Register from './pages/Register';
import { Home } from './pages/Home';
import { Products } from './pages/Products';
import { Logout } from './pages/Logout';
import { Error } from './pages/Error';
import { Profile } from './pages/Profile';
//import { CourseView } from './pages/CourseView';
import { ProductView } from './pages/ProductView';
import { Checkout } from './pages/Checkout';
import { CartCheckout } from './pages/CartCheckOut';
import { PrescriptionCheckout } from './pages/PrescriptionCheckout';
import { Orders } from './pages/Orders';
import { AdminDashboard } from './pages/AdminDashboard';
import { PrescriptionGlasses } from './pages/PrescriptionGlasses';
import { SunGlasses } from './pages/SunGlasses';
import { ReadingGlasses } from './pages/ReadingGlasses';
import { Footer } from './components/Footer';


function App() {
  const { getUserDetails, getCart } = useValue();

  useEffect(() => {
    getUserDetails();
  }, [])


  return (
    <Router>
      <AppNavbar />
      <div className='min-vh-100'>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path='/products' element={<Products />} />
          {/* <Route path='/products/:category' element={<ProductsByCategory />} /> */}
          <Route path='/products/prescription' element={<PrescriptionGlasses />} />
          <Route path='/products/sunglasses' element={<SunGlasses />} />
          <Route path='/products/reading' element={<ReadingGlasses />} />

          <Route exact path='/products/single/:productId' element={<ProductView />} />
          <Route path='/register' element={<Register />} />
          <Route path='/profile' element={<Profile />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/cart-checkout" element={<CartCheckout />} />
          <Route path="/prescription-checkout" element={<PrescriptionCheckout />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/dashboard" element={<AdminDashboard />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </div>
      <Footer />
    </Router>

  );
}

export default App;
