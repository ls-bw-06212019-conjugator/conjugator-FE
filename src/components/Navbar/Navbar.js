import React from 'react';
import { NavLink } from 'react-router-dom';

import './Navbar.scss';

export const Navbar = () => {
  return (
    <div className='navbar'>
      <NavLink to="/"><h1>Conjugator</h1></NavLink>
      <nav>
        <NavLink className="navlink" exact to="/">Practice</NavLink>
        <NavLink className="navlink" to="/dashboard">Dashboard</NavLink>
        <NavLink className="navlink" to="/settings">Settings</NavLink>
        <NavLink className="navlink" to="/auth">Login/Sign Up</NavLink>
      </nav>
      <div className="menu">Hamburger Menu</div>
    </div>
  )
}