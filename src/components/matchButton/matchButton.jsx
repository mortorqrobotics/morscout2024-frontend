import { useNavigate } from "react-router-dom";
import "./matchButton.css";
import { getMatchButtonStatus, toggleMatchButtonStatus } from "../../api/server";
import { useEffect, useState, useCallback } from "react";
import { toast } from "react-hot-toast";

const Button = ({ teamNumber, matchNumber, className, username, status, scoutedBy, onButtonClick }) => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleTeamButtonClick = async () => {
    if (!username) {
      toast.error("Please log in first");
      return;
    }
    
    setIsLoading(true);
    try {
      const response = await toggleMatchButtonStatus(teamNumber, matchNumber, username);
      if (response.status === 200) {
        onButtonClick(teamNumber, response.data.status, response.data.scoutedBy);
        if (response.data.status === "working") {
          navigate(`/matchscout-team-form/${teamNumber}/${matchNumber}`);
        }
      } else {
        toast.error(response.data.error || "Failed to update status");
      }
    } catch (error) {
      console.error('Toggle error:', error);
      toast.error("Error updating match status");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button 
      className={`team-button ${className} ${isLoading ? 'loading' : ''}`}
      disabled={status === "working" || isLoading} 
      onClick={handleTeamButtonClick}
    >
      {isLoading ? (
        <div className="button-spinner"></div>
      ) : (
        <>
          <span className="team-number">#{teamNumber}</span>
          <div className="scout-status">
            <span className="status-dot"></span>
            {status === "working" ? (
              <span>Scouting: {scoutedBy || "Unknown"}</span>
            ) : (
              "Not Scouted"
            )}
          </div>
        </>
      )}
    </button>
  );
};

const MatchButton = ({ teamNums, matchNum, username }) => {
  const [buttonStatuses, setButtonStatuses] = useState({});
  const [lastFetchTime, setLastFetchTime] = useState(null);

  const fetchMatchStatuses = useCallback(async () => {
    // Only fetch if it's been more than 30 seconds since last fetch
    if (lastFetchTime && Date.now() - lastFetchTime < 30000) {
      return;
    }

    try {
      const response = await fetch(`${BACKEND_URL}/api/matchscout/match/${matchNum}/status`);
      const data = await response.json();
      
      if (data.success) {
        setButtonStatuses(data.statuses);
        setLastFetchTime(Date.now());
      }
    } catch (error) {
      console.error("Error fetching match statuses:", error);
    }
  }, [matchNum, lastFetchTime]);

  useEffect(() => {
    fetchMatchStatuses();
  }, [fetchMatchStatuses]);

  const handleButtonUpdate = (teamNumber, status, scoutedBy) => {
    setButtonStatuses(prev => ({
      ...prev,
      [teamNumber]: { status, scoutedBy }
    }));
  };

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
            status={buttonStatuses[num]?.status || "available"}
            scoutedBy={buttonStatuses[num]?.scoutedBy}
            onButtonClick={handleButtonUpdate}
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
            status={buttonStatuses[num]?.status || "available"}
            scoutedBy={buttonStatuses[num]?.scoutedBy}
            onButtonClick={handleButtonUpdate}
          />
        ))}
      </div>
    </div>
  );
};

export default MatchButton;
