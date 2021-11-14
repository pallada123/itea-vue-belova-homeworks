const NewsWrap = {
    name: 'NewsWrap',
    components: {
        NewsCard
    },
    props: {
        title: {
            type: String,
            default: 'News list'
        },
        newsList: {
            type: Array,
            required: true
        },
        loading: {
            type: Boolean,
            required: true
        }
    },
    template: `
    <div class="container">
        <h1>{{ title }}</h1>
        <div v-if="loading" class="loading">
          Loading...
        </div>
        <div v-else>
            <news-card
                v-for="newsData in newsList"
                :key="newsData['id']"
                :news-data="newsData"  
              />
        </div>
    </div>
  `
}