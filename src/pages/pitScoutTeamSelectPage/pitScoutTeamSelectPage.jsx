import PitButton from "../../components/pitButton/pitButton";
import Header from "../../components/header/header";
import SearchBar from "../../components/searchbar/searchbar";
import { useEffect, useState } from "react";
import { getEventTeamsNumbers } from "../../api/tba";

import { Link } from "react-router-dom";

const Pitscoutpage = () => {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filteredTeams, setFilteredTeams] = useState([]);

  useEffect(() => {
    setLoading(true);
    getEventTeamsNumbers()
      .then((data) => {
        const sortedTeams = data.sort((a, b) => a.teamNumber - b.teamNumber); // Sort teams by team number
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
      <SearchBar onSearch={handleSearch} searchText="Search by Team Number" />
      <br />
      {loading ? (
        <h1>Loading...</h1>
      ) : error ? (
        <h1>{error.message}</h1>
      ) : filteredTeams.length > 0 ? (
        filteredTeams.map((team) => (
          <Link key={team.teamNumber} to={`/pit-team-form/${team.teamNumber}`}>
            <PitButton text={`Team ${team.teamNumber}`} />
          </Link>
        ))
      ) : null}
    </div>
  );
};

export default Pitscoutpage;
