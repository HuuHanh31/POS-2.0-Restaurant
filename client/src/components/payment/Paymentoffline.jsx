import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import styles from "./Payment.module.scss";
import { Link } from "react-router-dom";
import axios from 'axios';
import clsx from "clsx";
import verifyToken from '../../midlewares/verifyToken';


export default function Paymentoffline() {
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
                                            Quản lí đơn hàng chef
                                        </Link>
                                    </li>
                                </>}
                            {permission === 'admin' && <li>
                                <Link to="/admin">
                                    <p>Quản lý admin</p>
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
                                        <Link to="/login">
                                            <p>Đăng nhập</p>
                                        </Link>
                                    </li>
                                </>
                            }
                        </ul>
                </div>
                <div className={clsx(styles.payment)}>
                    <div className={clsx(styles.message1)}>
                        Đặt hàng thành công!!!
                        <br />
                        Vui lòng thanh toán khi nhận hàng
                    </div>         
                    <div className={clsx(styles.order1)}>
                        <a href="./customer">Đơn hàng của bạn</a>
                    </div>
                </div>
            </div>
        </div>    
    )
}