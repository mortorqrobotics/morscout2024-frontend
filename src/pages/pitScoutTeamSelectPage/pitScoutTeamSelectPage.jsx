import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/header/header";
import teamsData from "../../data/teams.json";
import "./pitScoutTeamSelectPage.css";

const Pitscoutpage = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    setTeams(teamsData.teams);
  }, []);

  const filteredTeams = teams.filter((team) =>
    team.teamNumber.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="team-select-page">
      <Header
        toWhere="/"
        headerText={
          <>
            <span style={{ color: "#FF5F00" }}>Pit </span>
            <span style={{ color: "#FFFFFF" }}>Scout</span>
          </>
        }
      />
      
      <div className="team-select-content">
        <input
          type="text"
          placeholder="Search by Team Number"
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        
        <div className="teams-grid">
          {filteredTeams.map((team) => (
            <button
              key={team.teamNumber}
              className="team-card"
              onClick={() => navigate(`/pit-team-form/${team.teamNumber}`)}
            >
              <span className="team-number">#{team.teamNumber}</span>
              <span className="team-name">{team.teamName}</span>
              <span className="team-location">{team.location}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Pitscoutpage;
