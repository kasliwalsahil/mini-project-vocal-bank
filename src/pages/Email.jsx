import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {useNavigate} from "react-router-dom"
import "./Email.css"


const phone = () => {
  const [accountNumber, setAccountNumber] = useState("");
  const [phone, setphone] = useState('');
  const [password, setPassword] = useState('');
  const [heading, setHeading] = useState('');
  const navigate = useNavigate();
  useEffect(() => {
    // Retrieve account_number from session storage
    const accountNumberFromStorage = sessionStorage.getItem('responseText');
    if (accountNumberFromStorage) {
      setHeading(accountNumberFromStorage);
    }
  }, []);

  const handlephone =(e)=>{
    setphone(e.target.value)
  }
  const handleAccountNumber =(e)=>{
    setAccountNumber(e.target.value)
  }
  const handlePassword =(e)=>{
    setPassword(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    // Create the request body
    const requestBody = {
      account_number: accountNumber,
      phone: phone,
      password: password
    };


    // Send the API request using Axios
    axios.put('http://localhost:5000/update-phone', requestBody)
      .then(response => {
        // Handle the response
        
        console.log(response.data); // You can update the UI or show a success message here
        setphone('')
        setPassword('')
        setAccountNumber('')
        navigate("/login")
      })
      .catch(error => {
        console.error(error); // Handle any errors
      });
  };

  return (
    <div className="phone_password">
      <h1 className='phone_pass_heading'>{heading}</h1>
      <form className='phone-form' onSubmit={handleSubmit}>
        <label htmlFor="accountNumber">Account Number:</label>
        <input
        className='phone-form-input'
          type="text"
          id="accountNumber"
          value={accountNumber}
          onChange={handleAccountNumber}
          placeholder='Enter Account Number'
          
        />

        <label htmlFor="phone">phone:</label>
        <input
        className='phone-form-input'
          type="text"
          id="phone"
          value={phone}
          onChange={handlephone}
          placeholder='Enter Phone no...'
        />

        <label htmlFor="password">Password:</label>
        <input
        className='phone-form-input'
          type="password"
          id="password"
          value={password}
          onChange={handlePassword}
          placeholder='Enter Password'
        />

        <button className='setbtn' type="submit">Set phone & Password</button>
      </form>
    </div>
  );
};

export default phone;
