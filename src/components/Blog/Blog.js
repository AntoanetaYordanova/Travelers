import { useEffect } from "react";
import { useState } from "react";
import * as postService from '../../services/postService';

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

    return ( 
        <h1>Blog page</h1>
    )
}

export default Blog;