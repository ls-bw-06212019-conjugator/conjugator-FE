import React from "react";

import { Progress, Alert } from "reactstrap";

const BigStat = props => {
  const getTenseName = name => {
    return name.replace("_", " ")
      .split(" ")
      .map(s => s.charAt(0).toUpperCase() + s.substring(1))
      .join(" ");
  };

  const getTenseTotalAttempts = () => {
    return (
      getCorrectAttempts() +
      getIncorrectAttempts()
    );
  };

  const getCorrectAttempts = () => {
    if(props.personalStats) {
      return props.personalStats[`${props.valueName}_c`];
    } else return 0;
  }

  const getIncorrectAttempts = () => {
    if(props.personalStats) {
      return props.personalStats[`${props.valueName}_i`];
    }
  }

  console.log(props.valueName);

  return (
    <div className="stat-big">
      <div className="info">
        <div className="tense">{getTenseName(props.valueName)}</div>
        <div className="performance">
          {Math.floor(
            100 *
              (getCorrectAttempts() /
                getTenseTotalAttempts())
          )}
          %
        </div>
      </div>
      {getTenseTotalAttempts() ? (
        <Progress multi>
          <Progress
            bar
            value={
              (getCorrectAttempts() /
                getTenseTotalAttempts()) *
              100
            }
          >
            {getCorrectAttempts()}
          </Progress>
          <Progress
            bar
            color="danger"
            value={(getIncorrectAttempts() / getTenseTotalAttempts()) * 100}
          >
            {getIncorrectAttempts()}
          </Progress>
        </Progress>
      ) : (
        <Alert color="info">No stats available about this tense</Alert>
      )}
    </div>
  );
};

export default BigStat;
