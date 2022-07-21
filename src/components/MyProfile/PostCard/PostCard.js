import styles from './PostCard.module.css';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import * as postService from '../../../services/postService';

const PostCard = ({ postData, reRender }) => {
    const [ confirmSectionClassName, setConfirmSectionClassName ] = useState('hideConfirmSection');

    const deleteBtnHandler = (ev) => {
        ev.preventDefault();
        setConfirmSectionClassName('confirmSection');
    }

    const yesBtnHandler = async () => {
        try {
           await postService.deletePost(postData.id);
           reRender();
        } catch (err) {
            console.log(err);
        }
    }

    const noBtnHandler = () => {
        setConfirmSectionClassName('hideConfirmSection')
    }

    return (
        <section className={styles.card}>
            <div className={styles['img-wrapper']}>
                <img src={postData.imageUrl} alt="" />
                <div className={styles['link-wrapper']}>
                    <Link to={`/post-details/${postData.id}`}>Read</Link>
                </div>
            </div>
            <h3>{postData.title}</h3>
            <section className={styles['buttons-section']}>
                <Link
                    to={`/post-edit/${postData.id}`}
                    className={styles['action-link']}
                >
                    Edit
                </Link>
                <a
                    href=""
                    className={styles['action-link']}
                    onClick={deleteBtnHandler}
                >
                    Delete
                </a>
                <article className={styles[confirmSectionClassName]}>
                        Are you sure you want to delete this post?
                        <div>
                            <button onClick={yesBtnHandler}>Yes</button>
                            <button onClick={noBtnHandler}>No</button>
                        </div>
                    </article>
            </section>
        </section>
    );
};

export default PostCard;
