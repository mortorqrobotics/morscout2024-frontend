import PitButton from "../../components/pitButton/pitButton";
import Header from "../../components/header/header";
import SearchBar from "../../components/searchbar/searchbar"; // Import the SearchBar component
import { useEffect, useState } from "react";
import { getEventTeamsNumbers } from "../../api/tba";

import { Link } from "react-router-dom";
const Pitscoutpage = () => {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [filteredTeams, setFilteredTeams] = useState([]); // State to hold filtered teams

  useEffect(()=>{
    setLoading(true)
    getEventTeamsNumbers().then(data => {
      setTeams(data);
      setFilteredTeams(data); // Initialize filtered teams with all teams
    })
    .catch((err)=>{setError(err)})
    .finally(() =>setLoading(false))
  }, []) // useEffect dependency array is empty to run only once on component mount

  // Function to handle search
  const handleSearch = (searchTerm) => {
    const filtered = teams.filter(team =>
      team.teamNumber.toString().includes(searchTerm) // Filter teams by team number
    );
    setFilteredTeams(filtered); // Update filtered teams state
  };

  return (
    <div>
      <Header
        toWhere="/"
        headerText={
          <>
            <span style={{ color: "#FF5F00" }}>Pit </span>
            <span style={{ color: "#FFFFFF" }}>Scout</span>
          </>
        }
      />
      
      <SearchBar onSearch={handleSearch} searchText="Search by Team Number" /> {/* Render the SearchBar */}
        <br />
      {loading ? (<h1>Loading...</h1>) : error ? (<h1>{error.message}</h1>) : filteredTeams.length > 0 ? (
        filteredTeams.map((team) => (
          <Link key={team.teamNumber} to={`/pit-team-form/${team.teamNumber}`}>
            <PitButton text={`Team ${team.teamNumber}`} />
          </Link>
        ))) : null
      }
    </div>
  );
};

export default Pitscoutpage;
