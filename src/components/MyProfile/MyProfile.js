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
        <FontAwesomeIcon icon={faUser} size={'5x'} color={'#e8ba02'} />
    );
    const [pageView, setPageView] = useState('ownPosts');

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
                <section>
                    <button>Your posts</button>
                    <button>Liked posts</button>
                </section>
            </header>
            <section>
                <h2>{pageView == 'ownPosts' ? 'Your posts' : 'Liked posts'}</h2>
                <section>
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
