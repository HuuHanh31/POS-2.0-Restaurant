import Navbar from "../../admin/navbar/Navbar";
import styles from "./cus.scss";
import "./cus.scss";
import MyCart from "../mycart/MyCart"
// import Orders from "../orders/Orders"
// import Cook from "../cook/Cook"
import verifyToken from "../../../midlewares/verifyToken";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import RestaurantIcon from '@mui/icons-material/Restaurant';
import HomeIcon from '@mui/icons-material/Home';
import StoreIcon from "@mui/icons-material/Store";
import OutdoorGrillIcon from '@mui/icons-material/OutdoorGrill';
import { useEffect, useState } from "react"
import clsx from "clsx";
import axios from "axios";
const SERVER = "http://localhost:4000/";
const CustomerHome = () => {
  const [Active, SetActive] = useState("Statistics");
    const navigate = useNavigate();
    useEffect(() => {
        const getInfo = verifyToken();
        if (getInfo) {
            getInfo.then(res => {
                if (res.data.permission !== 'customer') {
                    navigate('/login');
                } 
            })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
  return (
    <div className="home">
      <div className="sidebar">
      <div className="top">
        <Link to="/customer" style={{ textDecoration: "none" }}>
          <span className="logo">CUSTOMER</span>
        </Link>
      </div>
      <hr />
      <div className="center">
        <ul>
          <p className="title">LISTS</p>
          
            <li>
              <StoreIcon className="icon" />
              <span className={`${Active ==="MyCart" && 'option--active'}`} onClick={()=>{SetActive("MyCart")}}>Đơn hàng</span>
            </li>
         
          
          <p className="title">USER</p>
          <Link to="/" style={{ textDecoration: "none" }}>
          <li>
            <HomeIcon className="icon" />
            <span>Home</span>
          </li>
          </Link>
        </ul>
      </div>
    </div>
      <div className="homeContainer">
        <Navbar />
        <div className="listContainer">
            <div className={clsx(styles.admin)}>
                <div className={clsx(styles.body)}>
                     {Active==="MyCart" && <MyCart/>}
                 
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerHome;
