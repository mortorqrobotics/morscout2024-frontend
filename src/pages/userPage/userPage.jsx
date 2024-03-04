import { Link } from "react-router-dom";
import DefaultBtn from "../../components/defaultBtn/defaultBtn";
import Header from "../../components/header/header";

const UserPage = () => {
  return (
    <div>
      <Header toWhere="/" headerText="User" />

      <div className="admin-btns">
        <Link to="/">
          <button className="admin-btn">Change Username</button>
        </Link>
        <a href="https://forms.gle/RuT55h2veopbMNq46">
          <button className="admin-btn">App Suggestions</button>
        </a>
      </div>
    </div>
  );
};

export default UserPage;
