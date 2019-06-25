import React from "react";
import { connect } from "react-redux";

import { desktopHelp } from "../../img/desktop-accent-instructions.jpg";
import { mobileHelp } from "../../img/mobile-accent-instructions.png";

import { Stats } from "../Stats/Stats";
import "./Conjugator.scss";

const mapConjugator = state => {
  return {
    word: state.word,
    tense: state.tense
  };
};

export const Conjugator = connect(
  mapConjugator,
  { desktopHelp, mobileHelp }
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
      let value = event.target.value;

      const regex = /[^a-zñáéíóúü]/i;

      if (value.includes("`") || value.includes(`'`) || value.includes('~')) {
        value = Array.from(value);

        value.pop();

        const character = value[value.length - 1];
        const allowedChars = ["a", "e", "i", "o", "u"];

        switch (character) {
          case 'a':
            value[value.length - 1] = 'á';
            break;
          case 'e':
            value[value.length - 1] = 'é';
            break;
          case 'i':
            value[value.length - 1] = 'í';
            break;
          case 'o':
            value[value.length - 1] = 'ó';
            break;
          case 'u':
            value[value.length - 1] = 'ú';
            break;
          case 'n':
            value[value.length - 1] = 'ñ';
          default:
            break;
        }

        value = value.join('');
      }

      if (regex.test(value)) return;

      await this.setState({ wordInput: value });
    };

    render() {
      return (
        <div className="conjugator">
          <h4 className="tense">Tense</h4>
          <div className="verb-container">
            <h2>Pronoun _______ (verb)</h2>
            <p>verb in english</p>
          </div>
          <form>
            <span>
              <b>Pronoun </b>
            </span>
            <input
              value={this.state.wordInput}
              onChange={this.handleUpdateWord}
              maxLength={20}
              type="text"
              placeholder=" type answer here"
            />
            <button>Submit</button>
          </form>
          <div className="bottom-sections">
            <Stats />
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
