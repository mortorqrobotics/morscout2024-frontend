import React from "react";
import { Link } from "react-router-dom";
import "./matchButton.css";

const MatchButton = ({ teamNums, matchNum }) => {
  return (
    <div>
      <hr />
      <div className="line">
        {teamNums.slice(0, 3).map((num, index) => (
          <Link key={index} to={`/matchscout-team-form/${num}/auto/${matchNum}`}>
            <button className="blueButton">{num}</button>
          </Link>
        ))}
      </div>
      <div className="line">
        {teamNums.slice(3).map((num, index) => (
          <Link key={index + 3} to={`/matchscout-team-form/${num}/auto/${matchNum}`}>
            <button className="redButton">{num}</button>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default MatchButton;
