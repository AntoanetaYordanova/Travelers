import styles from './Error.module.css';
import { Link } from 'react-router-dom';

const Error = () => {
    return(
        <h1 className={styles.error}>Something Happend. Go to <Link to='/'>home page</Link></h1>
    )
}

export default Error;