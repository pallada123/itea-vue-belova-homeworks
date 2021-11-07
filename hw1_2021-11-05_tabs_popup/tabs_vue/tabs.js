const app = new Vue({
    el: '#app',
    data: {
        btnsContainer: 'bg-btns',
        idBgContainer: {
            id: 'bg-container'
        },

        bgColors: [
            {
                btnName: 'Lilac',
                colorClass: 'lilac'
            },
            {
                btnName: 'Green',
                colorClass: 'green'
            },
            {
                btnName: 'Yellow',
                colorClass: 'yellow'
            }
        ],
        bgContainerClass: 'lilac',
        btnActiveClass: 'btn-active',

        writers: [
            {
                surName: 'Austen',
                books: [
                    'Sense and Sensibility',
                    'Pride and Prejudice',
                    'Mansfield Park',
                    'Emma',
                    'Northanger Abbey',
                    'Persuasion'
                ]
            },
            {
                surName: 'Dickens',
                books: [
                    'The Pickwick Papers',
                    'Oliver Twist',
                    'Nicholas Nickleby',
                    'A Christmas Carol',
                    'Dombey and Son',
                    'David Copperfield'
                ]
            },
            {
                surName: 'Shakespeare',
                books: [
                    'Antony and Cleopatra',
                    'Hamlet',
                    'King Lear',
                    'Macbeth',
                    'Othello',
                    'Romeo and Juliet'
                ]
            },
        ],
        tabListClass: 'tab-list',
        tabActiveClass: 'tab-active',
        writerIndex: '0'
    }

});