import * as postService from '../../services/postService';
import { useAuthContext } from '../../contexts/authContext';

const CreatePost = () => {
    const { user } = useAuthContext();
    const createPostHandler = async(ev) => {
        ev.preventDefault();
        const { title, content, destinantion } = Object.fromEntries(new FormData(ev.currentTarget));
        const res = await postService.create({title, content, destinantion, owner : user.id});
        console.log(res);
    }

    return (
        <>
            <form method="POST" onSubmit={createPostHandler}>
                <input type="text" name="title" placeholder="title" />
                <input type="text" name="content" placeholder="content" />
                <input type="text" name="destinantion" placeholder="destinantion" />
                <button>Create</button>
            </form>
        </>
    );
};

export default CreatePost;
