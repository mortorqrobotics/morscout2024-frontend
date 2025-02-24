import { useNavigate } from "react-router-dom";
import "./matchButton.css";

const Button = ({ teamNumber, matchNumber, className, username }) => {
  const navigate = useNavigate();

  const handleTeamButtonClick = () => {
    navigate(`/matchscout-team-form/${teamNumber}/${matchNumber}`);
  };

  return (
    <button 
      className={`team-button ${className}`}
      onClick={handleTeamButtonClick}
    >
      <span className="team-number">#{teamNumber}</span>
    </button>
  );
};

const MatchButton = ({ teamNums, matchNum, username }) => {
  return (
    <div className="match-card">
      <div className="alliance-row red-alliance">
        {teamNums.slice(0, 3).map((num) => (
          <Button
            key={num}
            teamNumber={num}
            matchNumber={matchNum}
            className="red"
            username={username}
          />
        ))}
      </div>

      <div className="alliance-divider">
        <span>VS</span>
      </div>

      <div className="alliance-row blue-alliance">
        {teamNums.slice(3).map((num) => (
          <Button
            key={num}
            teamNumber={num}
            matchNumber={matchNum}
            className="blue"
            username={username}
          />
        ))}
      </div>
    </div>
  );
};

export default MatchButton;
