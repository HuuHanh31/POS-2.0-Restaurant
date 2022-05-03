import Sidebar from "../sidebaradmin/Sidebaradmin";
import Navbar from "../../../components/admin/navbar/Navbar";
import styles from "./adminhome.scss";
import verifyToken from "../../../midlewares/verifyToken";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react"
import axios from "axios";
import UserAll from "../userAll/userAll";
import MenuEdit from "../menuedit/menuEdit"
import Statistics from "../statistics/Statistics"
import { Link } from "react-router-dom";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import StoreIcon from "@mui/icons-material/Store";
import AnalyticsIcon from '@mui/icons-material/Analytics';
import HomeIcon from '@mui/icons-material/Home';
import clsx from "clsx";
const SERVER = "http://localhost:4000/";

const AdminHome = () => {
  const [Active, SetActive] = useState("Staff");
    const navigate = useNavigate();
    useEffect(() => {
        const getInfo = verifyToken();
        if (getInfo) {
            getInfo.then(res => {
                if (res.data.permission !== 'admin') {
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
        <Link to="/admin" style={{ textDecoration: "none" }}>
          <span className="logo">ADMIN</span>
        </Link>
      </div>
      <hr />
      <div className="center">
        <ul>
          <p className="title">LISTS</p>
          {/* <Link to="/admin/users" style={{ textDecoration: "none" }}> */}
            <li>
              <PersonOutlineIcon className="icon" />
              <span className={`${Active ==="Staff" && 'option--active'}`} onClick={()=>{SetActive("Staff")}}>User</span>
              {/* <span>Users</span> */}
            </li>
          {/* </Link> */}
          {/* <Link to="/admin/products" style={{ textDecoration: "none" }}> */}
            <li>
              <StoreIcon className="icon" />
              <span className={`${Active ==="MenuEdit" && 'option--active'}`} onClick={()=>{SetActive("MenuEdit")}}>Thực đơn</span>
            </li>
          {/* </Link> */}
          {/* <Link to="/admin/statistics" style={{ textDecoration: "none" }}> */}
            <li>
              <AnalyticsIcon className="icon" />
              <span className={`${Active ==="Statistics" && 'option--active'}`} onClick={()=>{SetActive("Statistics")}}>Thống kê</span>
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
          {/* <div className="listTitle">Latest Transactions</div>
          
          <Table /> */}
            <div className={clsx(styles.admin)}>
                <div className={clsx(styles.body)}>
                    {Active==="Staff" && <UserAll/>}
                    {Active==="MenuEdit" && <MenuEdit/>}
                    {Active==="Statistics" && <Statistics/>}
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
