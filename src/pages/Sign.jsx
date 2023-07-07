import React, { useState, useEffect } from 'react';
import axios from 'axios';
import io from 'socket.io-client';
import "./Sign.css"

const socket = io('http://localhost:5000'); // Replace with your backend URL

const Sign = () => {
  const [isListening, setIsListening] = useState(false);
  const [responseText, setResponseText] = useState('');

  console.log(responseText)
  

  useEffect(() => {
    // Event listener for receiving updated response text from the backend
    socket.on('response', (data) => {
      handleResponse(data);
    });

    // Clean up the event listener on unmount
    return () => {
      socket.off('response');
    };
  }, []);

  useEffect(() => {
    // Set the response text in session storage whenever it changes
    sessionStorage.setItem('responseText', responseText);
  }, [responseText]);

  const toggleListening = () => {
    setIsListening(!isListening);

    if (!isListening) {
      startListening();
    } else {
      stopListening();
    }
  };

  const startListening = () => {
    axios
      .post('http://localhost:5000/api/start_listening')
      .then((response) => {
        if (response.data.success) {
          console.log('Listening started successfully.');
        } else {
          console.log('Failed to start listening.');
        }
      })
      .catch((error) => {
        console.error('Error starting listening:', error);
      });
  };

  const stopListening = () => {
    axios
      .post('http://localhost:5000/api/stop_listening')
      .then((response) => {
        if (response.data.success) {
          console.log('Listening stopped successfully.');
        } else {
          console.log('Failed to stop listening.');
        }
      })
      .catch((error) => {
        console.error('Error stopping listening:', error);
      });
  };

  const handleResponse = (responseText) => {
    setResponseText(responseText);
  };



  return (
    <div className='sign'>
      <h1 className='sign-heading'>Create VocalBank Account</h1>
      <div className='bot'>
        <button className='sign-create-account' onClick={toggleListening}>{isListening ? 'Stop Listening' : 'Click here to create account'}</button>
        {responseText && <p className='response'>{responseText}</p>}
      </div>
      <div className='email-section'>
        <p className='email-sec-p'>Note : After creating account set your phone number and password click here 👇</p>
       <a href="/email"><button onClick={toggleListening} className='email-btn'>Phone and Password</button></a> 
      </div>
    </div>
  );
};

export default Sign;
