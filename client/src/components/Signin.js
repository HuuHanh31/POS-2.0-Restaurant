import clsx from "clsx";
import styles from "../css/Signin";
function Signin({onShowLogin}){
    return (
        <div className= {clsx(styles.wrapper)} >
            <div className= {clsx(styles.form)}>
                <h1 style= {{textAlign: 'center', marginBottom: 80}}>Login</h1>
                <form method="POST" style={{width: '100%', position: 'relative', flexGrow: 1, display: 'flex', flexDirection: 'column'}}>
                    <div style={{width: '100%', position: 'relative'}}>
                        <input className= {clsx(styles.loginInput)}type="text" name="" placeholder=" " id="username"/>
                        <label className={clsx(styles.formLabel)} for="username">Username</label>
                    </div>
                    <div style={{width: '100%', position: 'relative', marginTop: 50}}>
                        <input className= {clsx(styles.loginInput)}type="password" name="" placeholder=" " id="password"/>
                        <label className={clsx(styles.formLabel)} for="password">Password</label>
                    </div>
                    <button className={clsx(styles.submitForm)}>NEXT</button>
                </form>
                <br/>
                <a href="register.html">Sign up</a>
            </div>
            <div className={clsx(styles.outside)} onClick={()=> onShowLogin()}>

            </div>
        </div>
    )
}

export default Signin