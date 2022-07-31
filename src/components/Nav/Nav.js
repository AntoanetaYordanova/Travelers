import { Link, NavLink } from 'react-router-dom';
import styles from './Nav.module.css';
import { useAuthContext } from '../../contexts/authContext';
import { useState } from 'react';

const classNames = require('classnames');

const Nav = () => {
    const isLinkActive = ({ isActive }) =>
        isActive ? styles['active'] : undefined;
    const { isAuthenticated } = useAuthContext();
    const [isMenuActive, setIsMenuActive] = useState(false);

    
    const linkClickHandler = () => {
        if(isMenuActive) {
            setIsMenuActive(false);
        }
    }


    const userNav = (
        <>
            <li>
                <NavLink to={'/post'} className={isLinkActive} onClick={linkClickHandler}>
                    Create Post
                </NavLink>
            </li>
            <li>
                <NavLink to={'/my-profile'} className={isLinkActive} onClick={linkClickHandler}>
                    My Profile
                </NavLink>
            </li>
            <li>
                <Link to={'/logout'} onClick={linkClickHandler}>Logout</Link>
            </li>
        </>
    );

    const guestNav = (
        <>
            <li>
                <NavLink to={'/login'} className={isLinkActive} onClick={linkClickHandler}>
                    Login
                </NavLink>
            </li>
            <li>
                <NavLink to={'/register'} className={isLinkActive} onClick={linkClickHandler}>
                    Register
                </NavLink>
            </li>
        </>
    );
    
    const navMenuClasses = classNames(
        [styles['nav-menu']],
        {[styles.active] : isMenuActive}
    );

    const hamburgerClass = classNames(
        styles.hamburger,
        {[styles.active] : isMenuActive}
    );

    return (
        <nav>
            <h2>
                <Link to={'/'} className={styles['accent-yellow']}>
                    Travelers
                </Link>
            </h2>
                <ul className={navMenuClasses}>
                    <li>
                        <NavLink to={'/'} className={isLinkActive} onClick={linkClickHandler}>
                            Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to={'/blog'} className={isLinkActive} onClick={linkClickHandler}>
                            Blog
                        </NavLink>
                    </li>
                    {isAuthenticated ? userNav : guestNav}
                </ul>
                <section className={hamburgerClass} onClick={() => setIsMenuActive(!isMenuActive)}>
                    <span className={styles.bar}></span>
                    <span className={styles.bar}></span>
                    <span className={styles.bar}></span>
                </section>
        </nav>
    );
};

export default Nav;
