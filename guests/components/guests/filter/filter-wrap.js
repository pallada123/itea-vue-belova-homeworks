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
          }
      }
    },
    computed: {
        btnTextChecked() {
            return 'Arrived Guests (' + this.numberArrived +')';
        },
        btnTextNonChecked() {
            return 'Non Arrived Guests (' + this.numberNonArrived +')'
        },
        arrivedNumber () {
            return this.shownGuestsNumber;
        },

    },

    methods: {
        toggleArrivedBtn(stateArrivedBtn) {
            this.filters.stateArrivedBtn = stateArrivedBtn;
            this.$emit('set-filters', this.filters);
        },
        toggleNonArrivedBtn(stateNonArrivedBtn) {
            this.filters.stateNonArrivedBtn = stateNonArrivedBtn;
            this.$emit('set-filters', this.filters);
        },
        setSearchText(value) {
            this.filters.searchText = value;
            this.$emit('set-filters', this.filters);
        },
        clearFilters() {
            this.filters.stateArrivedBtn = true;
            this.filters.stateNonArrivedBtn = true;
            this.filters.searchText = '';
            this.$root.$emit('clear-filter');
            this.$emit('set-filters', this.filters);
        }

    },
    template: `
    <div>
        <filter-button :status="btnTextChecked" v-on:toggle-btn="toggleArrivedBtn"></filter-button>
        <filter-button :status="btnTextNonChecked" v-on:toggle-btn="toggleNonArrivedBtn"></filter-button>
        <filter-input v-on:search-text="setSearchText" :search="filters.searchText"></filter-input>
        <span>({{ numberShown }})</span>
        <button type="button" v-on:click="clearFilters">Clear Filters</button>
    </div>
  `
}