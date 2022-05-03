import styles from './userAll.scss';
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
import getOrderEmail from '../../../midlewares/getOrderEmail';
import PreviewIcon from '@mui/icons-material/Preview';
import clsx from "clsx";
import socketClient from "socket.io-client";
import Popup from "./Popup";
import './MyCart.scss';
const SERVER = "http://localhost:4000/";
var socket = null;
const formatDate = (dateString) => {
  return (
    new Date(dateString).toLocaleTimeString() +
    " " +
    new Date(dateString).toLocaleDateString()
  );
};
function format(n, currency) {
  if (n && currency)
      return n.toFixed(0).replace(/./g, function (c, i, a) {
          return i > 0 && c !== "." && (a.length - i) % 3 === 0 ? "," + c : c;
      }) + currency;
}

const MyCart = () => {
  const [data, setData] = useState(null);
  const [current, setCurrent] = useState(null);
  const ADD_NEW = -1;
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [showModal, setShowModal] = useState(false);
  const closeModal = () => {
    setShowModal(false);
    getData();
   };

  function getData(email) {
    var order = getOrderEmail(email);
    if (order) {
        order.then(res => {
            if (res.data.order) {
                console.log(res.data.order)
                setData([...res.data.order]);
            }
        })
    }
    }
    useEffect(() => {
      const getInfo = verifyToken();
      if (getInfo) {
          getInfo.then(res => {
              setEmail(res.data.email)
              if (res.data.permission !== 'customer') {
                  navigate('/login');
              }
              else {
                  getData(email);
              }
          })
      }
    },[]);

  return (   


        <div className="clerk">
          {showModal && (
            <Popup
              showModal={showModal}
              closeModal={closeModal}
              data={data[current]}
            />
          )}
        <div>
            <div className='body'>
                <div className='filter'>
                    <div className='header'>
                    </div>
                    <div className="wrapper1">
                        <span  onClick={() => getData(email)}>Đơn hàng của tôi</span>
                    </div>
                </div>
                <table>
                <tr>
                  <th>STT</th>
                  <th>OrderID</th>
                  <th>Trạng thái</th>
                  <th>Quá trình</th>
                  <th>Hình thức</th>
                  <th>Tổng đơn</th>
                  <th>Được tạo vào</th>
                  <th> Cập nhật vào</th>
                  <th>Xem chi tiết</th>
             </tr>
                    {data && data.map((val, idx) => (
                        <tr>
                          <td>{idx}</td>
                          <td>{val.orderID}</td>
                          <td>{val.status}</td>
                          <td>{val.process}</td>
                          <td>{val.payment}</td>
                          <td>{format(val.total, 'đ')}</td>
                          <td>{formatDate(val.createdAt)}</td>
                          <td>{formatDate(val.updatedAt)}</td>
                          <td>
                            <Button
                              className="btn-modal"
                              variant="contained"
                              color="primary"
                              onClick={() => {
                                setCurrent(idx);
                                setShowModal(true);
                              }}
                            >
                              <PreviewIcon  sx={{fontSize:'20px'}}> </PreviewIcon>
                            </Button>
                          </td>
                          </tr>
                    )
                    )}  
                </table>
            </div>
        </div>
    </div>
  );
};
export default MyCart;