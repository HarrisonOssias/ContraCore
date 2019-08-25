import React, { useState, useContext } from 'react';
import { Redirect } from 'react-router-dom';

import AuthContext from '../../context/auth/authContext';

const Register = () => {
  const authContext = useContext(AuthContext);

  const { register, isAuthenticated } = authContext;

  const [user, setUser] = useState({
    email: '',
    name: '',
    password: '',
    confirmPassword: ''
  });

  const { email, name, password, confirmPassword } = user;

  const onChange = e => setUser({ ...user, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    if (password !== confirmPassword) {
      return console.log('Please enter the same password in both fields');
    } else if (
      email === '' ||
      name === '' ||
      password === '' ||
      confirmPassword === ''
    ) {
      return console.log('Please fill out all fields');
    } else {
      register({
        email,
        name,
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
          {/* Register Form */}
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
              id='name'
              className='fadeIn second form-control w-50'
              name='name'
              value={name}
              placeholder='Name'
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
              type='text'
              id='confirmPassword'
              className='fadeIn second form-control w-50'
              name='confirmPassword'
              value={confirmPassword}
              placeholder='Confirm Password'
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

export default Register;
