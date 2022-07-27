import { useState, useEffect } from 'react';
import * as postService from '../../../services/postService';
import * as likesService from '../../../services/likesService';
import { useAuthContext } from '../../../contexts/authContext';
import Loading from '../../Loading/Loading';
import PostCard from '../PostCard/PostCard';
import styles from './LikedPostsView.module.css';
import { Link } from 'react-router-dom';

const LikedPostsView = ({catchedErrorHandler}) => {
    const { user } = useAuthContext();
    const [userLikes, setUserLikes] = useState([]);
    const [userLikedPosts, setUserLikedPosts] = useState([]);
    const [isLoading, setIsLodading] = useState(true);
    const [count, setCount] = useState(0);

    const reRender = () => {
        setCount(count + 1);
    };

    useEffect(() => {
        likesService
            .getUsersLikes(user.id)
            .then((res) => {              
                const data = res.docs.map((doc) => doc.data().postId);
                setUserLikes(data);
                if (res.docs.length == 0) {
                    setIsLodading(false);
                }
            })
            .catch((err) => {
                console.log(err);
                catchedErrorHandler();
            });
    }, []);

    useEffect(() => {
        for (let i = 0; i < userLikes.length; i++) {
            const id = userLikes[i];
            postService
                .getById(id)
                .then((res) => {
                    setUserLikedPosts((oldState) => {
                        const newArr = [...oldState];
                        newArr.push({ ...res.data(), id: res.id });
                        return newArr;
                    });
                })
                .catch((err) => {
                    console.log(err);
                    catchedErrorHandler();
                });

            if (i == userLikes.length - 1) {
                setIsLodading(false);
            }
        }
    }, [userLikes]);

    const likesRenderEL = userLikedPosts.map((p) => (
        <PostCard key={p.id} postData={p} reRender={reRender} view={'liked'} />
    ));

    const noLikesEl = (
        <h2 className={styles['no-results']}>
            You haven't liked any posts yet. Read <Link to='/blog'>here</Link>.
        </h2>
    );

    const view =
        userLikedPosts.length > 0 ? (
            <div className={styles['posts-section']}>{likesRenderEL}</div>
        ) : (
            noLikesEl
        );

    return <>{isLoading ? <Loading /> : view}</>;
};

export default LikedPostsView;
