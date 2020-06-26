import React from 'react';
import { Link } from 'react-router-dom';
import './Nav.css';

//An absolute classic, every good app needs a home button. Mr TeaSeeks home button is created here. 
export default function Nav(props) {
  return (
    <nav className='navContainer'>
      <Link className="nav" to={'/'}>
        Home
      </Link>
    </nav>
  );
};
