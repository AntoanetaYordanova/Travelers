import { Link, NavLink } from 'react-router-dom';
import styles from './Nav.module.css';
import { useAuthContext } from '../../contexts/authContext'

const Nav = () => {
    const isActive = ({ isActive }) =>
        isActive ? styles['active'] : undefined;
    const { isAuthenticated, user } = useAuthContext();
    
    console.log(user);

    const userNav = (
        <>
            <li>
                <NavLink to={'/post'} className={isActive}>
                    Create Post
                </NavLink>
            </li>
            <li>
                <NavLink to={'/my-profile'} className={isActive}>
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
                    <NavLink to={'/login'} className={isActive}>
                        Login
                    </NavLink>
                </li>
                <li>
                    <NavLink to={'/register'} className={isActive}>
                        Register
                    </NavLink>
                </li>
        </>
    )

    return (
        <nav>
            <h2>
                <Link to={'/'} className={styles['accent-yellow']}>
                    Travelers
                </Link>
            </h2>
            <ul className={styles['nav-menu']}>
                <li>
                    <NavLink to={'/'} className={isActive}>
                        Home
                    </NavLink>
                </li>
                <li>
                    <NavLink to={'/blog'} className={isActive}>
                        Blog
                    </NavLink>
                </li>
                {isAuthenticated ? userNav : guestNav}
            </ul>
        </nav>
    );
};

export default Nav;
