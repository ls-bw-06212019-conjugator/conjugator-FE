import React from 'react';
import { NavLink } from 'react-router-dom';

import './Navbar.scss';

export const Navbar = props => {
  return (
    <div className='navbar'>
      <h1>Conjugator</h1>
      <nav>
        <NavLink exact to="/">Practice</NavLink>
        <NavLink to="/dashboard">Dashboard</NavLink>
        <NavLink to="/settings">Settings</NavLink>
        <NavLink to="/auth">Login/Sign Up</NavLink>
      </nav>
    </div>
  )
}