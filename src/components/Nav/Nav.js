import { Link, NavLink } from 'react-router-dom';
import './Nav.css';

const Nav = () => {
    const isActive = ({ isActive }) => (isActive ? 'active-link' : undefined);

    return (
        <nav>
            <h2>
                <Link to={'/'} className="accent-yellow">
                    Travelers
                </Link>
            </h2>
            <ul className="nav-menu">
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
                <li>
                    <NavLink to={'/create'} className={isActive}>
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
            </ul>
        </nav>
    );
};

export default Nav;
