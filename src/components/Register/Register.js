import styles from './Register.module.css';
import { Link } from 'react-router-dom';

const Regitser = () => {
    return( 
        <section className={styles['form-wrapper']}>
            <form className={styles.form} method="POST">
                <h3>Register</h3>
                <input type="text" name="email" id="email" placeholder="Email"/>
                <input type="password" name="password" id="password" placeholder="Password"/>
                <input type="password" name="re-password" id="re-password" placeholder="Repeat password"/>
                <button>Register</button>
                <p>Already registered? <Link to={'/login'}>Login here</Link></p> 
            </form>
        </section>

    )
}

export default Regitser;