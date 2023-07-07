import React, {useState} from 'react';
import './Login.css';
import axios from 'axios';
import {useNavigate} from "react-router-dom"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const LoginForm = () => {

  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();


  const handlePhone =(e)=>{
    setPhone(e.target.value)
  }
  const handlePassword =(e)=>{
    setPassword(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    // Create the request body
    const requestBody = {
      phone: phone,
      password: password,
      // account_number: account_number
    };


    // Send the API request using Axios
    axios.post('http://localhost:5000/login', requestBody)
      .then(response => {
        // Handle the response
        if(response.data.message == 'Login successful'){
          navigate("/home");
          sessionStorage.setItem('phone', phone)
        }
        else if(response.data.message == 'Invalid credentials'){
          toast.error("Invalid Credentials")
        }
        console.log(response.data.message); // You can update the UI or show a success message here
        setPhone('')
        setPassword('')
      })
      .catch(error => {
        console.error(error); // Handle any errors
      });
  };




  return (
    <div className="login">
      <h2 className='login-heading'>Login To Your Account</h2>
      <form className='login-form'>
        <div className="form-group">
          <label className='form-label' htmlFor="phone">Phone</label>
          <input className='form-field' type="text" id="phone" value={phone} onChange={handlePhone} placeholder="Enter your Phone" />
        </div>
        <div className="form-group">
          <label className='form-label' htmlFor="password">Password</label>
          <input className='form-field' type="password" value={password} onChange={handlePassword} id="password" placeholder="Enter your password" />
        </div>
        <div className='form-btn'>
          <button onClick={handleSubmit}  className='form-button' type="submit">Login</button>
        </div>
      </form>
      <h1>New To website create account<a  href="/signc"> Sign-up</a></h1>
      <ToastContainer />
    </div>
  );
};

export default LoginForm;
