import { db } from "../config/firebaseConfig";
import { collection, getDocs, addDoc, updateDoc, doc, deleteDoc, getDoc, query, where } from "firebase/firestore";

const postCollection = collection(db, 'post');

const getAll = async () => {
    return await getDocs(postCollection);
}

const getById = async (id) => {
    const currentPost = doc(db, 'post', id);
    return getDoc(currentPost);
}

const getByCounty = async (country) => {
   const myQuery = query(postCollection, where('destination', 'in', 'Morocco'));
   return getDocs(myQuery);
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
    deleteDoc(currentPostRef);
}

export {
    getAll,
    getById,
    create,
    update,
    deletePost,
    getByCounty
}