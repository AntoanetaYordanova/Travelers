import { useState, useEffect } from 'react';
import * as postService from '../../../services/postService';
import { useAuthContext } from '../../../contexts/authContext';
import Loading from '../../Loading/Loading';
import PostCard from '../PostCard/PostCard';
import styles from './OwnPostsView.module.css';
import { Link } from 'react-router-dom';

const OwnPostsView = ({catchedErrorHandler}) => {
    const { user } = useAuthContext();
    const [posts, setPosts] = useState([]);
    const [isLoading, setIsLodading] = useState(true);
    const [ count, setCount ] = useState(0);

    const reRender = () => {
        setCount(count + 1);
    }

    useEffect(() => {
        postService
            .getUserPosts(user.id)
            .then((res) => {
                const data = res.docs.map((doc) => ({
                    ...doc.data(),
                    id: doc.id,
                }));
                setPosts(data);
                setIsLodading(false);
            })
            .catch((err) => {
                catchedErrorHandler();
                console.log(err);
            });
    }, [count]);

    const postsRenderEl = posts.map(e => <PostCard key={e.id} postData={e} reRender = {reRender} view={'own'} />);
    
    const noPostsEl = <h2 className={styles['no-results']} >You don't have any posts yet. Create one <Link to={'/post'}>here</Link></h2>;

    const view = posts.length > 0 ? <div className={styles['posts-section']}>{postsRenderEl}</div> : noPostsEl;

    return (
        <>
                {isLoading ? <Loading /> : view}
        </>
    );
};

export default OwnPostsView;
