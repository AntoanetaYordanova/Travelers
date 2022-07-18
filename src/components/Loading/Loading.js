import Spinner from 'react-bootstrap/Spinner';
import styles from './Loading.module.css';

function Loading() {
    return (
        <div className={styles['page-wrapper']}>
            <div>
                <h1>Loading</h1>
                <Spinner animation="grow" role="status" variant="warning" className={styles.spinner}>
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            </div>
        </div>
    );
}

export default Loading;
