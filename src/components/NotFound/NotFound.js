import styles from './NotFound.module.css';
import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <section className={styles['not-found-wrapper']}>
            <div>
                <h1>Oops!</h1>
                <h2>404 - page not found</h2>
                <p>
                    Go to <Link to={'/'}>home page</Link>
                </p>
            </div>
        </section>
    );
};

export default NotFound;
