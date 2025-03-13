import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getEventTeamsNumbers } from "../../api/tba";
import Header from "../../components/header/header";
import SearchBar from "../../components/searchbar/searchbar";
import "./pitScoutTeamSelectPage.css";
import useScrollToTop from '../../hooks/useScrollToTop';

const Pitscoutpage = () => {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filteredTeams, setFilteredTeams] = useState([]);
  const navigate = useNavigate();

  useScrollToTop();

  useEffect(() => {
    setLoading(true);
    getEventTeamsNumbers()
      .then((data) => {
        const sortedTeams = data.sort((a, b) => a.teamNumber - b.teamNumber);
        setTeams(sortedTeams);
        setFilteredTeams(sortedTeams);
      })
      .catch((err) => setError(err))
      .finally(() => setLoading(false));
  }, []);

  const handleSearch = (searchTerm) => {
    const filtered = teams.filter((team) =>
      team.teamNumber.toString().includes(searchTerm)
    );
    setFilteredTeams(filtered);
  };

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
        <SearchBar onSearch={handleSearch} searchText="Search by Team Number" />

        {loading ? (
          <div className="loading-state">
            <div className="loading-spinner"></div>
            <p>Loading teams...</p>
          </div>
        ) : error ? (
          <div className="error-state">
            <p>Error: {error.message}</p>
            <button onClick={() => window.location.reload()} className="retry-button">
              Retry
            </button>
          </div>
        ) : (
          <div className="teams-grid">
            {filteredTeams.map((team) => (
              <button
                key={team.teamNumber}
                className="team-card"
                onClick={() => navigate(`/pit-team-form/${team.teamNumber}`)}
              >
                <span className="team-number">#{team.teamNumber}</span>

              </button>
            ))}
          </div>
        )}

        {!loading && !error && filteredTeams.length === 0 && (
          <div className="no-results">
            <p>No teams found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Pitscoutpage;
