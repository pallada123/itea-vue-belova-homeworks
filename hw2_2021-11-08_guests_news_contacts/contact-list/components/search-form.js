const SearchForm = {
    name: 'SearchForm',
    props: ['number'],
    data() {
        return {
            searchText: '',
        }
    },
    watch: {

        /**
         * наблюдает за состоянием инпута. при изменении состояния
         * передаёт в слушатель события в родительском компоненте новое значение value
         */
        searchText() {
            this.$emit('search-text', this.searchText);
        },
    },
    template: `
    <div id="search-form">
        Search: <input type="text" v-model="searchText" /> <span v-show="searchText !== ''">({{ number }})</span>
    </div>
  `
}