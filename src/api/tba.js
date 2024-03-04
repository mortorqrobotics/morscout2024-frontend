import axios from "axios";
const BASE_URL = import.meta.env.VITE_TBA_API_URL || "";

export const getEventTeamsNumbers = async () => {
    try {
        const { data } = await axios.get(
            `${BASE_URL}/event/${import.meta.env.VITE_EVENT_KEY}/teams/simple`,
            {
              headers: {
                "X-TBA-Auth-Key": import.meta.env.VITE_API_KEY,
                "Content-Type": "application/json",
              },
            }
          );
          return data.map((team) => ({
            teamNumber: team.team_number,
            nickname: team.nickname
          }));
    } catch (error) {
        throw new Error(error)
    }

};

export const getEventMatches = async () => {
    try {
        const { data } = await axios.get(
            `${BASE_URL}/event/${import.meta.env.VITE_EVENT_KEY}/matches/simple`,
            {
              headers: {
                "X-TBA-Auth-Key": import.meta.env.VITE_API_KEY,
                "Content-Type": "application/json",
              },
            }
          );
          return data.map((match) => ({
            red_team: match.alliances.red.team_keys,
            blue_team: match.alliances.blue.team_keys,
            matchNum: match.match_number,
            compLevel: match.comp_level,
          }));
    } catch (error) {
        throw new Error(error)
    }
  }
export const getRankings = async () => {
  try {
      const { data } = await axios.get(
          `${BASE_URL}/event/${import.meta.env.VITE_EVENT_KEY}/rankings`,
          {
            headers: {
              "X-TBA-Auth-Key": import.meta.env.VITE_API_KEY,
              "Content-Type": "application/json",
            },
          }
        );
        console.log(data)
        return data.rankings.map((e) => ({
          rank: e.rank,
          team: e.team_key,
        }));
  } catch (error) {
      throw new Error(error)
  }
}

export const getTeamName = async (teamKey) => {
  try {
    const { data } = await axios.get(`${BASE_URL}/team/${teamKey}`, {
      headers: {
        "X-TBA-Auth-Key": import.meta.env.VITE_API_KEY,
        "Content-Type": "application/json",
      }
    });
    return data.name; 
  } catch (error) {
    throw new Error(error.response.data.Error); // Throw an error with the error message if request fails
  }
};