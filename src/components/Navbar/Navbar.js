import React from 'react';
import { Link, NavLink } from 'react-router-dom';

import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Button } from 'reactstrap';

import { logout } from "../../actions";

import { connect } from "react-redux";

import burger from "../../img/burger.png";

import "./Navbar.scss";

const mapNavbar = state => ({
  username: state.username
});

export const Navbar = connect(mapNavbar, { logout })(
  class extends React.Component {
    state = {
      dropdownOpen: false
    }
    
    toggle = () => {
      this.setState(prevState => ({
        dropdownOpen: !prevState.dropdownOpen
      }))
    }

    render(){
      const isMobile = false;
      return !isMobile ? (
        <div className='navbar'>
          <Link to="/"><h1>Conjugator</h1></Link>
          <nav>
            <NavLink activeClassName='active' className="navlink" exact to="/">Practice</NavLink>
            <NavLink activeClassName='active' className="navlink" to="/dashboard">Dashboard</NavLink>
            <NavLink activeClassName='active' className="navlink" to="/settings">Settings</NavLink>
            { this.props.username ? 
              <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                <DropdownToggle caret activeClassName='active' className="navlink">{this.props.username}</DropdownToggle>
                <DropdownMenu>
                  <DropdownItem onClick={this.props.logout}>Logout</DropdownItem>
                </DropdownMenu>
              </Dropdown>
            :
            <NavLink activeClassName='active' className="navlink" to="/auth">Log in</NavLink>
            }
          </nav>
          <img src={burger} alt="" className="menu" />
        </div>
      ) : (
        <nav className="mobile-nav">
      <h3>Conjugator</h3>
      <NavLink activeClassName="active" className="navlink" to="/">
        Practice
      </NavLink>
      <NavLink activeClassName="active" className="navlink" to="/dashboard">
        Dashboard
      </NavLink>
      <NavLink activeClassName="active" className="navlink" to="/settings">
        Settings
      </NavLink>
      {this.props.username ? (
        <div className="user">
          <h4>{this.props.username}</h4>
          <Button color="danger" onClick={this.props.logout}>
            Log Out
          </Button>
        </div>
      ) : (
        <NavLink activeClassName="active" className="navlink" to="/auth">
          Log In
        </NavLink>
      )}
    </nav>
      )
    }
});