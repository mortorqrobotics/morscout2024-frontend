const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:8000";

/**
 * Fetches match scouting data for all teams
 * @returns {Promise<Array<Object>>} Array of match scouting records
 * @throws {Error} Network or server errors
 */
export const getMatchScoutData = async () => {
  try {
    const response = await fetch(`${BACKEND_URL}/api/matchscout`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching match scout data:", error);
    throw error;
  }
};

/**
 * Fetches pit scouting data for all teams
 * @returns {Promise<Array<Object>>} Array of pit scouting records
 * @throws {Error} Network or server errors
 */
export const getPitScoutData = async () => {
  try {
    const response = await fetch(`${BACKEND_URL}/api/pitscout`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching pit scout data:", error);
    throw error;
  }
};

/**
 * Fetches all scouting instances (both match and pit)
 * @returns {Promise<Object>} Combined scouting data
 * @returns {Array<Object>} response.pitScoutInstances - All pit scout records
 * @returns {Array<Object>} response.matchScoutInstances - All match scout records
 * @throws {Error} Network or server errors
 */
export const getAllScoutInstances = async () => {
  try {
    const response = await fetch(`${BACKEND_URL}/api/all-scout-instances`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching all scout instances:", error);
    throw error;
  }
};

/**
 * Downloads match scouting data as CSV
 * @returns {Promise<Blob>} CSV file as blob
 * @throws {Error} Network or server errors
 */
export const downloadMatchScoutCSV = async () => {
  try {
    const response = await fetch(`${BACKEND_URL}/api/matchscout/export/csv`);
    return await response.blob();
  } catch (error) {
    console.error("Error downloading match scout CSV:", error);
    throw error;
  }
};

/**
 * Downloads pit scouting data as CSV
 * @returns {Promise<Blob>} CSV file as blob
 * @throws {Error} Network or server errors
 */
export const downloadPitScoutCSV = async () => {
  try {
    const response = await fetch(`${BACKEND_URL}/api/pitscout/export/csv`);
    return await response.blob();
  } catch (error) {
    console.error("Error downloading pit scout CSV:", error);
    throw error;
  }
};

/**
 * Submits pit scouting data for a specific team
 * @param {string} teamNumber - The team number being scouted
 * @param {Object} data - The pit scouting form data
 * @param {string} data.username - Scout's username
 * @param {string} data.robotWeight - Robot's weight in lbs
 * @param {string} data.frameSize - Robot's frame dimensions
 * @param {string} data.drivetrain - Type of drivetrain
 * @param {string} data.auto - Auto capability
 * @param {Object} data.scoringPositions - Auto scoring positions
 * @param {boolean} data.scoringPositions.processor - Can score in processor
 * @param {boolean} data.scoringPositions.net - Can score in net
 * @param {boolean} data.scoringPositions.l1 - Can score in L1
 * @param {boolean} data.scoringPositions.l2 - Can score in L2
 * @param {boolean} data.scoringPositions.l3 - Can score in L3
 * @param {boolean} data.scoringPositions.l4 - Can score in L4
 * @param {Object} data.scoringPositionsTeleop - Teleop scoring positions
 * @param {boolean} data.scoringPositionsTeleop.processorTeleop
 * @param {boolean} data.scoringPositionsTeleop.netTeleop
 * @param {boolean} data.scoringPositionsTeleop.l1Teleop
 * @param {boolean} data.scoringPositionsTeleop.l2Teleop
 * @param {boolean} data.scoringPositionsTeleop.l3Teleop
 * @param {boolean} data.scoringPositionsTeleop.l4Teleop
 * @param {string} data.autoNotesScored - Auto scoring details
 * @param {string} data.estimatedCycleTime - Cycle time in seconds
 * @param {string} data.pickupFromFloor - Floor pickup details
 * @param {string} data.climb - Climb capability
 * @param {string} data.climbTime - Time to climb in seconds
 * @param {string} data.additionalComments - Additional observations
 * @returns {Promise<Response>} Fetch response object
 * @throws {Error} Network or server errors
 */
export const submitPitscout = async (teamNumber, data) => {
    return await fetch(
        `${BACKEND_URL}/api/submit-pitscout/${teamNumber}`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        }
    );
};

/**
 * Submits match scouting data for a specific team
 * @param {string} teamNumber - The team number being scouted
 * @param {Object} data - The match scouting form data
 * @param {string} data.username - Scout's username
 * @param {string} data.matchNumber - Match number being scouted
 * @param {number} data.autoL1Scores - Auto L1 scores
 * @param {number} data.autoL2Scores - Auto L2 scores
 * @param {number} data.autoL3Scores - Auto L3 scores
 * @param {number} data.autoL4Scores - Auto L4 scores
 * @param {number} data.autoL1Attempts - Auto L1 attempts
 * @param {number} data.autoL2Attempts - Auto L2 attempts
 * @param {number} data.autoL3Attempts - Auto L3 attempts
 * @param {number} data.autoL4Attempts - Auto L4 attempts
 * @param {number} data.autoProcessorAlgaeScores - Auto processor scores
 * @param {number} data.autoProcessorAlgaeAttempts - Auto processor attempts
 * @param {number} data.autoNetAlgaeScores - Auto net scores
 * @param {number} data.autoNetAlgaeAttempts - Auto net attempts
 * @param {string} data.leftStartingZone - Left starting zone
 * @param {string} data.climbLevel - Final climb level
 * @param {string} data.climbSuccess - Climb success status
 * @param {string} data.climbAttemptTime - Time taken for climb
 * @param {string} data.climbComments - Comments about climb
 * @param {string} data.robotSpeed - Robot speed rating
 * @param {string} data.generalComments - General observations
 * @returns {Promise<Response>} Fetch response object
 * @throws {Error} Network or server errors with error message
 */
export const submitMatchScout = async (teamNumber, data) => {
  try {
    const response = await fetch(`${BACKEND_URL}/api/matchscout/${teamNumber}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return response;
  } catch (error) {
    console.error("Error submitting match scout:", error);
    throw error;
  }
};



