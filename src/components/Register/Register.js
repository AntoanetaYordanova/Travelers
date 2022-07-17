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
        email: {
            message : '',
            valid : true
        },
        username:  {
            message : '',
            valid : true
        },
        password:  {
            message : '',
            valid : true
        },
        repass:  {
            message : '',
            valid : true
        },
    });
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [repass, setRepass] = useState('');

    const registerHandler = async (ev) => {
        ev.preventDefault();

        emailValidator();
        usernameValidator();
        passwordValidator();
        repassValidator();

        if(!hasErrors()) {
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
                        return {...oldState, email : {message : 'Email is already in use', valid : false}}
                    })
                } else if(err.message === 'Firebase: Error (auth/invalid-email).'){
                    setErrors(oldState => {
                        return {...oldState, email : {message : 'Please enter a valid email', valid : false}}
                    })
                }
            }
        }
    };

    const emailValidator = () => {
        if(!emailRegex.test(email)) {
            setErrors(oldState => {
                return {...oldState, email : {message : 'Please enter a valid email', valid : false}}
            })
        } else {
            setErrors(oldState => {
                return {...oldState,  email : {message : '', valid : true}}
            })
        }
    };

    const usernameValidator = () => {
        if(username == '') {
            setErrors(oldState => {
                return {...oldState, username : {message : 'Username is required', valid : false}};
            })
        } else {
            setErrors(oldState => {
                return {...oldState, username : {message : '', valid : true}};
            })
        }
    };


    const passwordValidator = () => {
        if (password.length < 6) {
            setErrors(oldState => {
                return {...oldState, password : {message : 'Password must be at least 6 characters long', valid : false}}
            })
        } else if (!passwordRegEx.test(password)) {
            setErrors(oldState => {
                return {...oldState, password : {message : 'Password should contain at least one number and one letter', valid : false}}
            })
        } else {
            setErrors(oldState => {
                return {...oldState, password : {message : '', valid : true}}
            })
        }
    };

    const repassValidator = () => {
        if(password !== repass ){
            setErrors(oldState => {
                return {...oldState, repass : {message : 'Password don\'t match', valid : false}};
            })
        } else if( password === ''){
            setErrors(oldState => {
                return {...oldState, repass : {message : 'Please repeat you password', valid : false}};
            })
        } else {
            setErrors(oldState => {
                return {...oldState, repass : {message : '', valid : true}};
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

    function hasErrors() {
        if(errors.email.valid && errors.password.valid && errors.repass.valid && errors.username.valid) {
            return false;
        }
        return true;
    }

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
                        className={!errors.email.valid ? styles['error-input'] : ''}
                        type="text"
                        name="email"
                        id="email"
                        placeholder="Email"
                        onBlur={emailValidator}
                        onChange={emailChangeHandler}
                    />
                    <p className={!errors.email.valid ? styles.error : styles.hidden}>
                        {errors.email.message}
                    </p>
                </div>
                <div>
                    <input
                        className={!errors.username.valid ? styles['error-input'] : ''}
                        type="text"
                        name="username"
                        id="username"
                        placeholder="Username"
                        onBlur={usernameValidator}
                        onChange={usernameChangeHandler}
                    />
                    <p className={!errors.username.valid ? styles.error : styles.hidden}>
                        {errors.username.message}
                    </p>
                </div>
                <div>
                    <input
                        className={!errors.password.valid ? styles['error-input'] : ''}
                        type="password"
                        name="password"
                        id="password"
                        placeholder="Password"
                        onBlur={passwordValidator}
                        onChange={passwordChangeHandler}
                    />
                    <p
                        className={
                            !errors.password.valid ? styles.error : styles.hidden
                        }
                    >
                        {errors.password.message}
                    </p>
                </div>
                <div>
                    <input
                        className={!errors.repass.valid ? styles['error-input'] : ''}
                        type="password"
                        name="repass"
                        id="repass"
                        placeholder="Repeat password"
                        onBlur={repassValidator}
                        onChange={repassChangeHandler}
                    />
                    <p className={!errors.repass.valid ? styles.error : styles.hidden}>
                        {errors.repass.message}
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
