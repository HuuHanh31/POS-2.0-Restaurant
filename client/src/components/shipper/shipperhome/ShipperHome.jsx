import Sidebar from "../sidebarshipper/Sidebarshipper";
import Navbar from "../../admin/navbar/Navbar";
import OrdersShipper from "../ordersshipper/OrdersShipper"
import "./ShipperHome.scss";
import verifyToken from "../../../midlewares/verifyToken";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react"
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import { Link } from "react-router-dom";
import HomeIcon from '@mui/icons-material/Home';
import axios from "axios";
const SERVER = "http://localhost:4000/";
const AdminHome = () => {
  const [Active, SetActive] = useState("Statistics");
    const navigate = useNavigate();
    useEffect(() => {
        const getInfo = verifyToken();
        if (getInfo) {
            getInfo.then(res => {
                console.log(res);
                if (res.data.permission !== 'shipper') {
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
        <Link to="/shipper" style={{ textDecoration: "none" }}>
          <span className="logo">SHIPPER</span>
        </Link>
      </div>
      <hr />
      <div className="center">
        <ul>
          <p className="title">LISTS</p>
          {/* <Link to="/admin/users" style={{ textDecoration: "none" }}> */}
          {/* </Link> */}
          {/* <Link to="/admin/products" style={{ textDecoration: "none" }}> */}
          {/* </Link> */}
          {/* <Link to="/admin/statistics" style={{ textDecoration: "none" }}> */}
            <li>
              <LocalShippingIcon className="icon" />
              <span className={`${Active ==="OrdersShipper" && 'option--active'}`} onClick={()=>{SetActive("OrdersShipper")}}>Đơn hàng</span>
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
          {Active==="OrdersShipper" && <OrdersShipper/>}
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
