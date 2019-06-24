import React from 'react';
import { connect } from 'react-redux';

import './Dashboard.scss';

const mapDashboard = state => ({
  // Figure out what state we need to pull
});

export const Dashboard = connect()(props => {
  return (
    <div className='dashboard'>
      This is the dashboard!
    </div>
  )
});