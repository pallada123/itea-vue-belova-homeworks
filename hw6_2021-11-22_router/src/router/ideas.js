import ListOfIdeas from '../views/ListOfIdeas'
import Idea from "../views/Idea";
import MainMenu from "../components/MainMenu";

export default [
    {
        path: '/list-of-ideas',
        name: 'List of Ideas',
        components: {
            default: ListOfIdeas,
            menu: MainMenu
        }
    },
    {
        path: '/list-of-ideas/idea-:id',
        name: 'Idea',
        hidden: true,
        components: {
            default: Idea,
            menu: MainMenu
        }
    }
]