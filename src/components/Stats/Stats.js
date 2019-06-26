import React, { useState } from 'react';

import { connect } from 'react-redux';

import { getStats } from '../../actions';

import './Stats.scss';

const mapStateToStats = state => ({
  token: state.token,

});

export const Stats = connect(mapStateToStats, { getStats })(props => {

  // Localized stats
  const [currentAttemps, setCurrentAttempts] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [wrong, setWrong] = useState(0);

  // Personalized stats


  return (
    <div className='stats'>
      This component shows statistics, modular based on props
    </div>
  )
});