import React from 'react';
import { connect } from 'react-redux';
import { Stats } from '../Stats/Stats';
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
      <h4>Tense</h4>
      <h2>Pronoun _______ (verb)</h2><p>verb in english</p>
      <form>
          <span><b>Pronoun</b></span>
          <input type="text" placeholder="type answer here" />
          <button>Submit</button>
      </form>
      <Stats />
      <div className="help">Instructions/keyboard shortcuts/help</div>
    </div>
  )
})