import { useNavigate } from "react-router-dom";
import "./matchButton.css";
import { getMatchButtonStatus, toggleMatchButtonStatus } from "../../api/server";
import { useEffect, useState } from "react";

const Button = ({ teamNumber, matchNumber, className }) => {
  const [status, setStatus] = useState("avaiable");
  const navigate = useNavigate();

  useEffect(() => {
    getMatchButtonStatus(teamNumber,matchNumber).then((response) => {
      setStatus(response.status);
    })

  }, [])

  const handleTeamButtonClick = async () => {
    try {
      const response = await toggleMatchButtonStatus();
      if (response.status === 200) {
        setStatus(response.status);
      }
      navigate(`/matchscout-team-form/${teamNumber}/${matchNumber}`);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <button className={"team-button  " + className} disabled={status !== "avaiable"} onClick={handleTeamButtonClick}>
      <span className="team-number">#{teamNumber}</span>
      <div className="scout-status">
        <span className="status-dot"></span>
        Not Scouted
      </div>
    </button>
  );
};

const MatchButton = ({ teamNums, matchNum }) => {
  return (
    <div className="match-card">
      <div className="alliance-row red-alliance">
        {teamNums.slice(0, 3).map((num) => (
          <Button key={num} teamNumber={num} matchNumber={matchNum} className="red" />
        ))}
      </div>

      <div className="alliance-divider">
        <span>VS</span>
      </div>

      <div className="alliance-row blue-alliance">
        {teamNums.slice(3).map((num) => (
          <Button key={num} teamNumber={num} matchNumber={matchNum} className="blue" />
        ))}
      </div>
    </div>
  );
};

export default MatchButton;
