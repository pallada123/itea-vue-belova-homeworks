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

        /**
         * наБлюдает за состоянием инпута. при изменении состояния
         * передаёт в слушатель события в родительском компоненте новое значение value
         */
        searchText() {
            this.$emit('search-text', this.searchText);
        },

        /**
         * наблюдает за состоянем пропса search (текст поискового запроса).
         * при изменении значения на пустую строку (когда нажали кнопку "сбросить фильтры") - очищает инпут
         */
        search() {
            if (this.search === '') {
                this.searchText = this.search;
            }
        }
    },
    template: `
    <input type="text" v-model="searchText" />
  `
}