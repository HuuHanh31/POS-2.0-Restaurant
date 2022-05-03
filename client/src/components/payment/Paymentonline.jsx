import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import styles from "./Payment.module.scss";
import { Link } from "react-router-dom";
import axios from 'axios';
import clsx from "clsx";
import verifyToken from '../../midlewares/verifyToken';
import { red } from '@mui/material/colors';


export default function Paymentonline() {
    const [isAuthen, setIsAuthen] = useState(false);
    const [permission, setPermission] = useState('customer');
    useEffect(() => {
        const getInfo = verifyToken();
        if (getInfo) {  
            getInfo.then(res => {
                if (res.data.permission) {
                    setIsAuthen(true);
                    setPermission(res.data.permission);
                }
            })
        }
    }, [permission, isAuthen]);
    function handleLogout(e) {
        e.preventDefault();
        localStorage.setItem('TOKEN', null);
        setIsAuthen(false);
        setPermission('customer');
    }
    const navigate = useNavigate();
    const [loginForm, setLoginForm] = useState({
        email: '',
        password: ''
    })
    const [registerForm, setRegisterForm] = useState({
        email: '',
        password: '',
        username: ''
    })
    const [error, setError] = useState('');
    function handleOnchangeEmail(e) {
        setRegisterForm({
            ...registerForm,
            email: e.target.value
        })
    }
    function handleOnchangePass(e) {
        setRegisterForm({
            ...registerForm,
            password: e.target.value
        })
    }
    function handleOnchangeUsername(e) {
        setRegisterForm({
            ...registerForm,
            username: e.target.value
        })
    }
    function handleOnchangePhone(e) {
        setRegisterForm({
            ...registerForm,
            phone: e.target.value
        })
    }
    function handleOnchangeAddress(e) {
        setRegisterForm({
            ...registerForm,
            address: e.target.value
        })
    }
    function handleRegister() {
        let reqOptions = {
            url: "http://localhost:4000/register",
            method: 'POST',
            data: registerForm
        }
        axios.request(reqOptions)
            .then(res => {
                if (res.data.success) {
                    navigate('/login');
                }
                else {
                    setError(res.data.message)
                }
            })
            .catch(err => {
                setError(err);
            })
    }
    return (
        <div className= {clsx(styles.home)} >
            <div fluid={clsx(styles.lg)}>
                <div className={clsx(styles.header)}>
                        <ul>
                            {permission === 'customer' && <li>
                                <Link to="/Menu">
                                    Gọi món
                                </Link>
                            </li>}
                            {permission === 'chef' &&
                                <>
                                    <li>
                                        <Link to="/chef">
                                            Chef
                                        </Link>
                                    </li>
                                </>}
                            {permission === 'admin' && <li>
                                <Link to="/admin">
                                    <p>Admin</p>
                                </Link>
                            </li>}
                            {permission === 'shipper' && <li>
                                <Link to="/shipper">
                                    <p>Shipper</p>
                                </Link>
                            </li>}
                        </ul>
                        <ul>
                            {isAuthen ?
                                <>
                                    <li>
                                        <Link to="/profile">
                                            Profile
                                        </Link>
                                    </li>
                                    <li>
                                        <a href="">Đăng xuất</a>
                                    </li>
                                </>
                                :
                                <> 
                                    <li>
                                        <Link to="/register">
                                            <p>Đăng ký</p>
                                        </Link>
                                    </li>
                                </>
                            }
                        </ul>
                </div>
                <div className={clsx(styles.payment)}>
                    <div className={clsx(styles.message)}>
                        Đặt hàng thành công!!!
                        <br />
                        Vui lòng thanh toán bằng mã QR sau
                    </div>   
                    <div className={clsx(styles.qr)}> 
                        <img src="https://images.viblo.asia/0998d669-0b87-405f-83ca-956971bf3476.png" alt="" />
                    </div>      
                    <div className={clsx(styles.order)}>
                        <a href="./customer">Đơn hàng của bạn</a>
                    </div>
                </div>
            </div>
        </div>
    )
}