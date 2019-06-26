import React from 'react';
import { connect } from 'react-redux';
import { Stats } from '../Stats/Stats';

import { withAuth } from '../';

import './Dashboard.scss';

const mapDashboard = state => ({
  // Figure out what state we need to pull
  username: state.username
});

export const Dashboard = connect(mapDashboard)(withAuth(
  class extends React.Component {
    state = {

    }

    render() {
      return (
        <div className='dashboard'>
          <header>
            <h1>{this.props.username}</h1>
            <h1 className="gray">Dashboard</h1>
          </header>
          <Stats />
        </div>
      )
    }
}));