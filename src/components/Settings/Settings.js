import React from "react";

import { withAuth } from "../";

import { setFilter, getSettings } from "../../actions";

import { connect } from "react-redux";
import { Button, Alert } from "reactstrap";
import "./Settings.scss";

const mapSettings = state => ({
  // Get state here
  token: state.token,
  filteredSettings: state.filteredSettings,
  gettingSettings: state.gettingSettings,
  getSettingsError: state.getSettingsError
});

export const Settings = connect(
  mapSettings,
  { setFilter, getSettings }
)(
  withAuth(
    class extends React.Component {
      componentWillMount() {
        this.getSettings();
      }

      getSettings = () => {
        this.props.getSettings(this.props.token);
      }

      updateFilter = e => {
        console.log('ran');
        if (e.target.checked) {
          const newFilter = Array.from(this.props.filteredSettings);
          newFilter.splice(
            this.props.filteredSettings.findIndex(
              filter => filter === e.target.id
            ),
            1
          );

          this.props.filteredSettings.includes(e.target.id) &&
            this.props.setFilter(newFilter, this.props.token);
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
            ? [...this.props.filteredSettings, e.target.id]
            : defaultFilter;
          this.props.setFilter(newFilter, this.props.token);
        }
      };

      render() {
        const disabled = this.props.gettingSettings;

        return (
          <div className="settings-container">
            <h2>Select your settings</h2>
            <div className="settings-box">
              {this.props.getSettingsError ? (
                <Alert color="danger">
                  Unable to load settings.{" "}
                  <Button onClick={this.getSettings} color="link">Try again</Button>
                </Alert>
              ) : (
                <form>
                  <h5>Localized Conjugations</h5>
                  <div className='localized'>
                    <label htmlFor='vosotros'>
                      <input 
                        disabled={disabled}
                        checked={disabled ? false : 
                          this.props.filteredSettings.includes('vosotros')
                        }
                        onChange={this.updateFilter}
                        type='checkbox'
                        id='vosotros'
                      />
                      Include vosotros
                    </label>
                  </div>
                  <h5>Difficulty (Moods)</h5>
                  <div className="difficulty">
                    <label htmlFor="indicative">
                      <input
                        disabled={disabled}
                        checked={disabled ? false :
                          !this.props.filteredSettings.includes("indicative")
                        }
                        onChange={this.updateFilter}
                        type="checkbox"
                        id="indicative"
                      />
                      Indicative
                    </label>
                    <label htmlFor="imperative">
                      <input
                        disabled={disabled}
                        checked={disabled ? false :
                          !this.props.filteredSettings.includes("imperative")
                        }
                        onChange={this.updateFilter}
                        type="checkbox"
                        id="imperative"
                      />
                      Imperative
                    </label>
                    <label htmlFor="subjunctive">
                      <input
                        disabled={disabled}
                        checked={disabled ? false :
                          !this.props.filteredSettings.includes("subjunctive")
                        }
                        onChange={this.updateFilter}
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
                        disabled={disabled}
                        checked={disabled ? false :
                          !this.props.filteredSettings.includes("present")
                        }
                        onChange={this.updateFilter}
                        type="checkbox"
                        id="present"
                      />
                      Present
                    </label>
                    <label htmlFor="preterite">
                      <input
                        disabled={disabled}
                        checked={disabled ? false :
                          !this.props.filteredSettings.includes("preterite")
                        }
                        onChange={this.updateFilter}
                        type="checkbox"
                        id="preterite"
                      />
                      Preterite
                    </label>
                    <label htmlFor="imperfect">
                      <input
                        disabled={disabled}
                        checked={disabled ? false :
                          !this.props.filteredSettings.includes("imperfect")
                        }
                        onChange={this.updateFilter}
                        type="checkbox"
                        id="imperfect"
                      />
                      Imperfect
                    </label>
                    <label htmlFor="future">
                      <input
                        disabled={disabled}
                        checked={disabled ? false :
                          !this.props.filteredSettings.includes("future")
                        }
                        onChange={this.updateFilter}
                        type="checkbox"
                        id="future"
                      />
                      Future
                    </label>
                    <label htmlFor="conditional">
                      <input
                        disabled={disabled}
                        checked={disabled ? false :
                          !this.props.filteredSettings.includes("conditional")
                        }
                        onChange={this.updateFilter}
                        type="checkbox"
                        id="conditional"
                      />
                      Conditional
                    </label>
                    <label htmlFor="present-perfect">
                      <input
                        disabled={disabled}
                        checked={disabled ? false :
                          !this.props.filteredSettings.includes(
                            "present_perfect"
                          )
                        }
                        onChange={this.updateFilter}
                        type="checkbox"
                        id="present_perfect"
                      />
                      Present Perfect
                    </label>
                    <label htmlFor="future-perfect">
                      <input
                        disabled={disabled}
                        checked={disabled ? false :
                          !this.props.filteredSettings.includes(
                            "future_perfect"
                          )
                        }
                        onChange={this.updateFilter}
                        type="checkbox"
                        id="future_perfect"
                      />
                      Future Perfect
                    </label>
                    <label htmlFor="past-perfect">
                      <input
                        disabled={disabled}
                        checked={disabled ? false :
                          !this.props.filteredSettings.includes("past_perfect")
                        }
                        onChange={this.updateFilter}
                        type="checkbox"
                        id="past_perfect"
                      />
                      Past Perfect
                    </label>
                    <label htmlFor="conditional-perfect">
                      <input
                        disabled={disabled}
                        checked={disabled ? false :
                          !this.props.filteredSettings.includes(
                            "conditional_perfect"
                          )
                        }
                        onChange={this.updateFilter}
                        type="checkbox"
                        id="conditional_perfect"
                      />
                      Conditional Perfect
                    </label>
                  </div>
                  <Button color="primary" onClick={this.updateFilter}>
                    Set Default Settings
                  </Button>
                </form>
              )}
            </div>
          </div>
        );
      }
    }
  )
);
