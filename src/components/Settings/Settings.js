import React from "react";

import { withAuth } from "../";

import { setFilter, clearFilter, getFilter } from "../../actions";

import { connect } from "react-redux";
import { Button } from "reactstrap";
import "./Settings.scss";

const mapSettings = state => ({
  // Get state here
  token: state.token,
  filteredSettings: state.filteredSettings
});

export const Settings = connect(
  mapSettings,
  { setFilter, clearFilter, getFilter }
)(
  withAuth(props => {
    console.log(props.filteredSettings);

    const updateFilter = e => {
      if (e.target.checked) {
        props.setFilter([...props.filteredSettings, e.target.id]);
      } else {
        const defaultFilter = [
          "imperative",
          "subjunctive",
          "future",
          "imperfect",
          "conditional",
          "present_perfect",
          "future_perfect",
          "past_perfect",
          "preterite_archaic",
          "conditional_perfect"
        ];
        const newFilter = e.target.id
          ? Array.from(props.filteredSettings).splice(
              props.filteredSettings.findIndex(
                filter => filter === e.target.id
              ),
              1
            )
          : defaultFilter;

        props.clearFilter(newFilter);
      }
      props.getFilter(props.token);
    };

    return (
      <div className="settings-container">
        <h2>Select your settings</h2>
        <div className="settings-box">
          <form>
            <h5>Difficulty</h5>
            <div className="difficulty">
              <label htmlFor="indicative">
                <input
                  onChange={updateFilter}
                  type="checkbox"
                  id="indicative"
                  checked
                />
                Indicative
              </label>
              <label htmlFor="imperative">
                <input
                  onChange={updateFilter}
                  type="checkbox"
                  id="imperative"
                />
                Imperative
              </label>
              <label htmlFor="subjunctive">
                <input
                  onChange={updateFilter}
                  type="checkbox"
                  id="subjunctive"
                />
                Subjunctive
              </label>
            </div>
            <h5>Tenses</h5>
            <div className="tenses">
              <label htmlFor="present">
                <input
                  onChange={updateFilter}
                  type="checkbox"
                  id="present"
                  checked
                />
                Present
              </label>
              <label htmlFor="preterite">
                <input onChange={updateFilter} type="checkbox" id="preterite" />
                Preterite
              </label>
              <label htmlFor="imperfect">
                <input onChange={updateFilter} type="checkbox" id="imperfect" />
                Imperfect
              </label>
              <label htmlFor="future">
                <input onChange={updateFilter} type="checkbox" id="future" />
                Future
              </label>
              <label htmlFor="conditional">
                <input
                  onChange={updateFilter}
                  type="checkbox"
                  id="conditional"
                />
                Conditional
              </label>
              <label htmlFor="present-perfect">
                <input
                  onChange={updateFilter}
                  type="checkbox"
                  id="present_perfect"
                />
                Present Perfect
              </label>
              <label htmlFor="future-perfect">
                <input
                  onChange={updateFilter}
                  type="checkbox"
                  id="future_perfect"
                />
                Future Perfect
              </label>
              <label htmlFor="past-perfect">
                <input
                  onChange={updateFilter}
                  type="checkbox"
                  id="past_perfect"
                />
                Past Perfect
              </label>
              <label htmlFor="conditional-perfect">
                <input
                  onChange={updateFilter}
                  type="checkbox"
                  id="conditional_perfect"
                />
                Conditional Perfect
              </label>
            </div>
            <Button color="primary" onClick={updateFilter}>
              Set Default Settings
            </Button>
          </form>
        </div>
      </div>
    );
  })
);
