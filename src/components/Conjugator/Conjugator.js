import React from "react";
import { connect } from "react-redux";
import { Alert, Button, Collapse, Spinner } from "reactstrap";
import { desktopHelp } from "../../img/desktop-accent-instructions.jpg";
import { mobileHelp } from "../../img/mobile-accent-instructions.png";
import { getWord } from "../../actions";

import { Stats } from "../Stats/Stats";
import "./Conjugator.scss";

const mapConjugator = state => {
  return {
    word: state.word.infinitive,
    tense: state.word.tense,
    wordInEnglish: state.word.infinitive_english,
    pronoun: state.word.form,
    gettingWord: state.gettingWord,
    answer: state.word.answer
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
        wordInput: "",
        isWrong: false,
        collapse: false
      };

      this.updatePredicate = this.updatePredicate.bind(this);
    }

    componentWillMount() {
      this.props.getWord();
      // this.setState({
      //   wordInput: ""
      // })
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
      this.state.isWrong &&
        this.setState({
          isWrong: false
        });
      let value = Array.from(event.target.value);
      const regex = /^$|[ a-zñáéíóúü]+$/i;
      if (
        value.findIndex(el => el === "`") !== -1 ||
        value.findIndex(el => el === `'`) !== -1 ||
        value.findIndex(el => el === "~") !== -1
      ) {
        let index = value.findIndex(el => el === "`");
        if (index === -1) {
          index = value.findIndex(el => el === `'`);
        }
        if (index === -1) {
          index = value.findIndex(el => el === "~");
        }

        value.splice(index, 1);

        const character = value[index - 1];

        switch (character) {
          case "a":
            value[index - 1] = "á";
            break;
          case "e":
            value[index - 1] = "é";
            break;
          case "i":
            value[index - 1] = "í";
            break;
          case "o":
            value[index - 1] = "ó";
            break;
          case "u":
            value[index - 1] = "ú";
            break;
          case "n":
            value[index - 1] = "ñ";
          default:
            break;
        }
      }

      value = value.join("");

      if (regex.test(value)) {
        await this.setState({ wordInput: value });
      } else {
        return;
      }
    };

    testWord = e => {
      e.preventDefault();
      if (this.state.wordInput === this.props.answer) {
        this.props.getWord();
        this.setState({
          wordInput: ""
        });
      } else {
        this.setState({
          isWrong: true
        });
      }
    };

    toggleCollapse = e => {
      // e.preventDefault();
      this.setState({
        collapse: !this.state.collapse
      })
    }

    skipWord = () => {
      this.props.getWord();
      this.setState({
        wordInput: "",
        collapse: false
      })
    }

    render() {
      return (
        <div className="conjugator">
          {this.props.gettingWord ? <div className='tense' /> : <h4 className="tense">{this.props.tense}</h4>}
          {this.props.gettingWord ? (
            <div className="verb-container">
              <Spinner color="info" />
            </div>
          ) : (
            <div className="verb-container">
              <h2>{`${this.props.pronoun} _______ (${this.props.word})`}</h2>
              <p>{this.props.wordInEnglish}</p>
            </div>
          )}
          <form onSubmit={this.testWord}>
            <span>
              <b>{this.props.pronoun} </b>
            </span>
            <input
              className={this.state.isWrong ? "wrong" : null}
              value={this.state.wordInput}
              onChange={this.handleUpdateWord}
              maxLength={20}
              type="text"
              placeholder=" type answer here"
            />
            <button action="submit" className={this.state.isWrong ? 'wrong' : null}>Submit</button>
          </form>
          <Button color="link" className="skip small-bot-marg" onClick={this.skipWord}>Skip this Word</Button>
          {/* <Alert color="danger" className={this.state.isWrong ? "alert" : "alert hidden"}>Incorrect Answer!</Alert> */}
          <Button color="danger" className={this.state.isWrong ? "small-bot-marg" : "small-bot-marg hidden"} onClick={this.toggleCollapse}>
            Incorrect Answer! Click to Show Answer
          </Button>          
          <Collapse className={this.state.isWrong ? "small-bot-marg" : "small-bot-marg hidden"} isOpen={this.state.collapse}>
            {this.props.answer}
          </Collapse>
          <div className="bottom-sections">
            <Stats />
            <p>Temporary pronoun instructions:</p>
            <p>
              number is which person, i.e. 1 = 1st person, 2 = second person, 3
              = 3rd person. S = singular, P = plural
            </p>
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
