import { useState, useEffect } from 'react';
import "./mainPage.css";
import { Link } from 'react-router-dom';



const MainPage = ({ username }) => {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    pitScouts: 0,
    matchScouts: 0,
    totalTeams: 0
  });

  useEffect(() => {
    // Simulate loading data
    setTimeout(() => {
      setStats({
        pitScouts: 24,
        matchScouts: 156,
        totalTeams: 45
      });
      setLoading(false);
    }, 1000);
  }, []);

  const handleCardClick = (path) => {
    navigate(path);
  };

  return (
    <div className="main-page">
      <header className="page-header">
        <h1>Welcome, {username}</h1>
      </header>

      {loading ? (
        <div className="loading-state">
          <p>Loading...</p>
        </div>
      ) : (
        <div className="content-wrapper">
          <div className="stats-grid">
            <div
              className="stat-card"
              onClick={() => handleCardClick("/pit-team-choice")}
            >
              <span className="stat-value">{stats.pitScouts}</span>
              <span className="stat-label">Pit Scouts</span>
            </div>
            <div
              className="stat-card"
              onClick={() => handleCardClick("/matchscout-team-choice")}
            >
              <span className="stat-value">{stats.matchScouts}</span>
              <span className="stat-label">Match Scouts</span>
            </div>
            <div
              className="stat-card"
              onClick={() => handleCardClick("/teams")}
            >
              <span className="stat-value">{stats.totalTeams}</span>
              <span className="stat-label">Total Teams</span>
            </div>
          </div>

          <div className="action-cards">
            <Link className="action-card" to={"/pit-team-choice"}>
              <h2>Pit Scouting</h2>
              <p>Start scouting robots up close.</p>
            </Link>
            <Link className="action-card" to={"/matchscout-team-choice"}>
              <h2>Match Scouting</h2>
              <p>Scout matches in real-time.</p>
            </Link>
            <Link className="action-card" to={"/rankings"}>
              <h2>Rankings</h2>
              <p>Check out the latest team rankings.</p>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default MainPage;
