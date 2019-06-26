import React from 'react';
import { connect } from 'react-redux';
import { Stats } from '../Stats/Stats';

import { withAuth } from '../';

import './Dashboard.scss';

const mapDashboard = state => ({
  // Figure out what state we need to pull
});

export const Dashboard = connect(mapDashboard)(withAuth(props => {
  return (
    <div className='dashboard'>
      <div className="welcome">
        <h2>Welcome to your dashboard!</h2>
        <p>Your statistics will be displayed below:</p>
      </div>
      <Stats />
    </div>
  )
}));