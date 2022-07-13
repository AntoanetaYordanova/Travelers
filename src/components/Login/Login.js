import styles from './Login.module.css';
import { Link } from 'react-router-dom';

const Login = () => {
    return( 
        <section className={styles['form-wrapper']}>
            <form className={styles.form} method="POST">
                <h3>Login</h3>
                <input type="text" name="email" id="email" placeholder="Email"/>
                <input type="password" name="password" id="password" placeholder="Password"/>
                <button>Log In</button>
                <p>Not registered yet? <Link to={'/register'}>Sign Up</Link></p> 
            </form>
        </section>

    )
}

export default Login;