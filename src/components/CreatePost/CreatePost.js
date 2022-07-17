import * as postService from '../../services/postService';
import { useAuthContext } from '../../contexts/authContext';
import { useState } from 'react';
import styles from './CreatePost.module.css';

const CreatePost = () => {
    const { user } = useAuthContext();
    const imageUrlRegEx = /^https?:\/\//;

    const errorsInitialState = {
        title: {
            mesage: '',
            valid: true,
        },
        content: {
            mesage: '',
            valid: true,
        },
        destination: {
            mesage: '',
            valid: true,
        },
        image: {
            mesage: '',
            valid: true,
        },
    };
    const [errors, setErrors] = useState(errorsInitialState);

    const createPostHandler = async (ev) => {
        ev.preventDefault();
        const { title, content, destination, image } = Object.fromEntries(
            new FormData(ev.currentTarget)
        );

        titleValidator(null, title);
        contentValidator(null, content);
        destinationValidator(null, destination);
        imageValidator(null, image);

        if(!hasErrors()) {
            try {
                await postService.create({
                    title,
                    content,
                    destination,
                    imageUrl: image,
                    owner: user.id,
                });
            } catch (err) {
                console.log(err);
            }
        }
        
    };

    const titleValidator = (ev, inputTitle) => {
        const title = ev ? ev.target.value : inputTitle;
        if (title == '') {
            setErrors((oldState) => {
                return {
                    ...oldState,
                    title: { message: 'Title is required', valid: false },
                };
            });
        } else {
            setErrors((oldState) => {
                return { ...oldState, title: { message: '', valid: true } };
            });
        }
    };

    const contentValidator = (ev, inputContent) => {
        const content = ev ? ev.target.value : inputContent;
        if (content == '') {
            setErrors((oldState) => {
                return {
                    ...oldState,
                    content: { message: 'Content is required', valid: false },
                };
            });
        } else {
            setErrors((oldState) => {
                return { ...oldState, content: { message: '', valid: true } };
            });
        }
    };

    const destinationValidator = (ev, destinationInput) => {
        const destination = ev ? ev.target.value : destinationInput;
        if (destination == '') {
            setErrors((oldState) => {
                return {
                    ...oldState,
                    destination: { message: 'Title is required', valid: false },
                };
            });
        } else {
            setErrors((oldState) => {
                return {
                    ...oldState,
                    destination: { message: '', valid: true },
                };
            });
        }
    };

    const imageValidator = (ev, imageInput) => {
        const imageUrl = ev ? ev.target.value : imageInput;
        if (imageUrl == '') {
            setErrors((oldState) => {
                return {
                    ...oldState,
                    image: { message: 'Image url is required', valid: false },
                };
            });
        } else if (!imageUrlRegEx.test(imageUrl)) {
            setErrors((oldState) => {
                return {
                    ...oldState,
                    image: {
                        message: 'Please enter a valid url',
                        valid: false,
                    },
                };
            });
        } else {
            setErrors((oldState) => {
                return {
                    ...oldState,
                    image: { message: '', valid: true },
                };
            });
        }
    };

    function hasErrors() {
        if (
            errors.title.valid &&
            errors.content.valid &&
            errors.destination.valid &&
            errors.image.valid
        ) {
            return false;
        }

        return true;
    }

    return (
        <section className={styles['form-wrapper']}>
            <form
                method="POST"
                onSubmit={createPostHandler}
                className={styles['form-style']}
            >
                <h3>Create Post</h3>
                <div>
                    <input
                        type="text"
                        name="title"
                        placeholder="Title"
                        id="title"
                        onBlur={titleValidator}
                        className={
                            !errors.title.valid ? styles['error-input'] : ''
                        }
                    />
                    <p
                        className={
                            !errors.title.valid ? styles.error : styles.hidden
                        }
                    >
                        {errors.title.message}
                    </p>
                </div>
                <div>
                    <textarea
                        type=""
                        name="content"
                        placeholder="Content"
                        id="content"
                        rows="10"
                        onBlur={contentValidator}
                        className={
                            !errors.content.valid ? styles['error-input'] : ''
                        }
                    />
                    <p
                        className={
                            !errors.content.valid ? styles.error : styles.hidden
                        }
                    >
                        {errors.content.message}
                    </p>
                </div>
                <div>
                    <input
                        type="text"
                        name="destination"
                        placeholder="Destination"
                        id="destination"
                        onBlur={destinationValidator}
                        className={
                            !errors.destination.valid
                                ? styles['error-input']
                                : ''
                        }
                    />
                    <p
                        className={
                            !errors.destination.valid
                                ? styles.error
                                : styles.hidden
                        }
                    >
                        {errors.destination.message}
                    </p>
                </div>
                <div>
                    <input
                        type="text"
                        name="image"
                        id="image"
                        placeholder="Image url"
                        onBlur={imageValidator}
                        className={!errors.image.valid ? styles['error-input'] : ''}
                    />
                    <p
                        className={
                            !errors.image.valid ? styles.error : styles.hidden
                        }
                    >
                        {errors.image.message}
                    </p>
                </div>
                <button className={styles['post-form-button']}>Create</button>
            </form>
        </section>
    );
};

export default CreatePost;
