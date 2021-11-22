<template>
  <div>
    <h2>Set-Watch & Provide-Inject</h2>

    <component :is="theme">

    <set-watch-form
        :filters="filters"
        :extra-keys="extraKeys"
        :sum="sum"
        @show-more="addKeys"
        @reset-data="resetData" />
    </component>
    <p v-show="sum">Was changed: {{ sum }}</p>

    <button type="button" @click="theme === 'DefaultTheme' ? theme = 'ColoredTheme' : theme = 'DefaultTheme'">Switch Theme</button>

  </div>
</template>

<script>


import SetWatchForm from "./setWatch/SetWatchForm";
import DefaultTheme from "./provideInjection/DefaultTheme";
import ColoredTheme from "./provideInjection/ColoredTheme";

const defaultFormData = {
  model: 'The best model',
  type: 'The worst type'
}

export default {
  name: 'SetWatchProvideInjection',
  components: {
    SetWatchForm,
    DefaultTheme,
    ColoredTheme
  },

  data() {
    return {
      filters: Object.assign({}, defaultFormData),
      extraKeys: false,
      sum: 0,
      theme: 'DefaultTheme'
    }
  },

  watch: {
    filters: {

      /**
       * при изменении объекта фильтров пересчитывает кол-во изменённых полей
       * @param val
       */
      handler(val) {
        this.sum = Object.keys(val).reduce((curr, item) => {
          if (!defaultFormData[item] && val[item] || defaultFormData[item] && defaultFormData[item] != val[item]) {
            curr++;
          }
          return curr;
        }, 0);
      },
      deep: true
    }
  },

  methods: {

    /**
     * добавляет ключи в объект фильтров, прячет кнопку "more"
     */
    addKeys() {
      this.$set(this.filters, 'color', '');
      this.$set(this.filters, 'size', '');
      this.$set(this.filters, 'number', '');
      this.extraKeys = true;
    },

    /**
     * сбрасывает значения на дефолтные, прячет пустые инпуты, обнуляет калькулятор изменённых полей
     */
    resetData() {
      this.filters = Object.assign({}, defaultFormData);
      this.extraKeys = false;
      this.sum = 0;
    }
  }
}
</script>

<style scoped>

</style>