import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import './ordershipper.scss';
import Button from '@mui/material/Button'
import verifyToken from "../../../midlewares/verifyToken";
import socketClient from "socket.io-client";
import getOrderShipper from '../../../midlewares/getOrderShipper';
import classNames from 'classnames';
const SERVER = "http://localhost:4000/";
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
export default function OrdersShipper() {
    const [data, setData] = useState(null);
    const [filter, setFilter] = useState('cooked');
    const navigate = useNavigate();
    function getData(filter) {
        var order = getOrderShipper(filter);
        if (order) {
            order.then(res => {
                console.log(res.data)
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
                if (res.data.permission !== 'shipper') {
                    navigate('/login');
                }
                else {
                    getData(filter);
                    try {
                        socket = socketClient(SERVER);
                        socket.on('shipper', () => {
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
        if (socket) {
            await socket.emit(`${status}`, orderID);
            getData(filter);
            console.log(filter)
        }
    }
    return (
        <div className="clerk">
            <div>
                <div className='body'>
                    <div className='filter'>
                        <div className='header'>
                        </div>
                        <div className="wrapper1">
                            <span className={classNames({ active: filter === 'cooked' })} onClick={() => getData('cooked')}>??ang ch???</span>
                            <span className={classNames({ active: filter === 'shipping' })} onClick={() => getData('shipping')}>??ang giao</span>
                            <span className={classNames({ active: filter === 'delivered' })} onClick={() => getData('delivered')}>???? giao</span>
                        </div>
                    </div>
                    <table>
                        <tr>
                            <th>STT</th>
                            <th>OrderID</th>
                            <th>Ti???n tr??nh</th>
                            <th>T???ng ti???n</th>
                            <th>???????c t???o v??o</th>
                            <th>C???p nh???t v??o</th>
                            {filter === 'cooked' && <><th>X??c nh???n</th></>}
                            {filter === 'shipping' && <><th>X??c nh???n</th></>}
                        </tr>
                        {data && data.map((val, idx) => (
                            <tr>
                                <td>{idx}</td>
                                <td>{val.orderID}</td>
                                <td>{val.process}</td>
                                <td>{format(val.total, '??')}</td>
                                <td>{formatDate(val.createdAt)}</td>
                                <td>{formatDate(val.updatedAt)}</td>
                                {
                                    filter === 'cooked' && <>
                                        <td>
                                            <Button className='btn-modal'
                                                disabled={val.process === 'shipping' || val.process === 'delivered'}
                                                variant="contained" color="secondary"
                                                onClick={() => handleClick('shipping', val.orderID)}
                                            >Confirmed</Button>
                                        </td>
                                    </>
                                    
                                }
                                
                                {
                                    filter === 'shipping' && <>
                                        <td>
                                            <Button className='btn-modal'
                                                disabled={val.process === 'cooked' || val.process === 'delivered'}
                                                variant="contained" color="secondary"
                                                onClick={() => handleClick('delivered', val.orderID)}
                                            >Confirmed</Button>
                                        </td>
                                    
                                    </>}
                                
                            </tr>
                        )
                        )}
                    </table>
                </div>
            </div>
        </div>
    )
}