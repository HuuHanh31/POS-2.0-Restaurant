import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import './cook.scss';
import Button from '@mui/material/Button'
import verifyToken from "../../../midlewares/verifyToken";
import socketClient from "socket.io-client";
import getCook from '../../../midlewares/getCook';
import classNames from 'classnames';
const SERVER = "http://127.0.0.1:4000/";
var socket = null;

const formatDate = (dateString) => {
    return new Date(dateString).toLocaleTimeString() + ' ' + new Date(dateString).toLocaleDateString();
}
function format(n, currency) {
    if (n && currency)
        return n.toFixed(0).replace(/./g, function (c, i, a) {
            return i > 0 && c !== "." && (a.length - i) % 3 === 0 ? "," + c : c;
        }) + currency;
}
export default function Cook() {
    const [data, setData] = useState(null);
    const [filter, setFilter] = useState('cooking');
    const navigate = useNavigate();
    function getData(filter) {
        var order = getCook('', filter);
        if (order) {
            order.then(res => {
                console.log(filter)
                if (res.data.order) {
                    setData([...res.data.order]);
                    setFilter(filter);
                }
            })
        }
    }
    useEffect(() => {
        const getInfo = verifyToken();
        if (getInfo) {
            getInfo.then(res => {
                if (res.data.permission !== 'chef') {
                    navigate('/login');
                }
                else {
                    getData(filter);
                    try {
                        socket = socketClient(SERVER);
                        socket.on('chef ', () => {
                            getData(filter);
                        })
                    }
                    catch (err) {
                        console.log(err)
                    }
                }
            })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    async function handleClick(status, orderID) {
        console.log(`${status}`)
        if (socket) {
            await socket.emit(`${status}`, orderID);
            getData(filter);
        }
    }
    return (
        <div className="kitchen">
            <div >
                <div className='body'>
                    <div className='filter'>
                        <div className='header'>
                        </div>
                        <div className="wrapper2">
                            <span className={classNames({ active: filter === 'cooking' })} onClick={() => getData('cooking')}>Đang nấu</span>
                            <span className={classNames({ active: filter === 'cooked' })} onClick={() => getData('cooked')}>Đã nấu xong</span>
                        </div>
                    </div>
                    <table>
                        <tr>
                            <th>STT</th>
                            <th>OrderID</th>
                            <th>Quá trình</th>
                            <th>Hình thức</th>
                            <th>Tổng tiền</th>
                            <th>Khởi tạo vào</th>
                            <th>Cập nhật vào</th>
                            {filter === 'cooking' && <th>Hoàn thành</th>}
                        </tr>
                        {data && data.map((val, idx) => (
                            <tr>
                                <td>{idx}</td>
                                <td>{val.orderID}</td>
                                <td>{val.process}</td>
                                <td>{val.payment}</td>
                                <td>{format(val.total, 'đ')}</td>
                                <td>{formatDate(val.createdAt)}</td>
                                <td>{formatDate(val.updatedAt)}</td>
                                {
                                    filter === 'cooking' &&
                                    <td>
                                        <Button className='btn-modal'
                                            disabled={val.status === 'cooked'}
                                            variant="contained" color="secondary"
                                            onClick={() => handleClick('cooked', val.orderID)}
                                        >Nấu xong</Button>
                                    </td>
                                }
                            </tr>
                        )
                        )}
                    </table>
                </div>
            </div>
        </div>
    )
}