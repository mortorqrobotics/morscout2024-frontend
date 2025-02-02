import React from "react";
import "./scoringCounter.css";

const ScoringCounter = ({
  scoredValue,
  attemptedValue,
  onScoredChange,
  onAttemptedChange,
}) => {
  return (
    <div className="scoring-container">
      <div>
        <div className="scoring-counter">
          <span>Scored</span>
        </div>
        <div className="scoring-controls">
          <button
            type="button"
            onClick={() => onScoredChange(Math.max(0, scoredValue - 1))}
          >
            -
          </button>
          <span className="scoring-value">{scoredValue}</span>
          <button type="button" onClick={() => onScoredChange(scoredValue + 1)}>
            +
          </button>
        </div>
      </div>
      <div>
        <div className="scoring-counter">
          <span>Attemped</span>
        </div>

        <div className="scoring-controls">
          <button
            type="button"
            onClick={() => {
              const newAttempted = Math.max(scoredValue, attemptedValue - 1);
              onAttemptedChange(newAttempted);
            }}
          >
            -
          </button>
          <span className="scoring-value">{attemptedValue}</span>
          <button
            type="button"
            onClick={() => onAttemptedChange(attemptedValue + 1)}
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
};

export default ScoringCounter;
