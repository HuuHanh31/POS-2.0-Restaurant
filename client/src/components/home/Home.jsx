import React, { useState, useEffect } from 'react';
import Menu from'../menu/Menu'
import ReactTypingEffect from 'react-typing-effect';
import clsx from "clsx";
import styles from './Home.module.scss';
import { Link } from 'react-router-dom';
import verifyToken from '../../midlewares/verifyToken';

export default function Home() {
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
    return (
        <div className={clsx(styles.home)}>
            <div fluid={clsx(styles.lg)}>
                <div className={clsx(styles.header)}>
                    <ul>
                        {permission === 'customer' && <li>
                            <Link to="/Menu">
                                Gọi món
                            </Link>
                        </li>}
                        {permission === 'customer' && isAuthen && <li>
                            <Link to="/customer">
                                Đơn hàng của tôi
                            </Link>
                        </li>}
                        {permission === 'chef' &&
                            <>
                                <li>
                                    <Link to="/chef">
                                        Chef
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/Menu">
                                        Thực đơn
                                    </Link>
                                </li>
                            </>}
                            {permission === 'admin' &&
                            <>
                                <li>
                                    <Link to="/admin">
                                        Admin
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/Menu">
                                        Thực đơn
                                    </Link>
                                </li>
                            </>}
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
                                    <Link to="" onClick={handleLogout}>
                                        Đăng xuất
                                    </Link>
                                </li>
                            </>
                            :
                            <> <li>
                                <Link to="/login">
                                    Đăng nhập
                                </Link>
                            </li>
                                <li>
                                    <Link to="/register">
                                        <p>Đăng ký</p>
                                    </Link>
                                </li>
                            </>
                        }
                    </ul>
                </div>
                <div className={clsx(styles.typing_effect)} >
                    <img src=".\logo.png" alt='logo'/>    
                    <ReactTypingEffect
                        speed={85}
                        text={["Chào mừng đến với nhà hàng 2.0"]}
                        cursorRenderer={cursor => <h1>{cursor}</h1>}
                        displayTextRenderer={(text, i) => {
                            return (
                                <h1>
                                    {text.split('').map((char, i) => {
                                        const key = `${i}`;
                                        return (
                                            <span className={clsx(styles.text_styled)}
                                                key={key}
                                            >{char}</span>
                                        );
                                    })}
                                </h1>
                            );
                        }}
                    />
                </div>
            </div >
        </div >
    )
}



