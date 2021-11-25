import Posts from '../views/Posts';
import User from "../views/User";
import Post from "../views/Post";
import MainMenu from "../components/MainMenu";

export default [
    {
        path: '/posts',
        name: 'Posts',
        show: true,
        components: {
            default: Posts,
            menu: MainMenu
        },
        children: [
            {
                path: '/post-:id',
                name: 'Post',
                components: {
                    default: Post,
                    menu: MainMenu
                }
            }
        ]
    },
    {
        path: '/posts/user-:id',
        name: 'User',
        show: false,
        components: {
            default: User,
            menu: MainMenu
        },
        children: [
            {
                path: '/post-:id',
                name: 'UserPost',
                components: {
                    default: Post,
                    menu: MainMenu
                }
            }
        ]
    }
]