import React from "react";
import { Link, NavLink } from "react-router-dom";

import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Button
} from "reactstrap";

import { logout } from "../../actions";

import { connect } from "react-redux";

import burger from "../../img/burger.png";

import "./Navbar.scss";

const mapNavbar = state => ({
  username: state.username
});

export const Navbar = connect(
  mapNavbar,
  { logout }
)(
  class extends React.Component {
    state = {
      dropdownOpen: false,
      isMobileOpen: false,
      isMobile: false
    };

    componentDidMount() {
      this.updatePredicate();
      window.addEventListener("resize", this.updatePredicate);
    }

    componentWillUnmount() {
      window.removeEventListener("resize", this.updatePredicate);
    }

    updatePredicate = () => {
      this.setState({ isMobile: window.innerWidth <= 790 });
    };

    componentDidUpdate() {
      if (!this.state.isMobile && this.state.isMobileOpen) {
        this.setState({ isMobileOpen: false });
      }
    }

    toggleMobileNav = async () => {
      await this.setState({ isMobileOpen: !this.state.isMobileOpen });
    };

    toggle = () => {
      this.setState(prevState => ({
        dropdownOpen: !prevState.dropdownOpen
      }));
    };

    render() {
      const mobileNavClassName = this.state.isMobileOpen ? "" : "hidden";
      return (
        <div>
          <div className="nav-bar">
            <Link to="/">
              <h1>Conjugator</h1>
            </Link>
            <nav>
              <NavLink
                activeClassName="active"
                className="navlink"
                exact
                to="/"
              >
                Practice
              </NavLink>
              <NavLink
                activeClassName="active"
                className="navlink"
                to="/dashboard"
              >
                Dashboard
              </NavLink>
              <NavLink
                activeClassName="active"
                className="navlink"
                to="/settings"
              >
                Settings
              </NavLink>
              {this.props.username ? (
                <Dropdown
                  className="user-dropdown"
                  isOpen={this.state.dropdownOpen}
                  toggle={this.toggle}
                >
                  <DropdownToggle caret>{this.props.username}</DropdownToggle>
                  <DropdownMenu>
                    <DropdownItem onClick={this.props.logout}>
                      Logout
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              ) : (
                <NavLink
                  activeClassName="active"
                  className="navlink"
                  to="/auth"
                >
                  Log in
                </NavLink>
              )}
            </nav>
            <img
              src={burger}
              onClick={this.toggleMobileNav}
              alt=""
              className="menu"
            />
          </div>
          <nav className={`mobile-nav ${mobileNavClassName}`}>
            <div className="empty-space" onClick={this.toggleMobileNav} />
            <div className="nav-contents">
              <h3>Conjugator</h3>
              <NavLink
                onClick={this.toggleMobileNav}
                activeClassName="active"
                className="navlink"
                to="/"
              >
                Practice
              </NavLink>
              <NavLink
                onClick={this.toggleMobileNav}
                activeClassName="active"
                className="navlink"
                to="/dashboard"
              >
                Dashboard
              </NavLink>
              <NavLink
                onClick={this.toggleMobileNav}
                activeClassName="active"
                className="navlink"
                to="/settings"
              >
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
                <NavLink
                  onClick={this.toggleMobileNav}
                  activeClassName="active"
                  className="navlink"
                  to="/auth"
                >
                  Log In
                </NavLink>
              )}
            </div>
          </nav>
        </div>
      );
    }
  }
);
