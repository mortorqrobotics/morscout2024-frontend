import React, { useState, useEffect } from "react";
import "./matchScoutPage.css";
import Header from "../../components/header/header";
import MatchButton from "../../components/matchButton/matchButton";
import { getEventMatches } from "../../api/tba";
import SearchBar from "../../components/searchbar/searchbar";
import { useNavigate } from "react-router-dom";

const MatchscoutPage = () => {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    getEventMatches()
      .then((data) => {
        const qmMatches = data.filter((match) => match.compLevel === "qm");
        const sortedMatches = qmMatches.sort((a, b) => a.matchNum - b.matchNum);
        setMatches(sortedMatches);
      })
      .catch((err) => setError(err))
      .finally(() => setLoading(false));
  }, []);

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const filteredMatches = matches.filter((match, index) =>
    `MATCH ${match.matchNum}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <Header
        toWhere="/"
        headerText={
          <>
            <span style={{ color: "#FF5F00" }}>Match </span>
            <span style={{ color: "#FFFFFF" }}>Scout</span>
          </>
        }
      />
      <div className="match-buttons">
        <SearchBar searchText="Enter Match Number..." onSearch={handleSearch} />
        {loading ? (
          <h1>Loading...</h1>
        ) : error ? (
          <h1>{error.message}</h1>
        ) : filteredMatches.length > 0 ? (
          <div className="Matches">
            {filteredMatches.map((match) => (
              <div className="matchAndHeading" key={match.matchNum}>
                <Heading>{`MATCH ${match.matchNum}`}</Heading>
                <MatchButton
                  teamNums={[
                    ...match.red_team.map((team) => team.substring(3)),
                    ...match.blue_team.map((team) => team.substring(3)),
                  ]}
                  matchNum={match.matchNum} // Pass matchNum prop to MatchButton
                />
              </div>
            ))}
          </div>
        ) : <p>No matches found</p>}
      </div>
    </div>
  );
};

const Heading = ({ children }) => <h2 className="match-heading">{children}</h2>;

export default MatchscoutPage;
