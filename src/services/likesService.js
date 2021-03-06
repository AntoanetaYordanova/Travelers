import { db } from "../config/firebaseConfig";
import { collection, getDocs, addDoc, doc, deleteDoc, query, where } from "firebase/firestore";

const likesCollection = collection(db, 'likes');

const create = (data) => {
    return addDoc(likesCollection, data);
}

const deleteLike = (id) => {
    const currentLikeRef = doc(db, 'likes', id);
    deleteDoc(currentLikeRef);
}

const getPostLikes = (id) => {
    const myQuery = query(likesCollection, where('postId', '==', id));
    return getDocs(myQuery);
}

const getUsersLikes = (id) => {
    const myQuery = query(likesCollection, where('ownerId', '==', id));
    return getDocs(myQuery);
}

export {
    create,
    deleteLike,
    getPostLikes,
    getUsersLikes
}