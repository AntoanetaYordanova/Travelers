import styles from './Login.module.css';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as authService from '../../services/auth';
import { useAuthContext } from '../../contexts/authContext';
import Error from '../Error/Error';

const Login = () => {
    const navigate = useNavigate();
    const { login } = useAuthContext();
    const initialErrorState = {
        email: '',
        password: '',
        hasErrors: false,
    };
    const [errors, setErrors] = useState(initialErrorState);
    const [hasCatchedError, setHasCatchedError] = useState(false);

    const loginHandler = async (ev) => {
        ev.preventDefault();

        let { email, password } = Object.fromEntries(
            new FormData(ev.currentTarget)
        );
        email = email.trim();
        password = password.trim();

        try {
            const newUser = await authService.login(email, password);
            const userInfo = {
                id: newUser.user.uid,
                email: newUser.user.email,
                token: newUser.user.accessToken,
                myPageView: 'own',
            };
            login(userInfo);
            navigate('/blog');
        } catch (err) {
            if (
                err.message === 'Firebase: Error (auth/user-not-found).' 
                
            ) {
                setErrors((oldState) => {
                    return {
                        ...oldState,
                        email: 'There is no user with this email',
                    };
                });
            }  else if(err.message === 'Firebase: Error (auth/invalid-email).') {
                setErrors((oldState) => {
                    return {
                        ...oldState,
                        email: 'Invalid email',
                    };
                });
            }
            else if (
                err.message === 'Firebase: Error (auth/wrong-password).' ||
                err.message === 'Firebase: Error (auth/internal-error).'
            ) {
                setErrors((oldState) => {
                    return {
                        ...oldState,
                        password: 'Wrong email or password',
                        email: 'Wrong email or password',
                    };
                });
            } else {
                setHasCatchedError(true);
            }
            console.log(err);
        }
    };

    const inputOnBlurHandler = () => {
        setErrors(initialErrorState);
    };

    const form = (
        <div>
            <section className={styles['form-wrapper']}>
            <form className={styles.form} method="POST" onSubmit={loginHandler}>
                <h3>Login</h3>
                <div>
                    <input
                        type="text"
                        name="email"
                        id="email"
                        placeholder="Email"
                        className={errors.email ? styles['error-input'] : ''}
                        onBlur={inputOnBlurHandler}
                    />
                    <p className={errors.email ? styles.error : styles.hidden}>
                        {errors.email}
                    </p>
                </div>
                <div>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        placeholder="Password"
                        className={errors.password ? styles['error-input'] : ''}
                        onBlur={inputOnBlurHandler}
                    />
                    <p
                        className={
                            errors.password ? styles.error : styles.hidden
                        }
                    >
                        {errors.password}
                    </p>
                </div>
                <button>Log In</button>
                <p>
                    Not registered yet? <Link to={'/register'}>Sign Up</Link>
                </p>
            </form>
        </section>
        </div>
    )

    return (
       <> {hasCatchedError ? <Error/> : form} </>
    );
};

export default Login;
