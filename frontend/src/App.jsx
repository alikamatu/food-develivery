import React, { useState } from 'react'
import Navbar from './components/navbar/Navbar'
import "./App.css"
import { Route, Routes } from 'react-router-dom'
import Home from './pages/home/Home'
import Cart from './pages/cart/Cart'
import PlaceOder from './pages/placeorder/PlaceOder'
import Footer from './components/footer/Footer'
import LoginPopUp from './components/login/LoginPopUp'
import Verify from './pages/verify/Verify'
import MyOrder from './pages/myorders/MyOrder'

const App = () => {

  const [showLogin, setShowLogin] = useState(false)

  return (
    <>
    {showLogin?<LoginPopUp setShowLogin={setShowLogin} />:<></>}
    <div className='app'>
      <Navbar setShowLogin={setShowLogin} />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/order' element={<PlaceOder />} />
        <Route path='/verify' element={<Verify />} />
        <Route path='/myorders' element={<MyOrder />} />
      </Routes>
    </div>
    <Footer />
    </>
  )
}

export default App
