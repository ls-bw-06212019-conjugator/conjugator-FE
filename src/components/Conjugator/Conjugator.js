import React from "react";
import { connect } from "react-redux";
import { Alert } from "reactstrap";
import { desktopHelp } from "../../img/desktop-accent-instructions.jpg";
import { mobileHelp } from "../../img/mobile-accent-instructions.png";
import { getWord } from '../../actions';

import { Stats } from "../Stats/Stats";
import "./Conjugator.scss";

const mapConjugator = state => {
  return {
    word: state.word.infinitive,
    tense: state.word.tense,
    wordInEnglish: state.word.infinitive_english,
    pronoun: state.word.form
  };
};

export const Conjugator = connect(
  mapConjugator,
  { desktopHelp, mobileHelp, getWord }
)(
  class extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        isDesktop: false,
        wordInput: ""
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

    handleUpdateWord = async event => {
      console.log(event.target.value);
      let value = Array.from(event.target.value);
      console.log(value);
      const regex = /^$|[a-zñáéíóúü]+$/i;
      console.log(value.findIndex(el => el === '`'));
      if (value.findIndex(el => el === '`') !== -1 || value.findIndex(el => el === `'`) !== -1 || value.findIndex(el => el === '~') !== -1) {
        console.log(value);
        let index = value.findIndex(el => el === '`');
        if (index === -1){
          index = value.findIndex(el => el === `'`);
        }
        if(index === -1){
          index = value.findIndex(el => el === '~');
        }

        value.splice(index, 1);

        const character = value[index - 1];
        const allowedChars = ["a", "e", "i", "o", "u"];

        switch (character) {
          case 'a':
            value[index - 1] = 'á';
            break;
          case 'e':
            value[index - 1] = 'é';
            break;
          case 'i':
            value[index - 1] = 'í';
            break;
          case 'o':
            value[index - 1] = 'ó';
            break;
          case 'u':
            value[index - 1] = 'ú';
            break;
          case 'n':
            value[index - 1] = 'ñ';
          default:
            break;
        }

        
      }
      value = value.join('');
      if (regex.test(value)) {
        await this.setState({ wordInput: value });
        
      } else {
        console.log('invalid char!');
        return;
      }

      
    };

    testWord = () => {
        if(this.state.wordInput === this.props.word.answer) {
          // return success alert
          // clear fields
          // get new word/tense
        }
        // else if(word matches but without accents) {
          // return warning alert
          // clear fields
          // get new word/tense
        // }
        else {
          // return danger alert
        }
    }

    render() {
      return (
        <div className="conjugator">
          <h4 className="tense">{this.props.tense}</h4>
          <div className="verb-container">
            <h2>{`${this.props.pronoun} _______ ${this.props.word}`}</h2>
            <p>{this.props.wordInEnglish}</p>
          </div>
          <form onSubmit={this.testWord}>
            <span>
              <b>{this.props.pronoun} </b>
            </span>
            <input
              value={this.state.wordInput}
              onChange={this.handleUpdateWord}
              maxLength={20}
              type="text"
              placeholder=" type answer here"
            />
            <button action="submit">Submit</button>
          </form>
          <button onClick={e =>this.props.getWord(e)}>getWord test</button>

          {/* if success */}
          <Alert color="success">Nice Job!</Alert>
          {/* if correct with accent missing */}
          {/* <Alert color="warning">Don't forget the accent! (answer with accent)</Alert> */}
          {/* if wrong */}
          {/* <Alert color="danger">Try again!</Alert> */}


          <div className="bottom-sections">
            {/* <Stats /> */}
            {console.log(desktopHelp)}
            <img
              src={
                this.state.isDesktop
                  ? require("../../img/desktop-accent-instructions.jpg")
                  : require("../../img/mobile-accent-instructions.png")
              }
              alt="Accented character input help"
              className="help-img"
            />
          </div>
        </div>
      );
    }
  }
);
