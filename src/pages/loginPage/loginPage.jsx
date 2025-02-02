import { useState } from "react";
import "./loginPage.css";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import Autocomplete from "../../components/Autocomplete";

const LoginPage = ({ changeUsername }) => {
  const [username, setUsername] = useState("");
  const [userOptions, setUserOptions] = useState(["Alice", "Bob", "Charlie", "David", "Eve"]); // Example names

  const handleUsernameChange = (name) => {
    setUsername(name);
    changeUsername(name);
  };

  return (
    <div className="login">
      <form className="login-form">
        <label className="login-label">Login</label>
        <Autocomplete options={userOptions} onSelect={handleUsernameChange} />
        <button
          type="button"
          className="login-button"
          onClick={() => handleUsernameChange(username)}
        >
          Login
        </button>
      </form>
    </div>
  );
};

LoginPage.propTypes = {
  changeUsername: PropTypes.func,
};

export default LoginPage;
