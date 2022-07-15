import { db } from "../config/firebaseConfig";
import { collection, getDocs, addDoc, updateDoc, doc, deleteDoc } from "firebase/firestore";

const postCollection = collection(db, 'post');

const getAll = async () => {
    return await getDocs(postCollection);
}

const create = async (data) => {
    return addDoc(postCollection, data);
}

const update = async (id, data) => {
    const currentPostRef = doc(db, 'post', id);
    return updateDoc(currentPostRef, data);
}

const deletePost = async (id) => {
    const currentPostRef = doc(db, 'post', id);
    deletePost(currentPostRef);
}

export {
    getAll,
    create,
    update,
    deletePost
}