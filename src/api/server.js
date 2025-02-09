const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:8000";

export const submitPitscout = async (teamNumber, data) => {
    return await fetch(
        `${BACKEND_URL}/submit-pitscout/${teamNumber}`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        }
    );
};

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


export const toggleMatchButtonStatus = async (teamNumber, matchNumber) => {
  try {
    const response = await fetch(`${BACKEND_URL}/api/matchscout/${teamNumber}/${matchNumber}/button`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      }
    });
    return response;
  } catch (error) {
    console.error("Error toggling match button status:", error);
    throw error;
  }
};

export const getMatchButtonStatus = async (teamNumber, matchNumber) => {
  try {
    const response = await fetch(`${BACKEND_URL}/api/matchscout/${teamNumber}/${matchNumber}/button`);
    return response;
  } catch (error) {
    console.error("Error toggling match button status:", error);
    throw error;
  }
};


export const getScoutData = async (scoutType) => {
  try {
    const response = await fetch(`${BACKEND_URL}/${scoutType}`);
    return response;
  } catch (error) {
    console.error("Error fetching scout data:", error);
    throw error;
  }
};

