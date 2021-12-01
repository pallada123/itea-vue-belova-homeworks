<template>
  <div class="home">
{{ ActiveUserId }}
  </div>
</template>

<script>

import {mapState} from 'vuex';
import {PUSH_TEST_STORAGE, GET_ACTIVE_USER_ID} from "../types/actions";


export default {
  name: 'Home',
  components: {

  },

  computed: {
    ...mapState('todo/', {
      ActiveUserId: state => state.ActiveUserId
    })
  },


  async beforeCreate() {
    await this.$store.dispatch(`todo/${PUSH_TEST_STORAGE}`);
    this.$store.dispatch(`todo/${GET_ACTIVE_USER_ID}`);
  },
}
</script>
