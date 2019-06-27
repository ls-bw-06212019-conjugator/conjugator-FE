import React, { Component } from "react";

import { Alert, Button, Spinner, Progress } from "reactstrap";

import { Link } from "react-router-dom";

import { connect } from "react-redux";

import { getStats, clearQueue, logout } from "../../actions";

import BigStat from './BigStat';

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
      console.log("correct");
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

    componentDidUpdate() {
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
        console.log("fetching stats...");
        this.props.getStats(this.props.token);
      } else if (this.props.attemptsToGetStats >= 50) {
        this.props.logout();
      }
    }

    getTotalCorrect = () => {
      let sum = 0;
      sum += this.state.present_c ? this.state.present_c.length : 0;
      sum += this.state.future_c ? this.state.future_c.length : 0;
      sum += this.state.imperfect_c ? this.state.imperfect_c.length : 0;
      sum += this.state.preterite_c ? this.state.preterite_c.length : 0;
      sum += this.state.conditional_c ? this.state.conditional_c.length : 0;
      sum += this.state.present_perfect_c
        ? this.state.present_perfect_c.length
        : 0;
      sum += this.state.future_perfect_c
        ? this.state.future_perfect_c.length
        : 0;
      sum += this.state.past_perfect_c ? this.state.past_perfect_c.length : 0;
      sum += this.state.preterite_archaic_c
        ? this.state.preterite_archaic_c.length
        : 0;
      sum += this.state.conditional_perfect_c
        ? this.state.conditional_perfect_c.length
        : 0;
      return sum;
    };

    getTotalIncorrect = () => {
      let sum = 0;
      sum += this.state.present_i ? this.state.present_i.length : 0;
      sum += this.state.future_i ? this.state.future_i.length : 0;
      sum += this.state.imperfect_i ? this.state.imperfect_i.length : 0;
      sum += this.state.preterite_i ? this.state.preterite_i.length : 0;
      sum += this.state.conditional_i ? this.state.conditional_i.length : 0;
      sum += this.state.present_perfect_i
        ? this.state.present_perfect_i.length
        : 0;
      sum += this.state.future_perfect_i
        ? this.state.future_perfect_i.length
        : 0;
      sum += this.state.past_perfect_i ? this.state.past_perfect_i.length : 0;
      sum += this.state.preterite_archaic_i
        ? this.state.preterite_archaic_i.length
        : 0;
      sum += this.state.conditional_perfect_i
        ? this.state.conditional_perfect_i.length
        : 0;
      return sum;
    };

    render() {
      let present_c = 0;
      let present_total = 0;
      let future_c = 0;
      let future_total = 0;
      let imperfect_c = 0;
      let imperfect_total = 0;
      let preterite_c = 0;
      let preterite_total = 0;
      let conditional_c = 0;
      let conditional_total = 0;
      let present_perfect_c = 0;
      let present_perfect_total = 0;
      let future_perfect_c = 0;
      let future_perfect_total = 0;
      let past_perfect_c = 0;
      let past_perfect_total = 0;
      let preterite_archaic_c = 0;
      let preterite_archaic_total = 0;
      let conditional_perfect_c = 0;
      let conditional_perfect_total = 0;
      let present_i = 0;
      let future_i = 0;
      let imperfect_i = 0;
      let preterite_i = 0;
      let conditional_i = 0;
      let present_perfect_i = 0;
      let future_perfect_i = 0;
      let past_perfect_i = 0;
      let preterite_archaic_i = 0;
      let conditional_perfect_i = 0;

      if(this.props.personalStats !== undefined) {
        present_c = this.props.personalStats.present_c ? this.props.personalStats.present_c.length : 0;
        future_c = this.props.personalStats.future_c ? this.props.personalStats.future_c.length : 0;
        imperfect_c = this.props.personalStats.imperfect_c ? this.props.personalStats.imperfect_c.length : 0;
        preterite_c = this.props.personalStats.preterite_c ? this.props.personalStats.preterite_c.length : 0;
        conditional_c = this.props.personalStats.conditional_c ? this.props.personalStats.conditional_c.length : 0;
        present_perfect_c = this.props.personalStats.present_perfect_c ? this.props.personalStats.present_perfect_c.length : 0;
        future_perfect_c = this.props.personalStats.future_perfect_c ? this.props.personalStats.future_perfect_c.length : 0;
        past_perfect_c = this.props.personalStats.past_perfect_c ? this.props.personalStats.past_perfect_c.length : 0;
        preterite_archaic_c = this.props.personalStats.preterite_archaic_c ? this.props.personalStats.preterite_archaic_c.length : 0;
        conditional_perfect_c = this.props.personalStats.conditional_perfect_c ? this.props.personalStats.conditional_perfect_c.length : 0;
        present_i = this.props.personalStats.present_i ? this.props.personalStats.present_i.length : 0;
        future_i = this.props.personalStats.future_i ? this.props.personalStats.future_i.length : 0;
        imperfect_i = this.props.personalStats.imperfect_i ? this.props.personalStats.imperfect_i.length : 0;
        preterite_i = this.props.personalStats.preterite_i ? this.props.personalStats.preterite_i.length : 0;
        conditional_i = this.props.personalStats.conditional_i ? this.props.personalStats.conditional_i.length : 0;
        present_perfect_i = this.props.personalStats.present_perfect_i ? this.props.personalStats.present_perfect_i.length : 0;
        future_perfect_i = this.props.personalStats.future_perfect_i ? this.props.personalStats.future_perfect_i.length : 0;
        past_perfect_i = this.props.personalStats.past_perfect_i ? this.props.personalStats.past_perfect_i.length : 0;
        preterite_archaic_i = this.props.personalStats.preterite_archaic_i ? this.props.personalStats.preterite_archaic_i.length : 0;
        conditional_perfect_i = this.props.personalStats.conditional_perfect_i ? this.props.personalStats.conditional_perfect_i.length : 0;
        present_total = present_i + present_c;
        future_total = future_i + future_c;
        imperfect_total = imperfect_i + imperfect_c;
        preterite_total = preterite_i + preterite_c;
        conditional_total = conditional_i + conditional_c;
        present_perfect_total = present_perfect_i + present_perfect_c;
        future_perfect_total = future_perfect_i + future_perfect_c;
        past_perfect_total = past_perfect_i + past_perfect_c;
        preterite_archaic_total = preterite_archaic_i + preterite_archaic_c;
        conditional_perfect_total = conditional_perfect_i + conditional_perfect_c;
      }

      const tenses = ['present', 'future', 'imperfect', 'preterite', 'conditional', 'present_perfect', 'future_perfect', 'past_perfect', 'preterite_archaic', 'conditional_perfect'];

      const percentCorrect = Math.floor(
        (this.state.correct / this.state.currentAttempts) * 100
      );
      return this.props.gettingStats ? (
        <Spinner color="info" />
      ) : this.props.attemptsToGetStats >= 50 ? (
        <Alert color="danger">
          Timed out, unable to get stats! Signing out...
        </Alert>
      ) : this.props.summarized ? (
        <div className={`stats ${this.props.summarized ? "summarized" : null}`}>
          <div className="stat">
            <h4>Total Attempts</h4>
            <p>{this.state.currentAttempts}</p>
          </div>
          <div className="stat">
            <h4>Correct</h4>
            <p>{this.state.correct}</p>
          </div>
          <div className="stat">
            <h4>Incorrect</h4>
            <p>{this.state.incorrect}</p>
          </div>
          <div className="stat">
            <h4>% correct</h4>
            <p>
              {!Number.isNaN(percentCorrect)
                ? percentCorrect
                : percentCorrect === "Infinity"
                ? 100
                : 0}
              %
            </p>
          </div>
          <div className="stat">
            <h4>Streak</h4>
            <p>{this.state.streak}</p>
          </div>
          <div className="stat">
            <h4>Best Streak</h4>
            {this.props.token ? (
              <p>{this.state.bestStreak}</p>
            ) : (
              <div className="sign-in">
                <Link to="/auth">Login in</Link> for stats and more features.
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="stats">
          <div className="top">
          <div className="stat-box">
              <h3>Total Attempts</h3>
              <div className="box">
                <h2>{this.getTotalCorrect() + this.getTotalIncorrect()}</h2>
                <p>total conjugations</p>
              </div>
            </div>
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
                <h2>
                  {Math.floor(
                    100 *
                      (this.getTotalCorrect() /
                        (this.getTotalCorrect() + this.getTotalIncorrect()))
                  )}
                  %
                </h2>
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
            <h3>Performance by tense</h3>
            {
              tenses.map(tense => <BigStat key={tense} valueName={tense} stats={this.props.personalStats}/>)
            }
          </div>
        </div>
      );
    }
  }
);
