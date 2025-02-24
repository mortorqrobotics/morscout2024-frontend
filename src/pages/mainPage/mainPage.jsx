import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import "./mainPage.css";

const currentMatch =  {
  matchNumber: 'Qualification 24',
  teams: [
    { number: '1234', alliance: 'red' },
    { number: '5678', alliance: 'red' },
    { number: '9012', alliance: 'red' },
    { number: '3456', alliance: 'blue' },
    { number: '7890', alliance: 'blue' },
    { number: '1357', alliance: 'blue' }
  ]
}

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
            <Link to="/pit-team-choice" className="stat-card">
              <span className="stat-value">{stats.pitScouts}</span>
              <span className="stat-label">Pit Scouts</span>
            </Link>
            <Link to="/matchscout-team-choice" className="stat-card">
              <span className="stat-value">{stats.matchScouts}</span>
              <span className="stat-label">Match Scouts</span>
            </Link>
            <Link to="/teams" className="stat-card">
              <span className="stat-value">{stats.totalTeams}</span>
              <span className="stat-label">Total Teams</span>
            </Link>
          </div>

          <div className="action-cards">
            <Link to="/pit-team-choice" className="action-card">
              <h2>Pit Scouting</h2>
              <p>Start scouting robots up close.</p>
            </Link>
            <Link to="/matchscout-team-choice" className="action-card">
              <h2>Match Scouting</h2>
              <p>Scout matches in real-time.</p>
            </Link>
            <Link to="/rankings" className="action-card">
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
