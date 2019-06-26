import React, { useState } from "react";

import { connect } from "react-redux";

import { withAuth } from "../";

import { logout } from "../../actions/";

import { Button } from "reactstrap";

import "./Profile.scss";

const mapProfile = state => ({
  username: state.username
});

export const Profile = withAuth(
  connect(
    mapProfile,
    { logout }
  )(props => {

    const [email, setEmail] = useState('default@conjugator.io');

    const logout = () => {
      props.logout();
    };

    return (
      <div className="profile">
        <div className="header">
          <h1>Hello, {props.username}.</h1>

          <Button color="danger" className="logout" onClick={logout}>
            Log Out
          </Button>
        </div>
        <p>There are currently no settings to see here.</p>
      </div>
    );
  })
);
