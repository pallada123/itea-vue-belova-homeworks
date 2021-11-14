const FilterWrap = {
    name: 'FilterWrap',
    components: {
        FilterButton,
        FilterInput
    },
    props: ['numberArrived', 'numberNonArrived', 'numberShown'],
    data() {
      return {
          filters: {
              stateArrivedBtn: true,
              stateNonArrivedBtn: true,
              searchText: ''
          },
          arrivedText: 'Arrived Guests',
          nonArrivedText: 'Non Arrived Guests'
      }
    },

    methods: {

        /**
         * переписывает значение ключа "состояние кнопки "прибывшие"" в объекте filters
         * передаёт в слушатель события в родительском компоненте
         * срабатывание события "фильтры изменились" и  изменённый объект filters
         * с актуальными состояниями фильтров
         * @param stateArrivedBtn - изменившееся после клика состояние кнопки "прибывшие"
         */
        toggleArrivedBtn(stateArrivedBtn) {
            this.filters.stateArrivedBtn = stateArrivedBtn;
            this.$emit('set-filters', this.filters);
        },

        /**
         * переписывает значение ключа "состояние кнопки "неприбывшие"" в объекте filters
         * передаёт в слушатель события в родительском компоненте
         * срабатывание события "фильтры изменились" и  изменённый объект filters
         * с актуальными состояниями фильтров
         * @param stateNonArrivedBtn - изменившееся после клика состояние кнопки "неприбывшие"
         */
        toggleNonArrivedBtn(stateNonArrivedBtn) {
            this.filters.stateNonArrivedBtn = stateNonArrivedBtn;
            this.$emit('set-filters', this.filters);
        },

        /**
         * переписывает значение ключа "поисковый запрос" в объекте filters
         * передаёт в слушатель события в родительском компоненте
         * срабатывание события "фильтры изменились" и изменённый объект filters
         * с актуальными состояниями фильтров
         * @param value - поисковый запрос
         */
        setSearchText(value) {
            this.filters.searchText = value;
            this.$emit('set-filters', this.filters);
        },

        /**
         * переписывает значения всех ключей на дефолтные в объекте filters
         * передаёт в слушатель события в родительском компоненте
         * срабатывание события "фильтры изменились" и изменённый объект filters
         * с актуальными состояниями фильтров
         */
        clearFilters() {
            this.filters.stateArrivedBtn = true;
            this.filters.stateNonArrivedBtn = true;
            this.filters.searchText = '';
            this.$emit('set-filters', this.filters);
        }

    },
    template: `
    <div>
        <filter-button 
            :status-text="arrivedText" 
            :number="numberArrived" 
            :state="filters.stateArrivedBtn"
            v-on:toggle-btn="toggleArrivedBtn"
            />
        <filter-button 
            :status-text="nonArrivedText" 
            :number="numberNonArrived" 
            :state="filters.stateNonArrivedBtn"
            v-on:toggle-btn="toggleNonArrivedBtn"
            />
        <filter-input v-on:search-text="setSearchText" :search="filters.searchText"></filter-input>
        <span>({{ numberShown }})</span>
        <button type="button" v-on:click="clearFilters">Clear Filters</button>
    </div>
  `
}