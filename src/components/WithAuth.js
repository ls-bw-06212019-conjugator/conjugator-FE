import React from 'react';

export const withAuth = component => props => {
  if(!component) {
    return <div className='error'>No component passed to withAuth!</div>
  } else {
    if(localStorage.getItem('token')) {
      return props.component;
    } else {
      props.history.push('/login');
    }
  }
}