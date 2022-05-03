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
import DeleteIcon from '@mui/icons-material/Delete';
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

const MenuEdit = () => {
  const ADD_NEW = -1;
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
        url: "http://localhost:4000/category",
        method: "GET",
      };
      axios.request(reqOptions).then(function (response) {
        const data = response.data;
        setDataTag({ data: [...data], current: -1 });
      });
    } catch (e) {
      console.log(e);
    }
  }

  function deleteCategory(id) {
    try {
      let req = {
        url: SERVER + "category/" + id,
        method: "DELETE",
      };
      axios.request(req).then((res) => console.log(res));
      getData();
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    const getInfo = verifyToken();
    if (getInfo) {
      getInfo.then((res) => {
        console.log(res);
        if (res.data.permission !== "chef") {
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
          <tbody>
            <tr>
              <th>STT</th>
              <th>Loại</th>
              <th>Đường dẫn ảnh</th>
              <th>Được tạo vào</th>
              <th>Cập nhật vào</th>
              <th>Cập nhật</th>
              <th>Xoá</th>
            </tr>

            <tr>
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
                    setDataTag({ ...dataTag, current: ADD_NEW });
                    setShowModal(true);
                  }}
                >
                  <AddBoxIcon sx={{fontSize:'20px'}}></AddBoxIcon>
                </Button>
              </td>
              <td></td>
            </tr>

            {dataTag &&
              dataTag.data.map((val, idx) => (
                <tr>
                  <td>{idx}</td>
                  <td>{val.type}</td>
                  <td>{val.imgURL}</td>
                  <td>{formatDate(val.createdAt)}</td>
                  <td>{formatDate(val.updatedAt)}</td>

                  <td>
                    <Button
                      className="btn-modal"
                      variant="outlined"
                      color="primary"
                      onClick={() => {
                        setDataTag({ ...dataTag, current: idx });
                        setShowModal(true);
                      }}
                    >
                  <EditIcon sx={{fontSize:'20px'}}></EditIcon>
                    </Button>
                  </td>
                  <td>
                    <Button
                      className="btn-modal"
                      variant="outlined"
                      color="secondary"
                      onClick={() => {
                        window.confirm(
                          `Bạn thực sự muốn xoá mục ${val.type}?\nMọi thay đổi sẽ không được hoàn tác!`
                        ) && deleteCategory(val._id);
                        getData();
                      }}
                    >
                  <DeleteIcon sx={{fontSize:'20px'}}></DeleteIcon>
                    </Button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default MenuEdit