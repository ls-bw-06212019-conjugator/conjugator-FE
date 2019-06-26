import React from 'react';

import { withAuth } from '../';

import { connect } from 'react-redux';
import { Button } from 'reactstrap';
import './Settings.scss';

const mapSettings = state => ({
  // Get state here
  filteredSettings: state.filteredSettings
});

export const Settings = connect(mapSettings, {  })(withAuth(props => {
  
  // updateSettings = e => {
  //   // if not checked, add id to array
  //   let filteredArray = e.target.querySelectorAll("input").filter(x=> !x.checked).map(x=> x.id);
  //   // .sendUpdates()
  // }

  

  return (
    <div className="settings-container">
      <h3>Select your settings</h3>
      {/* <form onSubmit={updateSettings}> */}
      <form>
        <h5>Difficulty</h5>
        <div className="difficulty">
          <label for="common-regular"><input type="checkbox" id="common-regular" checked />Indicative</label>
          <label for="common-irregular"><input type="checkbox" id="common-irregular" />Imperative</label>
          <label for="all"><input type="checkbox" id="all" />Subjunctive</label>
        </div>
        <h5>Tenses</h5>
        <div className="tenses">
          <label for="present">
            <input type="checkbox" id="present" checked />
            Present
          </label>
          <label for="preterite">
            <input type="checkbox" id="preterite" />
            Preterite
          </label>
          <label for="imperfect">
            <input type="checkbox" id="imperfect" />
            Imperfect
          </label>
          <label for="future">
            <input type="checkbox" id="future" />
            Future
          </label>
          <label for="conditional">
            <input type="checkbox" id="conditional" />
            Conditional
          </label>
          <label for="present-perfect">
            <input type="checkbox" id="present_perfect" />
            Present Perfect
          </label>
          <label for="future-perfect">
            <input type="checkbox" id="future_perfect" />
            Future Perfect
          </label>
          <label for="past-perfect">
            <input type="checkbox" id="past_perfect" />
            Past Perfect
          </label>
          <label for="conditional-perfect">
            <input type="checkbox" id="conditional_perfect" />
            Conditional Perfect
          </label>
        </div>
        <Button color="primary" type="submit">Update Settings</Button>
        <Button>Cancel</Button>
        <Button>Default</Button>

      </form>
    </div>
  );
}));
