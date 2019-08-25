import React from 'react';
import Subs from './Subs';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const guestLinks = (
    <nav class='navbar navbar-expand-md bg-dark sticky-top'>
      <button
        class='navbar-toggler'
        data-toggle='collapse'
        data-target='#collapse_target'
      >
        <span class='navbar-toggler-icon'></span>
      </button>
      <div class='collapse navbar-collapse' id='collapse_target'>
        <a class='navbar-brand'>
          <img
            src={require('./logo.png')}
            style={{ width: '5rem', height: '5rem' }}
          ></img>
        </a>
        <ul class='navbar-nav'>
          <li nav class='nav-item'>
            <Link to='/login'>Login</Link>
          </li>
          <li nav class='nav-item'>
            <Link to='/Register'>Register</Link>
          </li>
        </ul>
        <Subs />
      </div>
    </nav>
  );

  const authLinks = (
    <nav class='navbar navbar-expand-md  bg-primary sticky-top'>
      <button
        class='navbar-toggler'
        data-toggle='collapse'
        data-target='#collapse_target'
      >
        <span class='navbar-toggler-icon'></span>
      </button>
      <div class='collapse navbar-collapse' id='collapse_target'>
        <a class='navbar-brand'>
          <img src={require('./logo.png')}></img>
        </a>
        <ul class='navbar-nav'>
          <li nav class='nav-item'>
            <Link to='/'>Home</Link>
          </li>
          <li nav class='nav-item'>
            <Link to='/about'>About</Link>
          </li>
        </ul>
        <Subs />
      </div>
    </nav>
  );
  return <ul>{guestLinks}</ul>;
};

export default Navbar;
