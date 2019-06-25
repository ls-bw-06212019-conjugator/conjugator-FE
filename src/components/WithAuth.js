import React from 'react';

import { Link } from 'react-router-dom';

import { setAuthError } from '../actions';

import { connect } from 'react-redux';

const mapAuth = state => ({
  token: state.token
});

export const withAuth = Component => connect(mapAuth, { setAuthError })(props => {
  if(!Component) {
    return <div className='error'>No component passed to withAuth!</div>
  } else {
    if(props.token) {
      return <Component />;
    } else {
      props.setAuthError('');
      props.history.push('/auth');
      return <div className='no-auth'>You must <Link to='/auth'>log in</Link> to view this page. </div>;
    }
  }
});