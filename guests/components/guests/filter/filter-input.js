const FilterInput = {
    name: 'FilterInput',
    props: {
        search: String
    },
    data() {
        return {
            searchText: this.search
        }
    },
    watch: {
        searchText() {
            this.$emit('search-text', this.searchText);
        }
    },
    mounted() {
        this.$root.$on('clear-filter', () => {
            this.searchText = '';
        })
    },
    template: `
    <input type="text" v-model="searchText" />
  `
}