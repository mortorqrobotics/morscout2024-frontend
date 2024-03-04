import DefaultBtn from "../../components/defaultBtn/defaultBtn";
import logo from "../../assets/logo.png";
import "./mainPage.css";
import { Link } from "react-router-dom";
const MainPage = ({ username }) => {
  return (
    <div className="main-page">
      <img src={logo} alt="logo" className="logo" />
      <div className="btn-div">
        <Link to="/pit-team-choice">
          <DefaultBtn backgroundColor="#FF5F00" text="Pit Scout" />
        </Link>
        <Link to="/matchscout-team-choice">
          <DefaultBtn backgroundColor="#FF5F00" text="Match Scout" />
        </Link>
        <Link to="/rankings">
          <DefaultBtn backgroundColor="#FF5F00" text="Rankings" />
        </Link>
        <Link to="/userpage">
          <DefaultBtn backgroundColor="#FF5F00" text="User" />
        </Link>
        {username === import.meta.env.VITE_ADMIN1 ||
        username === import.meta.env.VITE_ADMIN2 ? (
          <Link to="/admin">
            <DefaultBtn backgroundColor="#FF5F00" text="Admin Page" />
          </Link>
        ) : null}
      </div>
    </div>
  );
};

export default MainPage;
