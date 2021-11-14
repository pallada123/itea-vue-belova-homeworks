const app = new Vue({
    el: '#app',
    components: {
        NewsWrap
    },
    data: {
        loading: true,
        newsList: []
    },

    created: function () {

        /**
         * откладывает вызов функции получения списка новостей, чтобы какое-то время был виден прогрессор
         */
        setTimeout(this.fetchNews, 2000);
    },
    watch: {
        '$route': 'fetchNews'
    },
    methods: {

        /**
         * получает список новостей
         * переписывает значение переменной loading (показывать или нет прогрессор)
         * и заполняет массив newsList полученным списокм новостей
         */
        fetchNews () {
            let data = fetch('https://jsonplaceholder.typicode.com/posts');
            data.then(async res => {
                const result = await res.json();
                if (res.status !== 200) {
                    throw new Error('Code: ' + res.status);
                }
                this.newsList = result;
                this.loading = false;
            })
        }
    }
})