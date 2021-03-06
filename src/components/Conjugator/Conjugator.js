import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
  Button,
  Collapse,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Spinner
} from "reactstrap";
import { desktopHelp } from "../../img/desktop-accent-instructions.jpg";
import { mobileHelp } from "../../img/mobile-accent-instructions.png";
import {
  getWord,
  queueRecordCorrect,
  queueRecordIncorrect,
  recordCorrect,
  recordIncorrect
} from "../../actions";

import { Stats } from "../Stats/Stats";
import "./Conjugator.scss";

const mapConjugator = state => {
  return {
    word: state.word,
    type: state.word.type,
    infinitive: state.word.infinitive,
    tense: state.word.tense,
    wordInEnglish: state.word.infinitive_english,
    pronoun: state.word.form,
    gettingWord: state.gettingWord,
    answer: state.word.answer,
    token: state.token,
    filteredSettings: state.filteredSettings
  };
};

export const Conjugator = connect(mapConjugator, {
  desktopHelp,
  mobileHelp,
  getWord,
  queueRecordCorrect,
  queueRecordIncorrect,
  recordCorrect,
  recordIncorrect
})(
  class extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        isDesktop: false,
        wordInput: "",
        isWrong: false,
        collapse: false,
        invalid: false,
        modal: false
      };

      this.updatePredicate = this.updatePredicate.bind(this);

      this.inputRef = React.createRef();
    }

    componentWillMount() {
      this.props.getWord(this.props.token);
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
            break;
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
      this.inputRef.current.focus();
      if (this.state.wordInput.toLowerCase() === this.props.answer) {
        if (!this.state.invalid) this.props.queueRecordCorrect(this.props.word);
        this.props.getWord(this.props.token);
        this.setState({ invalid: false });
        this.setState({
          wordInput: "",
          collapse: false
        });
      } else {
        if (!this.state.invalid)
          this.props.queueRecordIncorrect(this.props.word);
        this.setState({ invalid: false });
        this.setState({
          isWrong: true
        });
      }
    };

    toggleCollapse = e => {
      this.setState({ invalid: true });
      e.preventDefault();
      this.inputRef.current.focus();
      this.setState({
        collapse: !this.state.collapse
      });
    };

    toggleModal = () => {
      this.setState(prevState => ({
        modal: !prevState.modal
      }));
    };

    skipWord = () => {
      this.props.getWord(this.props.token);
      this.inputRef.current.focus();
      this.setState({
        wordInput: "",
        collapse: false
      });
    };

    recordCorrect = (word, token) => {
      this.props.recordCorrect(word, token);
    };

    recordIncorrect = (word, token) => {
      this.props.recordIncorrect(word, token);
    };

    render() {
      return (
        <div className="conjugator">
          {this.props.gettingWord ? (
            <div className="tense" />
          ) : (
            <h4 className="tense">{this.props.tense}</h4>
          )}
          {this.props.gettingWord ? (
            <div className="verb-container">
              <Spinner color="info" />
            </div>
          ) : (
            <div className="verb-container">
              <h2>{`${this.props.pronoun} _______ (${this.props.infinitive})`}</h2>
              <p>{this.props.wordInEnglish}</p>
            </div>
          )}
          {this.props.filteredSettings &&
          (!this.props.filteredSettings.includes("subjunctive") ||
            !this.props.filteredSettings.includes("imperative")) ? (
            <p className="mood">Mood: {this.props.type}</p>
          ) : null}
          <form
            className={this.state.isWrong ? "wrong" : null}
            onSubmit={this.testWord}
          >
            <div className="pronoun">
              {this.props.pronoun}
            </div>
            <input
              // Disable any autocorrect/autofill if any
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
              spellCheck="false"
              autoFocus
              value={this.state.wordInput}
              onChange={this.handleUpdateWord}
              maxLength={25}
              type="text"
              placeholder=" type answer here"
              ref={this.inputRef}
            />
            <button
              action="submit"
              className={this.state.isWrong ? "wrong" : null}
            >
              Submit
            </button>
          </form>
          <Button
            color="link"
            className="skip small-bot-marg"
            onClick={this.skipWord}
          >
            Skip this Word
          </Button>
          <Button
            color="danger"
            className={
              this.state.isWrong || this.state.collapse
                ? "small-bot-marg"
                : "small-bot-marg hidden"
            }
            onClick={this.toggleCollapse}
          >
            Incorrect answer! Click to show answer
          </Button>
          <Collapse
            className={
              this.state.isWrong || this.state.collapse
                ? "small-bot-marg"
                : "small-bot-marg hidden"
            }
            isOpen={this.state.collapse}
          >
            {this.props.answer}
          </Collapse>
          {!this.props.token ? (
            <div className="signup-modal">
              <Modal isOpen={this.state.modal} toggle={this.toggleModal}>
                <ModalHeader toggle={this.toggleModal}>Sign Up!</ModalHeader>
                <ModalBody>
                  By creating an account, you can have all of your personal
                  stats and progress tracked for you! Also, you can customize
                  your settings of which verbs you would like to practice!
                </ModalBody>
                <ModalFooter>
                  <Link to="/auth">
                    <Button color="primary">Sign up for free</Button>
                  </Link>
                  <Button
                    color="secondary"
                    size="sm"
                    onClick={this.toggleModal}
                  >
                    I don't like free stuff
                  </Button>
                </ModalFooter>
              </Modal>
            </div>
          ) : null}
          <div className="bottom-sections">
            <Stats
              pingSignup={this.toggleModal}
              summarized
              recordCorrectWord={this.recordCorrect}
              recordIncorrectWord={this.recordIncorrect}
            />
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
