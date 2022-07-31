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

    const userNav = (
        <>
            <li>
                <NavLink to={'/post'} className={isLinkActive}>
                    Create Post
                </NavLink>
            </li>
            <li>
                <NavLink to={'/my-profile'} className={isLinkActive}>
                    My Profile
                </NavLink>
            </li>
            <li>
                <Link to={'/logout'}>Logout</Link>
            </li>
        </>
    );

    const guestNav = (
        <>
            <li>
                <NavLink to={'/login'} className={isLinkActive}>
                    Login
                </NavLink>
            </li>
            <li>
                <NavLink to={'/register'} className={isLinkActive}>
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
                        <NavLink to={'/'} className={isLinkActive}>
                            Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to={'/blog'} className={isLinkActive}>
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
