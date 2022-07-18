import Loading from '../Loading/Loading';
import { useParams } from 'react-router-dom';
import * as postService from '../../services/postService';
import { useEffect, useState } from 'react';
import styles from './Details.module.css';
import * as likesService from '../../services/likesService';
import { useAuthContext } from '../../contexts/authContext';
import { async } from '@firebase/util';

const Details = () => {
    const { user, isAuthenticated } = useAuthContext();
    const { id } = useParams();
    const [postData, setPostData] = useState({});
    const [isLoading, setIsLodading] = useState(true);
    const [userPostData, setUserPostData] = useState({
        hasLiked: false,
        isOwner: false,
        likeId: '',
    });
    const [likes, setLikes] = useState(0);

    const heartImg = '/images/heart-img.svg';
    const heartLikedImg = '/images/heart-img-liked.svg';

    useEffect(() => {
        try {
            fetchLikesData();
        } catch (err) {
            console.log(err);
        }
    }, [userPostData.hasLiked]);

    useEffect(() => {
        try {
            fetchPostData();
        } catch (err) {
            console.log(err);
        }
    }, []);

    function fetchLikesData() {
        likesService.getPostLikes(id).then((res) => {
            const likes = res.docs.map((doc) => {
                return { ...doc.data(), id: doc.id };
            });
            setLikes(likes.length);
            const hasLiked = likes.some((e) => e.ownerId == user.id);
            setUserPostData((oldState) => ({ ...oldState, hasLiked }));

            if (hasLiked) {
                const like = likes.find((l) => l.ownerId == user.id);
                setUserPostData((oldState) => ({
                    ...oldState,
                    likeId: like.id,
                }));
            }
        });
    }

    function fetchPostData() {
        postService.getById(id).then((res) => {
            setPostData({ ...res.data(), id: res.id });
            setUserPostData((oldState) => ({
                ...oldState,
                isOwner: postData.ownerId === user.id,
            }));
            setIsLodading(false);
        });
    }

    const likeHandler = async () => {
        try {
            if (!userPostData.hasLiked) {
                likesService.create({ ownerId: user.id, postId: id });
                setUserPostData((oldState) => ({
                    ...oldState,
                    hasLiked: true,
                }));
            } else {
                likesService.deleteLike(userPostData.likeId);
                setUserPostData((oldState) => ({
                    ...oldState,
                    hasLiked: false,
                }));
            }
        } catch (err) {
            console.log(err);
        }
    };

    const likeSection = (
        <a
            title={
                userPostData.hasLiked
                    ? 'Click to take like back'
                    : 'Click to like'
            }
        >
            <img
                src={userPostData.hasLiked ? heartLikedImg : heartImg}
                alt="like"
                onClick={likeHandler}
            />
        </a>
    );

    const authorSection = (
        <div>
            <a href="">Edit</a>
            <a href="">Delete</a>
        </div>
    );

    console.log(userPostData);

    const post = (
        <section className={styles['post-section']}>
            <section className={styles['post-actions-section']}>
                <div className={styles['likes-section']}>
                    <p>Likes: {likes} </p>
                    <div className={styles['heart-img-wrapper']}>
                        {(isAuthenticated && !userPostData.isOwner) ? likeSection : null}
                    </div>
                </div>
                {userPostData.isOwner ? authorSection : null}
            </section>
            <div className={styles['img-wrapper']}>
                <img
                    src={postData.imageUrl}
                    alt={`${postData.destination}-img`}
                />
            </div>
            <article>
                <h2>{postData.title}</h2>
                <p>{postData.content}</p>
                <h5>Author: {postData.creator}</h5>
                {postData.source ? (
                    <p>
                        Read{' '}
                        <a
                            href={postData.source}
                            target="_blank"
                            rel="noreferrer noopener"
                        >
                            here
                        </a>{' '}
                        the full article
                    </p>
                ) : null}
            </article>
        </section>
    );

    return <div>{isLoading ? <Loading /> : post}</div>;
};

export default Details;
