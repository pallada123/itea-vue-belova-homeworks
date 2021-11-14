const FilterButton = {
    name: 'FilterButton',
    props: {
        status
    },
    data() {
        return {
            state: true
        }

    },
    methods: {
        toggleBtnState() {
            this.state = !this.state;
            this.$emit('toggle-btn', this.state);
        }
    },
    template: `
    <button type="button" :class="state ? 'btn-active' : ''" v-on:click="toggleBtnState">{{ status }}</button>
  `
}