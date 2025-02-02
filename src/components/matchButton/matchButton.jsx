import React from "react";
import { useNavigate } from "react-router-dom";
import "./matchButton.css";

const MatchButton = ({ teamNums, matchNum }) => {
  const navigate = useNavigate();

  return (
    <div className="match-card">
      <div className="alliance-row red-alliance">
        {teamNums.slice(0, 3).map((num, index) => (
          <button
            key={index}
            className="team-button red"
            onClick={() => navigate(`/matchscout-team-form/${num}/${matchNum}`)}
          >
            <span className="team-number">#{num}</span>
            <div className="scout-status">
              <span className="status-dot"></span>
              Not Scouted
            </div>
          </button>
        ))}
      </div>
      
      <div className="alliance-divider">
        <span>VS</span>
      </div>
      
      <div className="alliance-row blue-alliance">
        {teamNums.slice(3).map((num, index) => (
          <button
            key={index + 3}
            className="team-button blue"
            onClick={() => navigate(`/matchscout-team-form/${num}/${matchNum}`)}
          >
            <span className="team-number">#{num}</span>
            <div className="scout-status">
              <span className="status-dot"></span>
              Not Scouted
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default MatchButton;
