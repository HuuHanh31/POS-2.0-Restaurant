import styles from './userAll.scss';
import Sidebar from "../sidebaradmin/Sidebaradmin"
import Navbar from "../navbar/Navbar"
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios'
import { useEffect } from "react"
import verifyToken from "../../../midlewares/verifyToken";
import { Link } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import Button from '@mui/material/Button'
import AddBoxIcon from '@mui/icons-material/AddBox';
import EditIcon from '@mui/icons-material/Edit';
import Popup from "./Popup";
import clsx from "clsx";

// import {userRows } from "../../../datatablesource";



const SERVER = "http://localhost:4000/";
const formatDate = (dateString) => {
  return (
    new Date(dateString).toLocaleTimeString() +
    " " +
    new Date(dateString).toLocaleDateString()
  );
};

const UserAll = () => {
  const navigate = useNavigate();
  const [dataTag, setDataTag] = useState({
    data: [],
    current: -1,
  });

  

  const [showModal, setShowModal] = useState(false);

  const closeModal = () => {
   setShowModal(false);
   getData();
  };
  
  function getData() {
    try {
      let reqOptions = {
        url: SERVER + "admin/employee",
        method: "GET",
      };
      axios.request(reqOptions).then(function (response) {
        const newdata = response.data;
        setDataTag({ data: [...newdata], current: -1 });
      });
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    const getInfo = verifyToken();
    if (getInfo) {
      getInfo.then((res) => {
        console.log(res);
        if (res.data.permission !== "admin") {
            navigate('/login');
        }
      });
    }

    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    
  }, []);

  




  ///
  



  return (
    <div className={clsx(styles.admin)}>
      {showModal && (
        <Popup
          showModal={showModal}
          closeModal={closeModal}
          data={dataTag.data?.[dataTag.current]}
          current={dataTag.current}
        />
      )}

      <div className={clsx(styles.body)}>
        <table>
          <tr>
            <th>STT</th>
            <th>Username</th>
            <th>Email</th>
            <th>Quyền</th>
            <th>Được tạo vào</th>
            <th>Cập nhật vào</th>
            <th>Cập nhật</th>
          </tr>

          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>

            <td>
              <Button
                className="btn-modal"
                variant="contained"
                color="primary"
                onClick={() => {
                  setDataTag({ ...dataTag, current: -1 });
                  console.log(dataTag);
                  setShowModal(true);
                }}
              >
                <AddBoxIcon sx={{ fontSize: "20px" }}></AddBoxIcon>
              </Button>
            </td>
          </tr>
          
          {console.log(dataTag)}
          {dataTag &&
            dataTag.data.map((val, idx) => (
              <tr key={idx}>
                <td>{idx}</td>
                <td>{val.username}</td>
                <td>{val.email}</td>
                <td>{val.permission}</td>
                <td>{formatDate(val.createdAt)}</td>
                <td>{formatDate(val.updatedAt)}</td>

                <td>
                  <Button
                    className="btn-modal"
                    variant="outlined"
                    color="primary"
                    onClick={() => {
                      setDataTag({ ...dataTag, current: idx });
                      console.log(dataTag);
                      setShowModal(true);
                    }}
                  >
                    <EditIcon sx={{ fontSize: "20px" }}></EditIcon>
                  </Button>
                </td>
              </tr>
            ))}
        </table>
      </div>
    </div>
  )
}

export default UserAll