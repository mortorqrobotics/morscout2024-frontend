import { useState } from "react";
import "./loginPage.css";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import Autocomplete from "../../components/Autocomplete";
import { teamMembers } from "../../data/teamMembers";

const LoginPage = ({ changeUsername }) => {
  const navigate = useNavigate();

  const handleSelect = (selectedName) => {
    if (selectedName) {
      changeUsername(selectedName);
      navigate("/");
    }
  };

  return (
    <div className="login">
      <form className="login-form">
        <label className="login-label">Login</label>
        <Autocomplete 
          options={teamMembers}
          onSelect={handleSelect}
          placeholder="Type your name..."
        />
      </form>
    </div>
  );
};

LoginPage.propTypes = {
  changeUsername: PropTypes.func,
};

export default LoginPage;
