import React, { Component } from "react";

import { Alert, Button, Spinner } from "reactstrap";

import { Link } from 'react-router-dom';

import { connect } from "react-redux";

import { getStats, clearQueue, logout } from "../../actions";

import "./Stats.scss";

const mapStateToStats = state => ({
  token: state.token,
  globalStats: state.globalStats,
  personalStats: state.personalStats,
  recordCorrect: state.queueRecordCorrect,
  recordIncorrect: state.queueRecordIncorrect,
  gettingStats: state.gettingStats,
  attemptsToGetStats: state.attemptsToGetStats
});

export const Stats = connect(
  mapStateToStats,
  { getStats, clearQueue, logout }
)(
  class extends Component {
    // Localized & Personalized Stats
    state = {
      currentAttempts: 0,
      correct: 0,
      incorrect: 0,
      streak: 0,
      bestStreak: 0
    };

    recordCorrect = word => {
      console.log('correct');
      const newStats = {
        currentAttempts: this.state.currentAttempts + 1,
        correct: this.state.correct + 1,
        streak: this.state.streak + 1,
        bestStreak:
          this.state.streak + 1 >= this.state.bestStreak
            ? this.state.streak + 1
            : this.state.bestStreak
      };
      this.setState(newStats);
      this.props.clearQueue();
      this.props.recordCorrectWord(word, this.props.token);
      return true;
    };

    recordIncorrect = word => {
      const newStats = {
        currentAttempts: this.state.currentAttempts + 1,
        incorrect: this.state.incorrect + 1,
        streak: 0
      };
      this.setState(newStats);

      this.props.clearQueue();

      this.props.recordIncorrectWord(word, this.props.token);
      return true;
    };

    componentDidMount() {
      this.props.getStats(this.props.token);
    }

    componentDidUpdate (){
      this.update();
    }

    update() {
      if (this.props.personalStats) {
        console.log(this.props);
        if (
          this.props.personalStats.best_streak &&
          this.state.bestStreak !== this.props.personalStats.best_streak
        ) {
          console.log(this.props.personalStats.best_streak);
          this.setState({
            bestStreak: this.props.personalStats.best_streak
          });
        }

        // Attempts flow through stats component first before being sent to database

        this.props.recordCorrect &&
          this.recordCorrect(this.props.recordCorrect);
        this.props.recordIncorrect &&
          this.recordIncorrect(this.props.recordIncorrect);
      } else if (
        this.props.token &&
        !this.props.gettingStats &&
        this.props.attemptsToGetStats < 50
      ) {
        console.log('fetching stats...');
        this.props.getStats(this.props.token);
      } else if (this.props.attemptsToGetStats >= 50){
        this.props.logout();
      }
    }

    getTotalCorrect = () => {
      let sum = 0;
      sum += this.props.personalStats.present_c
      sum += this.props.personalStats.future_c
      sum += this.props.personalStats.imperfect_c
      sum += this.props.personalStats.preterite_c
      sum += this.props.personalStats.conditional_c
      sum += this.props.personalStats.present_perfect_c
      sum += this.props.personalStats.future_perfect_c
      sum += this.props.personalStats.past_perfect_c
      sum += this.props.personalStats.preterite_archaic_c
      sum += this.props.personalStats.conditional_perfect_c
      return sum;
    }

    getTotalIncorrect = () => {
      let sum = 0;
      sum += this.props.personalStats.present_i
      sum += this.props.personalStats.future_i
      sum += this.props.personalStats.imperfect_i
      sum += this.props.personalStats.preterite_i
      sum += this.props.personalStats.conditional_i
      sum += this.props.personalStats.present_perfect_i
      sum += this.props.personalStats.future_perfect_i
      sum += this.props.personalStats.past_perfect_i
      sum += this.props.personalStats.preterite_archaic_i
      sum += this.props.personalStats.conditional_perfect_i
      return sum;
    }

    render() {
      const percentCorrect = Math.floor(this.state.correct / this.state.currentAttempts * 100);
      return this.props.gettingStats ? (
        <Spinner color="info" />
      ) : this.props.attemptsToGetStats >= 50 ? (
        <Alert color="danger">Timed out, unable to get stats! Signing out...</Alert>
      ) : this.props.summarized ? (
        <div className={`stats ${this.props.summarized ? "summarized" : null }`}>
          <div className="stat">
            <h4>Total Attempts</h4>
            <p>{this.state.currentAttempts}</p>
          </div>
          <div className='stat'>
            <h4>Correct</h4>
            <p>{this.state.correct}</p>
          </div>
          <div className='stat'>
            <h4>Incorrect</h4>
            <p>{this.state.incorrect}</p>
          </div>
          <div className='stat'>
            <h4>% correct</h4>
            <p>{!Number.isNaN(percentCorrect) ? percentCorrect : ( percentCorrect === 'Infinity' ? 100 : 0 )}%</p>
          </div>
          <div className='stat'>
            <h4>Streak</h4>
            <p>{this.state.streak}</p>
          </div>
          <div className='stat'>
            <h4>Best Streak</h4>
            {this.props.token ? <p>{this.state.bestStreak}</p> : (
              <div className='sign-in'>
                <Link to='/auth'>Login in</Link> for stats and more features.
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="stats">
          <div className="top">
            <div className="stat-box">
              <h3>Best Streak</h3>
              <div className="box">
                <h2>{this.state.bestStreak}</h2>
                <p>better than</p>
                <h4>82%</h4>
                <p>of all other users</p>
              </div>
            </div>
            <div className="stat-box">
              <h3>Accuracy</h3>
              <div className="box">
                <h2>{Math.floor(100 * (this.getTotalCorrect() / (this.getTotalCorrect() + this.getTotalIncorrect())))}%</h2>
                <p>better than</p>
                <h4>82%</h4>
                <p>of all other users</p>
              </div>
            </div>
            <div className="stat-box">
              <h3>Today's Goal</h3>
              <div className="box">
                <h2>10/50</h2>
                <p>correct conjugations</p>
                <Button color="link">Edit daily goal</Button>
              </div>
            </div>
          </div>
          <div className="bottom">
            <div className="row"></div>
            <div className="row"></div>
            <div className="row"></div>
          </div>
        </div>
      )
    }
  }
);
