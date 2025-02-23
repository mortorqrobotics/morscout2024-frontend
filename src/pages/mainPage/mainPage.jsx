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
    <div className={`main-page ${loading ? 'loading' : ''}`}>
      <div className="page-header">
        <h1>Welcome, {username}</h1>
      </div>

      {/* Current Match Section */}
      <div className="current-match">
        <h2>Current Match</h2>
        <div className="match-card">
          <div className="match-number">{currentMatch.matchNumber}</div>
          <div className="alliances">
            <div className="alliance red">
              {currentMatch.teams
                .filter(team => team.alliance === 'red')
                .map(team => (
                  <div key={team.number} className="team-number">
                    {team.number}
                  </div>
                ))}
            </div>
            <div className="alliance-divider">VS</div>
            <div className="alliance blue">
              {currentMatch.teams
                .filter(team => team.alliance === 'blue')
                .map(team => (
                  <div key={team.number} className="team-number">
                    {team.number}
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <span className="stat-value">{stats.pitScouts}</span>
          <span className="stat-label">Pit Scouts</span>
        </div>
        <div className="stat-card">
          <span className="stat-value">{stats.matchScouts}</span>
          <span className="stat-label">Match Scouts</span>
        </div>
        <div className="stat-card">
          <span className="stat-value">{stats.totalTeams}</span>
          <span className="stat-label">Teams</span>
        </div>
      </div>

     {/* <div className="action-cards">
        <button 
          className="action-card" 
          onClick={() => navigate('/pit-team-choice')}
          disabled={loading}
        >
          <div className="action-icon">📋</div>
          <h3>Pit Scouting</h3>
          <p>Scout team specs and capabilities</p>
        </button>

        <button 
          className="action-card"
          onClick={() => navigate('/matchscout-team-choice')}
          disabled={loading}
        >
          <div className="action-icon">🎯</div>
          <h3>Match Scouting</h3>
          <p>Scout team performance in matches</p>
        </button>

        <button 
          className="action-card"
          onClick={() => navigate('/rankings')}
          disabled={loading}
        >
          <div className="action-icon">🏆</div>
          <h3>Rankings</h3>
          <p>View team rankings and stats</p>
        </button>
      </div> */}
    </div>
  );
};

export default MainPage;
