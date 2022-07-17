import styles from './Register.module.css';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../../contexts/authContext';
import * as authService from '../../services/auth';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const Regitser = () => {
    const navigate = useNavigate();
    const { login } = useAuthContext();
    const passwordRegEx = /^.*(?=.*\d)(?=.*[a-zA-Z]).*$/;
    const emailRegex = /^.+@.+\..+$/;
    const [errors, setErrors] = useState({
        email: '',
        username: '',
        password: '',
        repass: '',
        hasErrors: false,
    });
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [repass, setRepass] = useState('');

    const registerHandler = async (ev) => {
        ev.preventDefault();

        emailValidator();
        passwordValidator();
        repassValidator();

        if(!errors.hasErrors) {
            try {
                   const newUser = await authService.register(email, password);
                   const userInfo = {
                    id : newUser.user.uid,
                    email : newUser.user.email,
                    token : newUser.user.accessToken,
                    username: newUser.user.username
                   }
                   login(userInfo);
                   navigate('/');
            } catch (err) {
                console.log(err.message);
                if(err.message === 'Firebase: Error (auth/email-already-in-use).') {
                    setErrors(oldState => {
                        return {...oldState, email : 'Email is already in use', hasErrors : true}
                    })
                } else if(err.message === 'Firebase: Error (auth/invalid-email).'){
                    setErrors(oldState => {
                        return {...oldState, email : 'Please enter a valid email', hasErrors : true}
                    })
                }
            }
        }
    };

    const emailValidator = (e) => {
        if(!emailRegex.test(email)) {
            setErrors(oldState => {
                return {...oldState, email : 'Please enter a valid email', hasErrors : true}
            })
        } else {
            setErrors(oldState => {
                return {...oldState, email : '', hasErrors : false}
            })
        }
    };

    const usernameValidator = (e) => {
        if(username == '') {
            setErrors(oldState => {
                return {...oldState, username : 'Username is required', hasErrors : true}
            })
        } else {
            setErrors(oldState => {
                return {...oldState, username : '', hasErrors : false}
            })
        }
    };


    const passwordValidator = (e) => {
        if (password.length < 6) {
            setErrors(oldState => {
                return {...oldState, password : 'Password must be at least 6 characters long', hasErrors : true}
            })
        } else if (!passwordRegEx.test(password)) {
            setErrors(oldState => {
                return {...oldState, password : 'Password should contain at least one number and one letter', hasErrors : true}
            })
        } else {
            setErrors(oldState => {
                return {...oldState, password : '', hasErrors : false}
            })
        }
    };

    const repassValidator = (e) => {
        if(password !== repass ){
            setErrors(oldState => {
                return {...oldState, repass : 'Password don\'t match', hasErrors : true}
            })
        } else if( password === ''){
            setErrors(oldState => {
                return {...oldState, repass : 'Please repeat you password', hasErrors : true}
            })
        } 
         else {
            setErrors(oldState => {
                return {...oldState, repass : '', hasErrors : false}
            })
        }
    };

    const emailChangeHandler = (e) => {
        const currentValue = (e.target.value).trim();
        setEmail(currentValue);
    };

    const usernameChangeHandler = (e) => {
        const currentValue = (e.target.value).trim();
        setUsername(currentValue);
    };

    const passwordChangeHandler = (e) => {
        const currentValue = (e.target.value).trim();
        setPassword(currentValue);
    };

    const repassChangeHandler = (e) => {
        const currentValue = (e.target.value).trim();
        setRepass(currentValue);
    };

    return (
        <section className={styles['form-wrapper']}>
            <form
                className={styles.form}
                method="POST"
                onSubmit={registerHandler}
            >
                <h3>Register</h3>
                <div>
                    <input
                        className={errors.email ? styles['error-input'] : ''}
                        type="text"
                        name="email"
                        id="email"
                        placeholder="Email"
                        onBlur={emailValidator}
                        onChange={emailChangeHandler}
                    />
                    <p className={errors.email ? styles.error : styles.hidden}>
                        {errors.email}
                    </p>
                </div>
                <div>
                    <input
                        className={errors.username ? styles['error-input'] : ''}
                        type="text"
                        name="username"
                        id="username"
                        placeholder="Username"
                        onBlur={usernameValidator}
                        onChange={usernameChangeHandler}
                    />
                    <p className={errors.username ? styles.error : styles.hidden}>
                        {errors.username}
                    </p>
                </div>
                <div>
                    <input
                        className={errors.password ? styles['error-input'] : ''}
                        type="password"
                        name="password"
                        id="password"
                        placeholder="Password"
                        onBlur={passwordValidator}
                        onChange={passwordChangeHandler}
                    />
                    <p
                        className={
                            errors.password ? styles.error : styles.hidden
                        }
                    >
                        {errors.password}
                    </p>
                </div>
                <div>
                    <input
                        className={errors.repass ? styles['error-input'] : ''}
                        type="password"
                        name="repass"
                        id="repass"
                        placeholder="Repeat password"
                        onBlur={repassValidator}
                        onChange={repassChangeHandler}
                    />
                    <p className={errors.repass ? styles.error : styles.hidden}>
                        {errors.repass}
                    </p>
                </div>
                <button>Sign Up</button>
                <p>
                    Already registered? <Link to={'/login'}>Log In</Link>
                </p>
            </form>
        </section>
    );
};

export default Regitser;
