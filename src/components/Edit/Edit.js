import * as postService from '../../services/postService';
import { useAuthContext } from '../../contexts/authContext';
import { useState } from 'react';
import { useEffect } from 'react';
import styles from './Edit.module.css';
import { useParams } from 'react-router-dom';
import Loading from '../Loading/Loading';

const Edit = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [showMsg, setShowMsg] = useState(false);

    useEffect(() => {
        if (showMsg) {
            setTimeout(() => {
                setShowMsg(false);
            }, 3000);
        }
    }, [showMsg]);

    const { user } = useAuthContext();
    const imageUrlRegEx = /^https?:\/\//;

    const [inputValues, setInputValues] = useState({
        title: '',
        destination: '',
        content: '',
        image: '',
    });

    const { id } = useParams();

    useEffect(() => {
        postService
            .getById(id)
            .then((res) => {
                const postData = res.data();
                setInputValues({ ...postData, image: postData.imageUrl });
                setIsLoading(false);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [showMsg]);

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

    const editPostHandler = async (ev) => {
        ev.preventDefault();

        titleValidator();
        contentValidator();
        destinationValidator();
        imageValidator();

        if (!hasErrors()) {
            try {
                const newPostData = {
                    title: inputValues.title,
                    content: inputValues.content,
                    destination: inputValues.destination,
                    imageUrl: inputValues.image,
                    ownerId: user.id,
                    creator: user.email,
                };
                await postService.update(id, newPostData);
                setShowMsg(!showMsg);
            } catch (err) {
                console.log(err);
            }
        }
    };

    const titleInputOnChange = (ev) => {
        const value = ev.target.value;
        setInputValues((oldState) => ({ ...oldState, title: value }));
    };

    const contentInputOnChange = (ev) => {
        const value = ev.target.value;
        setInputValues((oldState) => ({ ...oldState, content: value }));
    };

    const destinationInputOnChange = (ev) => {
        const value = ev.target.value;
        setInputValues((oldState) => ({ ...oldState, destination: value }));
    };

    const imageInputOnChange = (ev) => {
        const value = ev.target.value;
        setInputValues((oldState) => ({ ...oldState, image: value }));
    };

    const titleValidator = () => {
        const title = inputValues.title;
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

    const contentValidator = () => {
        const content = inputValues.content;
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

    const destinationValidator = () => {
        const destination = inputValues.destination;
        if (destination == '') {
            setErrors((oldState) => {
                return {
                    ...oldState,
                    destination: {
                        message: 'Destination is required',
                        valid: false,
                    },
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

    const imageValidator = () => {
        const imageUrl = inputValues.image;
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
        <>
            {isLoading ? (
                <Loading />
            ) : (
                <>
                    <h4
                        className={
                            showMsg
                                ? styles['confirmation-msg']
                                : styles['hide-msg']
                        }
                    >
                        Post edited
                    </h4>
                    <section className={styles['form-wrapper']}>
                        <form
                            method="POST"
                            onSubmit={editPostHandler}
                            className={styles['form-style']}
                        >
                            <h3>Edit Post</h3>
                            <div>
                                <input
                                    type="text"
                                    name="title"
                                    placeholder="Title"
                                    value={inputValues.title}
                                    onChange={titleInputOnChange}
                                    id="title"
                                    onBlur={titleValidator}
                                    className={
                                        !errors.title.valid
                                            ? styles['error-input']
                                            : ''
                                    }
                                />
                                <p
                                    className={
                                        !errors.title.valid
                                            ? styles.error
                                            : styles.hidden
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
                                    value={inputValues.content}
                                    onChange={contentInputOnChange}
                                    id="content"
                                    rows="10"
                                    onBlur={contentValidator}
                                    className={
                                        !errors.content.valid
                                            ? styles['error-input']
                                            : ''
                                    }
                                />
                                <p
                                    className={
                                        !errors.content.valid
                                            ? styles.error
                                            : styles.hidden
                                    }
                                >
                                    {errors.content.message}
                                </p>
                            </div>
                            <div>
                                <input
                                    type="text"
                                    name="destination"
                                    placeholder="Destination country"
                                    value={inputValues.destination}
                                    onChange={destinationInputOnChange}
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
                                    value={inputValues.image}
                                    onChange={imageInputOnChange}
                                    onBlur={imageValidator}
                                    className={
                                        !errors.image.valid
                                            ? styles['error-input']
                                            : ''
                                    }
                                />
                                <p
                                    className={
                                        !errors.image.valid
                                            ? styles.error
                                            : styles.hidden
                                    }
                                >
                                    {errors.image.message}
                                </p>
                            </div>
                            <button className={styles['post-form-button']}>
                                Edit
                            </button>
                        </form>
                    </section>
                </>
            )}
        </>
    );
};

export default Edit;
