import Loading from '../Loading/Loading';
import { Link, useParams } from 'react-router-dom';
import * as postService from '../../services/postService';
import { useEffect, useState } from 'react';
import styles from './Details.module.css';
import * as likesService from '../../services/likesService';
import { useAuthContext } from '../../contexts/authContext';
import { useNavigate } from 'react-router-dom';

//TODO: add fontawsome icons to delete and edti buttons

const Details = () => {
    const navigate = useNavigate();
    const { user, isAuthenticated } = useAuthContext();
    const { id } = useParams();
    const [postData, setPostData] = useState({});
    const [isLoading, setIsLodading] = useState(true);
    const [userLikesData, setUserLikesData] = useState({
        hasLiked: false,
        likeId: '',
    });
    const [likes, setLikes] = useState(0);
    const [ confirmSectionClassName, setConfirmSectionClassName ] = useState('hideConfirmSection');

    const heartImg = '/images/heart-img.svg';
    const heartLikedImg = '/images/heart-img-liked.svg';

    useEffect(() => {
        try {
            fetchLikesData();
        } catch (err) {
            console.log(err);
        }
    }, [userLikesData.hasLiked]);

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
            setUserLikesData((oldState) => ({ ...oldState, hasLiked }));

            if (hasLiked) {
                const like = likes.find((l) => l.ownerId == user.id);
                setUserLikesData((oldState) => ({
                    ...oldState,
                    likeId: like.id,
                }));
            }
        });
    }

    function fetchPostData() {
        postService.getById(id).then((res) => {
        setPostData({ ...res.data(), id: res.id });
        setIsLodading(false);
        });
    }

    const likeHandler = async () => {
        try {
            if (!userLikesData.hasLiked) {
                likesService.create({ ownerId: user.id, postId: id });
                setUserLikesData((oldState) => ({
                    ...oldState,
                    hasLiked: true,
                }));
            } else {
                likesService.deleteLike(userLikesData.likeId);
                setUserLikesData((oldState) => ({
                    ...oldState,
                    hasLiked: false,
                }));
            }
        } catch (err) {
            console.log(err);
        }
    };

    const deleteBtnHandler = (ev) => {
        ev.preventDefault();
        setConfirmSectionClassName('confirmSection');
    }

    const yesBtnHandler = async () => {
        try {
           await postService.deletePost(id);
           navigate('/blog');
        } catch (err) {
            console.log(err);
        }
    }

    const noBtnHandler = () => {
        setConfirmSectionClassName('hideConfirmSection')
    }

    const likeSection = (
        <a title={userLikesData.hasLiked ? 'Take like back' : 'Give a like'}>
            <img
                src={userLikesData.hasLiked ? heartLikedImg : heartImg}
                alt="like"
                onClick={likeHandler}
            />
        </a>
    );

    const authorSection = (
        <div>
            <Link to={`/post-edit/${id}`} className={styles['action-link']}>
                Edit
            </Link>
            <a href="" className={styles['action-link']} onClick={deleteBtnHandler}>
                Delete
            </a>
        </div>
    );

    const post = (
        <section className={styles['post-section']}>
            <section className={styles['post-actions-section']}>
                <div className={styles['likes-section']}>
                    <p>Likes: {likes} </p>
                    <div className={styles['heart-img-wrapper']}>
                        {isAuthenticated && !(postData.ownerId == user.id)
                            ? likeSection
                            : null}
                    </div>
                </div>
                <div className={styles['owner-action-section']}>
                    <article className={styles[confirmSectionClassName]}>
                        Are you sure you want to delete this post?
                        <div>
                            <button onClick={yesBtnHandler}>Yes</button>
                            <button onClick={noBtnHandler}>No</button>
                        </div>
                    </article>
                    {postData.ownerId == user.id ? authorSection : null}
                </div>
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
                        Read
                        <a
                            href={postData.source}
                            target="_blank"
                            rel="noreferrer noopener"
                            className={styles['source-link']}
                        >
                            here
                        </a>
                        the full article
                    </p>
                ) : null}
            </article>
        </section>
    );

    return <div>{isLoading ? <Loading /> : post}</div>;
};

export default Details;
