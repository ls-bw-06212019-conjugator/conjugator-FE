import React from 'react';
import { NavLink } from 'react-router-dom';

import './Navbar.scss';

export const Navbar = props => {
  return (
    <div className='navbar'>
      <h1>Conjugator</h1>
      <nav>
        <NavLink class="navlink" exact to="/">Practice</NavLink>
        <NavLink class="navlink" to="/dashboard">Dashboard</NavLink>
        <NavLink class="navlink" to="/settings">Settings</NavLink>
        <NavLink class="navlink" to="/auth">Login/Sign Up</NavLink>
      </nav>
    </div>
  )
}