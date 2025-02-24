import { useNavigate } from "react-router-dom";
import "./matchButton.css";
import { getMatchButtonStatus, toggleMatchButtonStatus } from "../../api/server";
import { useEffect, useState, useCallback } from "react";
import { toast } from "react-hot-toast";

const Button = ({ teamNumber, matchNumber, className, username, onButtonClick }) => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleTeamButtonClick = async () => {
    if (!username) {
      toast.error("Please log in first");
      return;
    }
    
    setIsLoading(true);
    try {
      navigate(`/matchscout-team-form/${teamNumber}/${matchNumber}`);
    } catch (error) {
      console.error('Navigation error:', error);
      toast.error("Error navigating to form");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button 
      className={`team-button ${className} ${isLoading ? 'loading' : ''}`}
      disabled={isLoading} 
      onClick={handleTeamButtonClick}
    >
      {isLoading ? (
        <div className="button-spinner"></div>
      ) : (
        <>
          <span className="team-number">#{teamNumber}</span>
          <div className="scout-status">
            <span className="status-dot"></span>
            <span>Not Scouted</span>
          </div>
        </>
      )}
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
            onButtonClick={() => {}}
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
            onButtonClick={() => {}}
          />
        ))}
      </div>
    </div>
  );
};

export default MatchButton;
