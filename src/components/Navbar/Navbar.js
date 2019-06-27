import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { logout } from '../../actions';

import './Navbar.scss';

const mapNavbar = state => ({
  username: state.username,
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
      return (
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
          <div className="menu">Menu</div>
        </div>
      )
    }
});