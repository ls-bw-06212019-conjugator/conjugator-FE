import React from 'react';
import { Link, NavLink } from 'react-router-dom';

import { connect } from 'react-redux';

import './Navbar.scss';

const mapNavbar = state => ({
  username: state.username,
});

export const Navbar = connect(mapNavbar, {  })(props => {
  return (
    <div className='navbar'>
      <Link to="/"><h1>Conjugator</h1></Link>
      <nav>
        <NavLink activeClassName='active' className="navlink" exact to="/">Practice</NavLink>
        <NavLink activeClassName='active' className="navlink" to="/dashboard">Dashboard</NavLink>
        <NavLink activeClassName='active' className="navlink" to="/settings">Settings</NavLink>
        { props.username ? 
        <NavLink activeClassName='active' className='navlink' to='/profile'>{props.username}</NavLink> :
        <NavLink activeClassName='active' className="navlink" to="/auth">Log in</NavLink>
        }
      </nav>
      <div className="menu">Hamburger Menu</div>
    </div>
  )
});