import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import styles from "./register.module.css";
import { Link } from "react-router-dom";
import axios from 'axios';
import clsx from "clsx";


export default function Register({onShowRegister,changeApp}) {
    const navigate = useNavigate();
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
    function handleRegister() {
        let reqOptions = {
            url: "http://localhost:4000/register",
            method: 'POST',
            data: registerForm
        }
        axios.request(reqOptions)
            .then(res => {
                console.log(res.data)
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
        <div className= {clsx(styles.wrapper)} >
            <div className= {clsx(styles.form)}>
                    <h1 style= {{textAlign: 'center', marginBottom: 50}}>Đăng kí</h1>
                    <div style={{width: '100%', position: 'relative'}}>
                        <input className= {clsx(styles.loginInput)}type="text" name="name" id="name"  placeholder="" onChange={handleOnchangeUsername}/>
                        <label className={clsx(styles.formLabel)} for="name">Họ và tên</label>
                        
                    </div>
                    <div style={{width: '100%', position: 'relative', marginTop: 45}}>
                        <input className= {clsx(styles.loginInput)}type="text" name="email" id='email' placeholder="" onChange={handleOnchangeEmail} />
                        <label className={clsx(styles.formLabel)} for="email">Email</label>
                        
                    </div>
                    <div style={{width: '100%', position: 'relative', marginTop: 45}}>
                        <input className= {clsx(styles.loginInput)}type="password" name="password" id='password' onChange={handleOnchangePass} />
                        <label className={clsx(styles.formLabel)} for="password">Password</label>
                        
                    </div>
                    <button className={clsx(styles.submitForm)} onClick={handleRegister}>Đăng kí</button>
                {
                    error &&
                    <div className='error'>
                        <h3>{error}</h3>
                    </div>
                }
                <br/>
                <Link to="/" style={{ textDecoration: "none" }}>
                    <a href="">Home</a>
                </Link>
                
            </div>
        </div>
    )
}