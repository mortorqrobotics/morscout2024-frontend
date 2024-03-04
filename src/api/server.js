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

export const submitTeleop = async (teamNumber, data) => {
    return await fetch(
        `${BACKEND_URL}/submit-teleopscout/${teamNumber}`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        }
    );
};

export const submitAutoScout = async (teamNumber, data) => {
    return await fetch(
        `${BACKEND_URL}/submit-autoscout/${teamNumber}`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        }
    );
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

