const FilterButton = {
    name: 'FilterButton',
    props: ['number', 'statusText', 'state'] ,
    methods: {

        /**
         * передаёт в слушатель события в родительском компоненте срабатывание события
         * "кликнули на кнопку" и противоположное текущему состояние кнопки
         */
        toggleBtnState() {
            this.$emit('toggle-btn', !this.state);
        }
    },
    template: `
    <button type="button" :class="state ? 'btn-active' : ''" v-on:click="toggleBtnState">{{ statusText }} ({{ number }})</button>
  `
}