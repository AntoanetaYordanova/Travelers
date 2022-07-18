import Loading from '../Loading/Loading';
import { useParams } from 'react-router-dom';
import * as postService from '../../services/postService';
import { useEffect, useState } from 'react';
import styles from './Details.module.css';

const Details = () => {
    const { id } = useParams();
    const [postData, setPostData] = useState({});
    const [isLoading, setIsLodading] = useState(false);

    useEffect(() => {
        try {
            setIsLodading(true);
            postService.getById(id).then((res) => {
                setPostData({ ...res.data(), id: res.id });
                setIsLodading(false);
            });
        } catch (err) {
            console.log(err);
        }
    }, []);

    const post = (
        <section className={styles['post-section']}>
            <div className={styles['img-wrapper']}>
                <img src={postData.imageUrl} alt={`${postData.destination}-img`} />
            </div>
            <article>
                <h2>{postData.title}</h2>
                <p>{postData.content}</p>
                <h5>Author: {postData.creator}</h5>
                {postData.source ? <p>Read <a href={postData.source} target='_blank' rel="noreferrer noopener">here</a> the full article</p> : null}
            </article>
        </section>
    );

    return <div>{isLoading ? <Loading /> : post}</div>;
};

export default Details;
