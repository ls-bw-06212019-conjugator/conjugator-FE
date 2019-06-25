import React from 'react';
import { connect } from 'react-redux';

import { desktopHelp } from '../../img/desktop-accent-instructions.jpg';
import { mobileHelp } from '../../img/mobile-accent-instructions.png';

import { Stats } from '../Stats/Stats';
import './Conjugator.scss';

const mapConjugator = state => {
  return ({
    word: state.word,
    tense: state.tense
  });
}

export const Conjugator = connect(mapConjugator, { desktopHelp, mobileHelp })(class extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isDesktop: false
    };

    this.updatePredicate = this.updatePredicate.bind(this);
  }
  componentDidMount() {
    this.updatePredicate();
    window.addEventListener("resize", this.updatePredicate);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updatePredicate);
  }

  updatePredicate() {
    this.setState({ isDesktop: window.innerWidth > 700 });
  }

  render (){
  return (
    <div className='conjugator'>
      <h4 className='tense'>Tense</h4>
      <div className="verb-container">
        <h2>Pronoun _______ (verb)</h2>
        <p>verb in english</p>
      </div>
      <form>
          <span><b>Pronoun </b></span>
          <input type="text" placeholder=" type answer here" />
          <button>Submit</button>
      </form>
      <div className="bottom-sections">
        <Stats />
        {console.log(desktopHelp)}
        <img src={this.state.isDesktop ? require('../../img/desktop-accent-instructions.jpg') : require('../../img/mobile-accent-instructions.png')} alt='Accented character input help' className='help-img' />
      </div>
    </div>
  )
  }
})