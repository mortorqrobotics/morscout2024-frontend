import React, { useState, useEffect } from 'react';
import Header from '../../components/header/header';
import SearchBar from '../../components/searchbar/searchbar';
import { getRankings } from '../../api/tba';
import "./rankings.css";

const Rankings = () => {
    const [rankings, setRankings] = useState([]);
    const [filteredRankings, setFilteredRankings] = useState([]);
    const [loading, setLoading] = useState(true); // State to manage loading status

    useEffect(() => {
      const fetchRankings = async () => {
        try {
          const data = await getRankings();
          setRankings(data);
          setFilteredRankings(data);
          setLoading(false); // Set loading to false when data is fetched
        } catch (error) {
          console.error('Error fetching rankings:', error);
        }
      };
  
      fetchRankings();
    }, []);

    const handleSearch = (searchTerm) => {
      const filtered = rankings.filter(ranking =>
        ranking.team.includes(searchTerm) ||
        ranking.rank.toString().includes(searchTerm)
      );
      setFilteredRankings(filtered);
    };
  
    return (
      <div>
        <Header
            toWhere="/"
            headerText="Rankings"
        />
        <SearchBar onSearch={handleSearch} searchText="Search by team or rank"/>
        {/* Conditional rendering for loading animation */}
        {loading ? (
          <div className="loading">
            Loading...
          </div>
        ) : (
          <ul className='ranking-list'>
            {filteredRankings.map((ranking, index) => (
              <li className='list-item' key={index}>{`Rank ${ranking.rank}: Team ${ranking.team.substring(3)}`}</li>
            ))}
          </ul>
        )}
      </div>
    );
};

export default Rankings;
