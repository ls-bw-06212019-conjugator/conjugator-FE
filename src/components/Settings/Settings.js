import React from 'react';

import { withAuth } from '../';

import { connect } from 'react-redux';

import './Settings.scss';

const mapSettings = state => ({
  // Get state here
});

export const Settings = connect(mapSettings, {  })(withAuth(props => {
  return (
    <div>
      I am the settings.
    </div>
  );
}));
