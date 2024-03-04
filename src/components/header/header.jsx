import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import "./header.css";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const Header = (props) => {
  return (
    <div>
      <nav>
        <Link to={props.toWhere}>
          <ArrowBackIcon className="backIcon" style={{ fill: " #fff" }} />
        </Link>

        <h2 className="header-text">{props.headerText}</h2>
      </nav>
    </div>
  );
};
Header.propTypes = {
  toWhere: PropTypes.string,
  headerText: PropTypes.object,
};

export default Header;
