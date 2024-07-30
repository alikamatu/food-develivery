import React, { useContext, useEffect, useState } from 'react'
import './PlaceOder.scss'
import { StoreContext } from '../../context/StoreContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';

const PlaceOder = () => {

  const {getTotalCart, token, food_list, cartItems, url} = useContext(StoreContext);

  const [data, setData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: ""
  })

  const onChangeHandler = (event) => {
    const name = event.target.name
    const value = event.target.value
    setData(data=>({...data,[name]:value}))
  } 

  const placeOrder = async (event) => {
    event.preventDefault();

    let orderItems = [];
    food_list.map((item) => {
      if (cartItems[item._id]>0) {
        let itemInfo = item;
        itemInfo["quantity"] = cartItems[item._id];
        orderItems.push(itemInfo)
      }
    })
    let orderData = {
      address: data,
      items: orderItems,
      amount: getTotalCart() + 2
    }
    let response = await axios.post(url+"/api/order/place", orderData, {headers: {token}})
    if (response.data.success) {
      const {session_url} = response.data;
      window.location.replace(session_url);
    }
    else {
      alert("error")
    }
  }

  const navigate = useNavigate();

  useEffect(()=> {
    if (!token) {
      navigate('/cart')
    }
    else if (getTotalCart()===0) {
      navigate('/cart')
    }
  },[token])

  return (
    <form onSubmit={placeOrder} className='place-order'>
      <div className="place-order-left">
          <p className="title">Delivery Information</p>
          <div className="multi-fields">
            <input required name='firstname' onChange={onChangeHandler} value={data.firstname} type="text" placeholder='First name'id="" />
            <input required name='lastname' onChange={onChangeHandler} value={data.lastname} type="text" placeholder='Last name' id="" />
          </div>
          <input required name='email' onChange={onChangeHandler} value={data.email} placeholder='Email Adress' type="email"  />
          <input required name='street' onChange={onChangeHandler} value={data.street} placeholder='Address' type="text" />
          <div className="multi-fields">
            <input required name='city' onChange={onChangeHandler} value={data.city} type="text" placeholder='City' id="" />
            <input required name='state' onChange={onChangeHandler} value={data.state} type="text" placeholder='State' id="" />
          </div>
          <div className="multi-fields">
            <input required name='zipcode' onChange={onChangeHandler} value={data.zipcode} type="text" placeholder='Zip code' id="" />
            <input required name='country' onChange={onChangeHandler} value={data.country} type="text" placeholder='Country' id="" />
          </div>
          <input name="phone" onChange={onChangeHandler} value={data.phone} type="text" placeholder='phone' id="" />
      </div>
      <div className="place-order-right">
      <div className="cart-total">
          <h2>Cart Total</h2>
          <div>
            <div className="cart-total-details">
              <p>Sub Total</p>
              <p>{getTotalCart()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>${2}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>{getTotalCart()+2}</b>
            </div>
          </div>
          <button type='submit'>Proceed to Payment</button>
        </div>
      </div>
    </form>
  )
}

export default PlaceOder
