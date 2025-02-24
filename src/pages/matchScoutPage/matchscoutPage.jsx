import { useState, useEffect } from "react";
import "./matchScoutPage.css";
import Header from "../../components/header/header";
import MatchButton from "../../components/matchButton/matchButton";
import matchesData from "../../data/matches.json";

const MatchscoutPage = ({ username }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    setMatches(matchesData.matches);
  }, []);

  const filteredMatches = matches.filter((match) =>
    `${match.matchNum}`.includes(searchTerm)
  );

  return (
    <div className="match-scout-page">
      <Header
        toWhere="/"
        headerText={
          <>
            <span style={{ color: "#FF5F00" }}>Match </span>
            <span style={{ color: "#FFFFFF" }}>Scout</span>
          </>
        }
      />
      
      <div className="match-scout-content">
        <input 
          type="text"
          placeholder="Search match number..."
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        
        <div className="matches-list">
          {filteredMatches.map((match) => (
            <div key={match.matchNum} className="match-container">
              <h2 className="match-heading">Qualification {match.matchNum}</h2>
              <div className="match-time">{match.time}</div>
              <MatchButton
                teamNums={[...match.red_team, ...match.blue_team]}
                matchNum={match.matchNum}
                username={username}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MatchscoutPage;
