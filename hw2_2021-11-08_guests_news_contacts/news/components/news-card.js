const NewsCard = {
    name: 'NewsCard',
    props: {
        newsData: {
            type: Object,
            required: true
        }
    },
    template: `
    <div style="margin-bottom: 20px;">
        <div style="font-weight: bold;">{{ newsData.title }}</div>
        <div>{{ newsData.body }}</div>
    </div>
  `
}