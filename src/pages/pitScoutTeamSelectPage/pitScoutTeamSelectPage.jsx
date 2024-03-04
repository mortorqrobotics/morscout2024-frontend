import PitButton from "../../components/pitButton/pitButton";
import Header from "../../components/header/header";
import { useEffect, useState } from "react";
import { getEventTeamsNumbers } from "../../api/tba";

import { Link } from "react-router-dom";
const Pitscoutpage = () => {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  useEffect(()=>{
    setLoading(true)
    getEventTeamsNumbers().then(data => setTeams(data))
    .catch((err)=>{setError(err)})
    .finally(() =>setLoading(false))
   }, [setLoading]) 
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
      
      {
        loading ? (<h1>Loading...</h1>) : error? (<h1>{error.message}</h1>) : teams.length > 0 ? (
          teams.map((team) => (
            <Link key={team.teamNumber} to={`/pit-team-form/${team.teamNumber}`}>
              <PitButton text={`Team ${team.teamNumber}`} />
            </Link>
        ))) : null
      }
    </div>
  );
};

export default Pitscoutpage;
