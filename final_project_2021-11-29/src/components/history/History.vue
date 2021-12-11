<template>
  <div class="history-container">
    <h2>History</h2>

    <div v-if="history.length">
      <p v-for="(item, index) in history" :key="index" class="history-item">
        <span class="history-date">{{ item.date }}</span><br>
        User <span class="history-user sup-tooltip">{{ item.user }}<sup>id: {{ item.userId }}</sup></span> {{ getActionText(item) }}<span v-if="item.type === 'task'"> task <span class="history-title sup-tooltip">{{ '"' + item.task + '"'}}<sup>id: {{ item.taskId }}</sup></span></span>.
      </p>
    </div>

    <div v-else>The history is empty yet.</div>
  </div>


</template>

<script>
import {mapState} from "vuex";
import {GET_HISTORY} from "../../types/actions";

export default {
  name: "History",

  computed: {
    ...mapState('history/', {
      history: state => state.History.reverse()
    })

  },

  /**
   * инициирует получение в стор список записей истории
   */
  async beforeCreate() {
    await this.$store.dispatch(`history/${GET_HISTORY}`);
  },

  methods: {

    /**
     * Подставляет соответствующую формулировку под вывод каждого действия в истории.
     * @param item - одна запись истории
     * @returns {string}
     */
    getActionText(item) {
      let text;

      switch (item.action) {

        case 'reg':
          text = 'signed up';
          break;

        case 'add':
          text = 'created new';
          break;

        case 'delete':
          text = 'removed';
          break;

        case 'update':
          text = 'updated';
          break;

        case 'done':
          text = 'completed';
          break;

        case 'undone':
          text = 'decided he or she hadn\'t complete';
          break;

        case 'red':
          text = 'set status \"Red\" in';
          break;

        case 'yellow':
          text = 'set status \"Yellow\" in';
          break;

        case 'green':
          text = 'set status \"Green\" in';
          break;

        case 'default':
          text = 'cleared status in';
          break;
      }

      return text;
    }
  },


}
</script>

<style scoped>
.history-container h2 {
  text-align: center;
  margin-bottom: 30px;
}
.history-item {
  margin: 0 0 15px 0;
  padding: 0;
}
.history-date {}
.history-user {font-weight: bold;}
.history-title {font-style: italic;}
.history-item .sup-tooltip {display: inline-block; position: relative; border-bottom: dashed 1px var(--input-color);}
.history-item .sup-tooltip sup {
  display: none;
  position: absolute;
  top: -25px;
  right: 0;
  background-color: var(--task-border);
  font-style: normal;
  font-weight: normal;
  padding: 5px;
  border-radius: 3px;
}
.history-item .sup-tooltip:hover sup {display: block;}

</style>