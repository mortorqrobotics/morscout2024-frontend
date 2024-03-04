// AdminPage.js
import Header from "../../components/header/header";
import { getScoutData } from "../../api/server"; // Adjust import path
import { utils, writeFile } from "xlsx"; // Import specific functions from xlsx
import "./adminPage.css";

const AdminPage = () => {
  const handlePullData = async (scoutType) => {
    try {
      // Fetch the scout data
      const response = await getScoutData(scoutType);
      if (response.ok) {
        const data = await response.json();
        // Generate spreadsheet
        generateSpreadsheet(data, scoutType);
        console.log(`${scoutType} data fetched successfully`);
      } else {
        console.error(`${scoutType} data fetch failed`);
      }
    } catch (error) {
      console.error("Error:", error);
      // Handle error if needed
    }
  };

  const generateSpreadsheet = (data, scoutType) => {
    const workbook = utils.book_new();
    const worksheet = utils.json_to_sheet(data);
    utils.book_append_sheet(workbook, worksheet, `${scoutType} Data`);
    writeFile(workbook, `${scoutType}Data.xlsx`);
  };

  return (
    <div>
      <Header
        toWhere="/"
        headerText={
          <>
            <span style={{ color: "#FF5F00" }}>Admin </span>
          </>
        }
      />
      <div className="admin-btns">
        <button
          className="admin-btn"
          onClick={() => handlePullData("matchscout")}
        >
          Pull Matchscout Data
        </button>
        <button
          className="admin-btn"
          onClick={() => handlePullData("pitscout")}
        >
          Pull Pitscout Data
        </button>
      </div>
    </div>
  );
};

export default AdminPage;
