import MainPage from "./pages/mainPage/mainPage";
import "./App.css";
import { Routes, Route, useNavigate } from "react-router-dom"; 
import AdminPage from "./pages/adminPage/adminPage";
import Pitscoutpage from "./pages/pitScoutTeamSelectPage/pitScoutTeamSelectPage";
import MatchscoutPage from "./pages/matchScoutPage/matchscoutPage";
import PitScoutForm from "./pages/pitScoutForm/pitScoutForm";
import MatchScoutForm from "./pages/matchScoutForm/matchScoutForm";
import LoginPage from "./pages/loginPage/loginPage";
import UserPage from "./pages/userPage/userPage";
import { Toaster } from "react-hot-toast";
import { useEffect, useState } from "react";
import Rankings from "./pages/rankings/rankings";

function App() {
  const [username, setUsername] = useState(localStorage.getItem("username"));
  const navigate = useNavigate();

  useEffect(() => {
    if (!username || username.trim().length === 0) {
      navigate("/login");
    }
  }, [username, navigate]);

  const changeUsername = (name) => {
    setUsername(name);
    localStorage.setItem("username", name);
  };

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <Routes>
        <Route path="/" element={<MainPage username={username} />} />
        <Route
          path="/login"
          element={<LoginPage changeUsername={changeUsername} />}
        />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/rankings" element={<Rankings />} />
        <Route path="/userpage" element={<UserPage />} />
        <Route path="/pit-team-choice" element={<Pitscoutpage />} />
        <Route
          path="/pit-team-form/:teamNumber"
          element={<PitScoutForm username={username} />}
        />
        <Route path="/matchscout-team-choice" element={<MatchscoutPage />} />
        <Route
          path="/matchscout-team-form/:teamNumber/:matchNumber"
          element={<MatchScoutForm username={username} />}
        />
      </Routes>
    </>
  );
}

export default App;
