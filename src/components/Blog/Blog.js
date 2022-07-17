import { useEffect } from "react";
import { useState } from "react";
import * as postService from '../../services/postService';
import styles from './Blog.module.css';
import { Link } from "react-router-dom";

const Blog = () => {
    const [posts, setPosts] = useState([]);
    useEffect(() => {
        try {
            postService.getAll()
            .then (res => {
               const data = res.docs.map(doc => ({...doc.data(), id : doc.id}));
               setPosts(data);
            });
        } catch (err) {
            console.log(err);
        }
    }, [])

    const shortenContent = (content) => {
        const short = content.slice(0, 700);
        return `${short}...`
    }

    const mappedPosts = posts.map(e => ({...e, content : shortenContent(e.content)}));
    console.log(mappedPosts);

    const content = mappedPosts.map(e => {
        return (
            <section key={e.id} className={styles['post-section']}>
                <div className={styles['img-wrapper']}>
                    <img src={e.imageUrl} alt={`${e.destination}-img`} />
                </div>
                <article className={styles['content-section']}>
                    <h2>{e.title}</h2>
                    <p>{e.content}</p>
                    <Link to={`/post-details/${e.id}`}>Read the post</Link>
                </article>
            </section>
        )
    })

    

    return ( 
        <>
           {content}
        </>
    )
}

export default Blog;