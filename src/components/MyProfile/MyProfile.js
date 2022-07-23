import { useAuthContext } from '../../contexts/authContext';
import styles from './MyProfile.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import OwnPostsView from './OwnPostsView/OwnPostsView';
import LikedPostsView from './LikedPostsView/LikedPostsView';
import { useState } from 'react';
import Error from '../Error/Error';

const MyProfile = () => {
    const { user, setUserPageView } = useAuthContext();
    const [hasCatchedError, setHasCatchedError] = useState(false);

    const userImg = (
        <FontAwesomeIcon icon={faUser} size={'4x'} color={'#e8ba02'} />
    );

    const showOwnPostsHandler = () => {
        setUserPageView({ ...user, myPageView: 'own' });
    };

    const showLikedPostsHandler = () => {
        setUserPageView({ ...user, myPageView: 'liked' });
    };

    const catchedErrorHandler = () => {
        setHasCatchedError(true);
    };

    const view =
        user.myPageView == 'own' ? (
            <OwnPostsView catchedErrorHandler={catchedErrorHandler} />
        ) : (
            <LikedPostsView />
        );

    const pageContent = (
        <>
         <header>
                    <section className={styles['user-info-section']}>
                        <div>
                            <div className={styles['img-wrapper']}>
                                {userImg}
                            </div>
                        </div>
                        <div>
                            <h3>{user.email}</h3>
                        </div>
                    </section>
                    <section className={styles['buttons-section']}>
                        <button
                            className={
                                user.myPageView == 'own'
                                    ? styles.active
                                    : styles['not-active']
                            }
                            onClick={showOwnPostsHandler}
                        >
                            Your posts
                        </button>
                        <button
                            className={
                                user.myPageView == 'own'
                                    ? styles['not-active']
                                    : styles.active
                            }
                            onClick={showLikedPostsHandler}
                        >
                            Liked posts
                        </button>
                    </section>
                </header>
                <section className={styles['main-section']}>
                    <h2 className={styles['page-heading']}>
                        {user.myPageView == 'own'
                            ? 'Your posts'
                            : 'Liked posts'}
                    </h2>
                    <section className={styles['posts-section']}>
                        {view}
                    </section>
                </section>
        </>
    )

    return (
        <section className={styles['outher']}>
            <div className={styles['page-wrapper']}>
               { hasCatchedError ? <Error/> : pageContent }
            </div>
        </section>
    );
};

export default MyProfile;
