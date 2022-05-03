import clsx from "clsx";
import { Link } from "react-router-dom";
import styles from "./Signin.module.scss";
import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import verifyToken from '../../midlewares/verifyToken';



import axios from 'axios';

function Signin({onShowLogin}){
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
    const [error, setError] = useState('');
    function handleOnchangeEmail(e) {
        setLoginForm({
            ...loginForm,
            email: e.target.value
        })
    }
    function handleOnchangePass(e) {
        setLoginForm({
            ...loginForm,
            password: e.target.value
        })
    }
    function handleLogin() {
        let reqOptions = {
            url: "http://localhost:4000/login",
            method: 'POST',
            data: loginForm
        }
        axios.request(reqOptions)
            .then(res => {
                if (res.data.success) {
                    localStorage.setItem('TOKEN', res.data.token);
                    navigate('/');
                }
                else {
                    localStorage.setItem('TOKEN', '');
                    setError(res.data.message)
                }
            })
            .catch(err => {
                setError(`${err}`)
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
                                        <div onClick={handleLogout}>
                                            Đăng xuất
                                        </div>
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
                <div className= {clsx(styles.form)}>
                    <h1 style= {{textAlign: 'center', marginBottom: 80}}>Đăng nhập</h1>
                        <div style={{width: '100%', position: 'relative'}}>
                            <input className= {clsx(styles.loginInput)}type="text" id='email' name='email' placeholder="" onChange={handleOnchangeEmail}/>
                            <label className={clsx(styles.formLabel)} for="email">Email</label>
                            
                        </div>
                        <div style={{width: '100%', position: 'relative', marginTop: 50}}>
                            <input className= {clsx(styles.loginInput)}type="password" id='password' name='password' onChange={handleOnchangePass}/>
                            <label className={clsx(styles.formLabel)} for="password">Password</label>
                        </div>
                        <button  onClick={handleLogin} className={clsx(styles.submitForm)}>Đăng nhập</button>
                    {
                        error &&
                        <div className={clsx(styles.error)}>
                            <h3>{error}</h3>
                        </div>
                    }
                    <br/>
                </div>
            </div>
        </div>
    )
}

export default Signin