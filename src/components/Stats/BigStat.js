import React from "react";

import { Progress, Alert } from "reactstrap";

const BigStat = props => {
  const getTenseName = name => {
    return name
      .replace("_", " ")
      .split(" ")
      .map(s => s.charAt(0).toUpperCase() + s.substring(1))
      .join(" ");
  };

  const getTenseTotalAttempts = () => {
    return getCorrectAttempts() + getIncorrectAttempts();
  };

  const getCorrectAttempts = () => {
    if (props.stats) {
      return props.stats[`${props.valueName}_c`]
        ? props.stats[`${props.valueName}_c`].length
        : 0;
    } else return 0;
  };

  const getIncorrectAttempts = () => {
    if (props.stats) {
      return props.stats[`${props.valueName}_i`]
        ? props.stats[`${props.valueName}_i`].length
        : 0;
    }
  };

  return (
    <div className="stat-big">
      <div className="info">
        <div className="tense">{getTenseName(props.valueName)}</div>
        <div className="performance">
          {Number.isNaN(
            Math.floor(100 * (getCorrectAttempts() / getTenseTotalAttempts()))
          )
            ? 0
            : Math.floor(
                100 * (getCorrectAttempts() / getTenseTotalAttempts())
              )}
          %
        </div>
      </div>
      {getTenseTotalAttempts() ? (
        <Progress multi>
          <Progress
            bar
            value={(getCorrectAttempts() / getTenseTotalAttempts()) * 100}
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
