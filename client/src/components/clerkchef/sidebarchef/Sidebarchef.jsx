import "./sidebar.scss";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import StoreIcon from "@mui/icons-material/Store";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import HomeIcon from '@mui/icons-material/Home';
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { DarkModeContext } from "../../context/darkModeContext";
import AnalyticsIcon from '@mui/icons-material/Analytics';
import FoodBankIcon from '@mui/icons-material/FoodBank';


const Sidebar = () => {
  const { dispatch } = useContext(DarkModeContext);
  return (
    <div className="sidebar">
      <div className="top">
        <Link to="/chef" style={{ textDecoration: "none" }}>
          <span className="logo">lamchef</span>
        </Link>
      </div>
      <hr />
      <div className="center">
        <ul>
          <p className="title">LISTS</p>
          <Link to="/chef/products" style={{ textDecoration: "none" }}>
            <li>
              <StoreIcon className="icon" />
              <span>Products</span>
            </li>
          </Link>
          <Link to="/chef/orders" style={{ textDecoration: "none" }}>
            <li>
              <FoodBankIcon className="icon" />
              <span>Orders</span>
            </li>
          </Link>
          <p className="title">USER</p>
          <Link to="/" style={{ textDecoration: "none" }}>
          <li>
            <HomeIcon className="icon" />
            <span>Home</span>
          </li>
          </Link>
        </ul>
      </div>
      <div className="bottom">
        <div
          className="colorOption"
          onClick={() => dispatch({ type: "LIGHT" })}
        ></div>
        <div
          className="colorOption"
          onClick={() => dispatch({ type: "DARK" })}
        ></div>
      </div>
    </div>
  );
};

export default Sidebar;
