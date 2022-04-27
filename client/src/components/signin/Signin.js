import clsx from "clsx";
import { Link } from "react-router-dom";
import styles from "./Signin.module.css";
import { useState } from 'react';
import { useNavigate } from "react-router-dom";



import axios from 'axios';

function Signin({onShowLogin}){
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
                console.log(res.data)
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
        <div className= {clsx(styles.wrapper)} >
            <div className= {clsx(styles.form)}>
                <h1 style= {{textAlign: 'center', marginBottom: 80}}>Login</h1>
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
                    <div className='error'>
                        <h3>{error}</h3>
                    </div>
                }
                <br/>
                
            
            <Link to="/register" style={{ textDecoration: "none" }}>
                    <a href="">Sign up</a>
            </Link>
                
            <div className={clsx(styles.outside)} onClick={()=> onShowLogin()}>

            </div>
            </div>
        </div>
    )
}

export default Signin