<template>
<h1>Todos-completed</h1>
</template>

<script>

import {mapState} from 'vuex';
import {GET_ACTIVE_USER} from "../types/actions";

export default {
  name: "Todos-completed",
  components: {

  },

  computed: {
    ...mapState('todo/', {
      ActiveUserId: state => state.ActiveUserId
    })
  },

  /**
   * Не для тестирования: инициирует запрос из Local Storage ID активного пользователя
   * @returns {Promise<void>}
   */
  beforeCreate() {
    this.$store.dispatch(`todo/${GET_ACTIVE_USER}`);
  },
}
</script>

<style scoped>

</style>