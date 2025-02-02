import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import "./header.css";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const Header = ({ toWhere, headerText }) => {
  return (
    <header className="header">
      <nav className="nav-container">
        <Link to={toWhere} className="back-link">
          <ArrowBackIcon className="back-icon" />
        </Link>
        <h2 className="header-text">{headerText}</h2>
      </nav>
    </header>
  );
};

Header.propTypes = {
  toWhere: PropTypes.string,
  headerText: PropTypes.node,
};

export default Header;
