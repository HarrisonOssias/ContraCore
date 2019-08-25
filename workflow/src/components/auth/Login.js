import React, { useContext, useState } from 'react';
import './Login.css';
import AuthContext from '../../context/auth/authContext';
import { Redirect } from 'react-router-dom';

const Login = () => {
  const authContext = useContext(AuthContext);

  const { login, isAuthenticated } = authContext;

  const [user, setUser] = useState({
    email: '',
    password: ''
  });

  const { email, password } = user;

  const onChange = e => setUser({ ...user, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    if (email === '' || password === '') {
      console.log('Please fill in all fields');
    } else {
      login({
        email,
        password
      });
    }
  };
  if (!isAuthenticated) {
    return (
      <div className='wrapper fadeInDown'>
        <div id='formContent'>
          <div className='fadeIn first'>
            <img src={require('./logo.png')} id='icon' />
          </div>
          {/* Login Form */}
          <form method='POST' onSubmit={onSubmit}>
            <input
              type='text'
              id='email'
              className='fadeIn second form-control w-50'
              name='email'
              value={email}
              placeholder='Email'
              onChange={onChange}
              required
            />
            <input
              type='text'
              id='password'
              className='fadeIn third form-control w-50'
              name='password'
              value={password}
              placeholder='Password'
              onChange={onChange}
              required
            />
            <input
              type='submit'
              className='fadeIn fourth'
              defaultValue='Log In'
            />
          </form>
          {/* Remind Password */}
          <div id='formFooter'>
            <a className='underlineHover' href='#'>
              Forgot Password?
            </a>
          </div>
        </div>
      </div>
    );
  } else {
    return <Redirect to='/' />;
  }
};

export default Login;
