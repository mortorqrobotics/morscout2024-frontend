import { Routes, Route, useNavigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useEffect, useState } from "react";
import Layout from "./components/Layout";
import MainPage from "./pages/mainPage/mainPage";
import AdminPage from "./pages/adminPage/adminPage";
import Pitscoutpage from "./pages/pitScoutTeamSelectPage/pitScoutTeamSelectPage";
import MatchscoutPage from "./pages/matchScoutPage/matchscoutPage";
import PitScoutForm from "./pages/pitScoutForm/pitScoutForm";
import MatchScoutForm from "./pages/matchScoutForm/matchScoutForm";
import LoginPage from "./pages/loginPage/loginPage";
import UserPage from "./pages/userPage/userPage";
import Rankings from "./pages/rankings/rankings";
import "./styles/global.css";
import "./styles/layout.css";

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
      <Toaster 
        position="top-center" 
        reverseOrder={false}
        toastOptions={{
          style: {
            background: 'var(--surface)',
            color: 'var(--text-primary)',
            border: '1px solid var(--surface-light)',
            borderRadius: 'var(--radius-md)',
          },
        }} 
      />
      
      <Routes>
        <Route path="/login" element={<LoginPage changeUsername={changeUsername} />} />
        
        <Route path="/" element={
          <Layout>
            <MainPage username={username} />
          </Layout>
        } />
        
        <Route path="/admin" element={
          <Layout>
            <AdminPage />
          </Layout>
        } />
        
        <Route path="/rankings" element={
          <Layout>
            <Rankings />
          </Layout>
        } />
        
        {/* <Route path="/userpage" element={
          <Layout>
            <UserPage />
          </Layout>
        } /> */}
        
        <Route path="/pit-team-choice" element={
          <Layout>
            <Pitscoutpage />
          </Layout>
        } />
        
        <Route path="/pit-team-form/:teamNumber" element={
          <Layout>
            <PitScoutForm username={username} />
          </Layout>
        } />
        
        <Route path="/matchscout-team-choice" element={
          <Layout>
            <MatchscoutPage username={username} />
          </Layout>
        } />
        
        <Route path="/matchscout-team-form/:teamNumber/:matchNumber" element={
          <Layout>
            <MatchScoutForm username={username} />
          </Layout>
        } />
      </Routes>
    </>
  );
}

export default App;
