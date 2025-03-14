import { useState, useEffect } from "react";
import "./matchScoutPage.css";
import Header from "../../components/header/header";
import MatchButton from "../../components/matchButton/matchButton";
import { getEventMatches } from "../../api/tba";
import SearchBar from "../../components/searchbar/searchbar";
import { useScrollToTop } from '../../hooks/useScrollToTop';

const MatchscoutPage = ({ username }) => {
  useScrollToTop();
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

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
        <SearchBar searchText="Search match number..." onSearch={handleSearch} />

        {loading ? (
          <div className="loading-state">
            <div className="loading-spinner"></div>
            <p>Loading matches...</p>
          </div>
        ) : error ? (
          <div className="error-state">
            <p>Error: {error.message}</p>
            <button onClick={() => window.location.reload()} className="retry-button">
              Retry
            </button>
          </div>
        ) : (
          <div className="matches-list">
            {filteredMatches.map((match) => (
              <div key={match.matchNum} className="match-container">
                <h2 className="match-heading">Qualification {match.matchNum}</h2>
                <MatchButton
                  teamNums={[
                    ...match.red_team.map((team) => team.substring(3)),
                    ...match.blue_team.map((team) => team.substring(3)),
                  ]}
                  matchNum={match.matchNum}
                  username={username}
                />
              </div>
            ))}
          </div>
        )}

        {!loading && !error && filteredMatches.length === 0 && (
          <div className="no-results">
            <p>No matches found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MatchscoutPage;
