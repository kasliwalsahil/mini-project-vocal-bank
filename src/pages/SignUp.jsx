import React from 'react';
import './Login.css';

const LoginForm = () => {
  return (
    <div className="login">
      <h1 className='welcome'>Welcome To Vocal Bank</h1>
      <h2 className='login-heading'>Create Account</h2>
      <a href="/sign"><button className='form-button'>Create Account</button></a>
      <h1 className='login-line'>Already have an account ?<a className='login-btn' href="/login"> Login</a></h1>
    </div>
  );
};

export default LoginForm;
