import { useState } from 'react';
import { useAuthContext } from '../../contexts/authContext';
import styles from './MyProfile.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import OwnPostsView from './OwnPostsView/OwnPostsView';
import LikedPostsView from './LikedPostsView/LikedPostsView';

const MyProfile = () => {
    const { user } = useAuthContext();
    const userImg = (
        <FontAwesomeIcon icon={faUser} size={'4x'} color={'#e8ba02'} />
    );
    const [pageView, setPageView] = useState('ownPosts');

    const showOwnPostsHandler = () => {
        setPageView('ownPosts');
    }

    const showLikedPostsHandler = () => {
        setPageView('likedPosts');
    }

    return (
        <div className={styles['page-wrapper']}>
            <header>
                <section className={styles['user-info-section']}>
                    <div>
                        <div className={styles['img-wrapper']}>{userImg}</div>
                    </div>
                    <div>
                        <h3>{user.email}</h3>
                    </div>
                </section>
                <section className={styles['buttons-section']}>
                    <button className={pageView == 'ownPosts' ? styles.active : styles['not-active']} onClick={showOwnPostsHandler}>Your posts</button>
                    <button className={pageView == 'ownPosts' ? styles['not-active'] : styles.active} onClick={showLikedPostsHandler}>Liked posts</button>
                </section>
            </header>
            <section className={styles['main-section']}>
                <h2>{pageView == 'ownPosts' ? 'Your posts' : 'Liked posts'}</h2>
                <section className={styles['posts-section']}>
                    {pageView == 'ownPosts' ? (
                        <OwnPostsView />
                    ) : (
                        <LikedPostsView />
                    )}
                </section>
            </section>
        </div>
    );
};

export default MyProfile;
