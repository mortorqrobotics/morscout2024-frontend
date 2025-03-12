import { useState, useEffect } from "react";
import Header from "../../components/header/header";
import SearchBar from "../../components/searchbar/searchbar";
import { getRankings, getTeamName } from "../../api/tba";
import "./rankings.css";

const Rankings = () => {
  const [rankings, setRankings] = useState([]);
  const [filteredRankings, setFilteredRankings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortOrderInfo, setSortOrderInfo] = useState([]);
  const [sortConfig, setSortConfig] = useState({
    key: 'rank',
    direction: 'asc'
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getRankings();

        // Check if response and rankings exist
        if (!response || !response.rankings) {
          throw new Error('No rankings data available');
        }

        const rankingsWithTeamNames = await Promise.all(
          response.rankings.filter(ranking => ranking && ranking.team_key).map(async ranking => ({
            ...ranking,
            teamNumber: ranking.team_key.replace('frc', ''),
            team: await getTeamName(ranking.team_key),
            qualAverage: ranking.qual_average || 0,
            matchesPlayed: ranking.matches_played || 0,
            record: ranking.record || { wins: 0, losses: 0, ties: 0 },
            sortOrders: ranking.sort_orders || []
          }))
        );

        setRankings(rankingsWithTeamNames);
        setFilteredRankings(rankingsWithTeamNames);
        setSortOrderInfo(response.sort_order_info || []);
        setError(null);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSearch = (searchTerm) => {
    const filtered = rankings.filter(
      (ranking) =>
        ranking.team?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ranking.teamNumber?.toString().includes(searchTerm) ||
        ranking.rank?.toString().includes(searchTerm)
    );
    setFilteredRankings(filtered);
  };

  const sortData = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }

    const sorted = [...filteredRankings].sort((a, b) => {
      let aValue, bValue;

      // Handle nested properties and special cases
      if (key === 'record') {
        aValue = a.record.wins * 2 + a.record.ties;
        bValue = b.record.wins * 2 + b.record.ties;
      } else if (key.startsWith('sortOrder-')) {
        const index = parseInt(key.split('-')[1]);
        aValue = a.sortOrders[index];
        bValue = b.sortOrders[index];
      } else if (key === 'team') {
        aValue = parseInt(a.teamNumber);
        bValue = parseInt(b.teamNumber);
      } else {
        aValue = a[key];
        bValue = b[key];
      }

      if (aValue < bValue) return direction === 'asc' ? -1 : 1;
      if (aValue > bValue) return direction === 'asc' ? 1 : -1;
      return 0;
    });

    // Update ranks after sorting
    const sortedWithNewRanks = sorted.map((item, index) => ({
      ...item,
      currentRank: index + 1
    }));

    setFilteredRankings(sortedWithNewRanks);
    setSortConfig({ key, direction });
  };

  return (
    <div className="rankings-page">
      <Header toWhere="/" headerText="Rankings" />
      <div className="rankings-content">
        <SearchBar
          onSearch={handleSearch}
          searchText="Search by team name, number, or rank"
        />

        {loading ? (
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p>Loading rankings...</p>
          </div>
        ) : error ? (
          <div className="error-container">
            <p>Error loading rankings: {error}</p>
            <p>Please try again later.</p>
          </div>
        ) : filteredRankings.length === 0 ? (
          <div className="no-results-container">
            <p>No rankings found.</p>
          </div>
        ) : (
          <div className="rankings-table-container">
            <table className="rankings-table">
              <thead>
                <tr>
                  <th onClick={() => sortData('rank')}>
                    Rank {sortConfig.key === 'rank' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                  </th>
                  <th onClick={() => sortData('team')}>
                    Team {sortConfig.key === 'team' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                  </th>
                  <th onClick={() => sortData('record')}>
                    Record (W-L-T) {sortConfig.key === 'record' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                  </th>
                  <th onClick={() => sortData('matchesPlayed')}>
                    Matches {sortConfig.key === 'matchesPlayed' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                  </th>
                  <th onClick={() => sortData('qualAverage')}>
                    Qual Avg {sortConfig.key === 'qualAverage' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                  </th>
                  {sortOrderInfo.map((info, index) => (
                    <th key={index} onClick={() => sortData(`sortOrder-${index}`)}>
                      {info.name} {sortConfig.key === `sortOrder-${index}` && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredRankings.map((ranking) => (
                  <tr key={ranking.team_key} className="ranking-row">
                    <td className="rank-cell">#{ranking.currentRank}</td>
                    <td className="team-cell">
                      <span className="team-number">{ranking.teamNumber}</span>
                      <span className="team-name">{ranking.team}</span>
                    </td>
                    <td className="record-cell">
                      {`${ranking.record.wins}-${ranking.record.losses}-${ranking.record.ties}`}
                    </td>
                    <td>{ranking.matchesPlayed}</td>
                    <td>{ranking.qualAverage.toFixed(2)}</td>
                    {ranking.sortOrders.map((value, index) => (
                      <td key={index}>
                        {sortOrderInfo[index]?.precision
                          ? value.toFixed(sortOrderInfo[index].precision)
                          : value}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Rankings;
