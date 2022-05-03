import Navbar from "../../admin/navbar/Navbar";
import styles from "./chef.scss";
import "./chef.scss";
import MenuEdit from "../menuedit/menuEdit"
import Orders from "../orders/Orders"
import Cook from "../cook/Cook"
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
const AdminHome = () => {
  const [Active, SetActive] = useState("Statistics");
    const navigate = useNavigate();
    useEffect(() => {
        const getInfo = verifyToken();
        if (getInfo) {
            getInfo.then(res => {
                if (res.data.permission !== 'chef') {
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
        <Link to="/chef" style={{ textDecoration: "none" }}>

          <span className="logo">CHEF</span>

        </Link>
      </div>
      <hr />
      <div className="center">
        <ul>
          <p className="title">LISTS</p>
          {/* <Link to="/admin/users" style={{ textDecoration: "none" }}> */}
          {/* </Link> */}
          {/* <Link to="/admin/products" style={{ textDecoration: "none" }}> */}
            <li>
              <StoreIcon className="icon" />
              <span className={`${Active ==="MenuEdit" && 'option--active'}`} onClick={()=>{SetActive("MenuEdit")}}>Thực đơn</span>
            </li>
          {/* </Link> */}
          {/* <Link to="/admin/statistics" style={{ textDecoration: "none" }}> */}
            <li>
              <RestaurantIcon className="icon" />
              <span className={`${Active ==="Orders" && 'option--active'}`} onClick={()=>{SetActive("Orders")}}>Đơn hàng</span>
            </li>
            <li>
              <OutdoorGrillIcon className="icon" />
              <span className={`${Active ==="Cook" && 'option--active'}`} onClick={()=>{SetActive("Cook")}}>Nấu</span>
            </li>
          {/* </Link> */}
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
                    {Active==="MenuEdit" && <MenuEdit/>}
                    {Active==="Orders" && <Orders/>}
                    {Active==="Cook" && <Cook/>}
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
