import axios from "axios";
const BASE_URL = import.meta.env.VITE_TBA_API_URL || "";

/**
 * Fetches team numbers and nicknames from The Blue Alliance for the current event
 * @returns {Promise<Array<Object>>} Array of team information
 * @returns {number} team.teamNumber - The team's number
 * @returns {string} team.nickname - The team's nickname
 * @throws {Error} Network or TBA API errors
 */
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

/**
 * Fetches match information from The Blue Alliance for the current event
 * @returns {Promise<Array<Object>>} Array of match information
 * @returns {Array<string>} match.red_team - Array of red alliance team keys
 * @returns {Array<string>} match.blue_team - Array of blue alliance team keys
 * @returns {number} match.matchNum - The match number
 * @returns {string} match.compLevel - Competition level (qm, qf, sf, f)
 * @throws {Error} Network or TBA API errors
 */
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
};

/**
 * Fetches team rankings from The Blue Alliance for the current event
 * @returns {Promise<Object>} Raw rankings data from TBA
 * @throws {Error} Network or TBA API errors with console logging
 */
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
    return data;
  } catch (error) {
    console.error("Error fetching rankings:", error);
    throw error;
  }
};

/**
 * Fetches a team's nickname from The Blue Alliance
 * @param {string} teamKey - The team key (e.g., "frc254")
 * @returns {Promise<string>} Team nickname or formatted team number if not found
 * @throws {Error} Network or TBA API errors with console logging
 */
export const getTeamName = async (teamKey) => {
  try {
    const { data } = await axios.get(
      `${BASE_URL}/team/${teamKey}`,
      {
        headers: {
          "X-TBA-Auth-Key": import.meta.env.VITE_API_KEY,
          "Content-Type": "application/json",
        },
      }
    );
    return data.nickname || `Team ${teamKey.replace('frc', '')}`;
  } catch (error) {
    console.error("Error fetching team name:", error);
    return `Team ${teamKey.replace('frc', '')}`;
  }
};