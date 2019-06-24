import React from 'react';
import { connect } from 'react-redux';

import './Conjugator.scss';

const mapConjugator = state => {
  return ({
    word: state.word,
    tense: state.tense
  });
}

export const Conjugator = connect(mapConjugator, { /** Import actions involving getting new words */ })(props => {
  return (
    <div className='conjugator'>
      Actual conjugator part goes here
    </div>
  )
})