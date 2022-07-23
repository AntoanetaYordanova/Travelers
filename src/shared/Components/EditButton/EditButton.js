import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import styles from './EditButton.module.css';

const EditButton = ({ id }) => {
    const editImg = <FontAwesomeIcon icon={faPenToSquare}/>;

    return(
        <Link to={`/post-edit/${id}`} className={styles['action-link']}>
                {editImg}
                Edit
        </Link>
    )
}

export default EditButton;