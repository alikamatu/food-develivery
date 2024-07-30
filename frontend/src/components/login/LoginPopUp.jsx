import React, { useContext, useEffect, useState } from 'react'
import './LoginPopUp.scss'
import { assets } from '../../assets/assets'
import { StoreContext } from '../../context/StoreContext'
import axios from 'axios'

const LoginPopUp = ({setShowLogin}) => {

  const {url, setToken} = useContext(StoreContext)

    const [currentState, setCurrentState] = useState("Login")

    const [data, setData] = useState({
      name:"",
      email:"",
      password: ""
    })

    const onchangeHandler = (event) => {
      const name = event.target.name;
      const value = event.target.value;
      setData(data=>({...data,[name]:value}))
    }

    const onLogin = async (event) => {
       event.preventDefault();
       let newUrl = url;
       if (currentState==="Login") {
        newUrl+= "/api/user/login"
       }
       else {
        newUrl += "/api/user/register"
       }

       const response = await axios.post(newUrl, data);

       if (response.data.success) {
        setToken(response.data.token);
        localStorage.setItem("token", response.data.token);
        setShowLogin(false)
       }
       else {
        alert(response.data.message)
       }
    }

  return (
    <div className='login-popup'>
      <form onSubmit={onLogin} className="login-popup-container">
        <div className="login-popup-title">
            <h2>{currentState}</h2>
            <img onClick={()=>setShowLogin(false)} src={assets.cross_icon} alt="" />
        </div>
        <div className="login-popup-inputs">
            {currentState==="Login"?<></>:
            <input type="text" name='name' onChange={onchangeHandler} value={data.name} placeholder='Your Name' required />}
            <input type="email" name='email' onChange={onchangeHandler} value={data.email} placeholder='Your email' required />
            <input type="password" name='password' onChange={onchangeHandler} value={data.password} placeholder='Password'  required/>
        </div>
        <button type='submit' >{currentState==="Sign Up"?"Create account":"Login"}</button>
        <div className="login-popup-condition">
            <input type="checkbox" required />
            <p>By continuing, I agree to the terms of use & privacy policy.</p>
        </div>
        {currentState==="Login" ?
        <p>Create a new account? <span onClick={()=>setCurrentState("Sign Up")}>Click here</span> </p> :
        <p>Alraady have an account? <span onClick={()=>setCurrentState("Login")}>Login</span></p>
        }
      </form>
    </div>
  )
}

export default LoginPopUp
