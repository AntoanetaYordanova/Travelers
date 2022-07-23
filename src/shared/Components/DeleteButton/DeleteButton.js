import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import styles from './DeleteButton.module.css';

const DeleteButton = ({ deleteBtnHandler }) => {
    const deleteImg = <FontAwesomeIcon icon={faTrashCan}/>

    return (
        <a href="" className={styles['action-link']} onClick={deleteBtnHandler}>
            {deleteImg}
            Delete
        </a>
    );
};

export default DeleteButton;
