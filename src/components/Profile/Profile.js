import React from 'react';

import { connect } from 'react-redux';

import { withAuth } from '../';

import { logout } from '../../actions/';

import { Button } from 'reactstrap';

import './Profile.scss';

const mapProfile = state => ({
  username: state.username,
});

export const Profile = withAuth(connect(mapProfile, { logout })(props => {
  const logout = () => {
    props.logout();
  }

  return (
    <Button color='danger' onClick={logout}>Log Out</Button>
  )
}));