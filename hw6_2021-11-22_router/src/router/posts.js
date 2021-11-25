import Posts from '../views/Posts';
import User from "../views/User";
import Post from "../views/Post";
import MainMenu from "../components/MainMenu";

export default [
    {
        path: '/posts',
        name: 'Posts',
        components: {
            default: Posts,
            menu: MainMenu
        },
        children: [
            {
                path: '/posts/post-:postId',
                name: 'Post',
                components: {
                    default: Post,
                    menu: MainMenu
                }
            }
        ]
    },
    {
        path: '/posts/user-:userId',
        name: 'User',
        hidden: true,
        components: {
            default: User,
            menu: MainMenu
        },
        children: [
            {
                path: '/posts/user-:userId/post-:postId',
                name: 'UserPost',
                components: {
                    default: Post,
                    menu: MainMenu
                }
            }
        ]
    }
]