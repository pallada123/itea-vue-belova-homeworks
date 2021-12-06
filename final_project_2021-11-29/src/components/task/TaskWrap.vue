<template>
  <div>

    <filters
      :to-do-list="ToDoList"
      @set-filters="setFilters"
    />

    <div class="task-style-btn">
      <action-button :class="'btn-visual'" @btn-click="taskStyle = !taskStyle">{{ btnCaption }}</action-button>
    </div>

    <div id="task-wrap" v-if="filteredList.length" :class="taskStyle ? '' : 'task-wrap-grid'">

      <task
          v-for="task in filteredList"
          :key="task.taskId"
          :task="task"
          @task-change="updateTask"
          @task-delete="deleteTask"
      />
    </div>
  </div>
</template>

<script>
import Task from '@/components/task/Task';
import Filters from '@/components/task/Filters';
import ActionButton from "@/components/common/ActionButton";
import {mapState} from 'vuex';
import {UPDATE_TODO_LIST} from "../../types/actions";

export default {
  name: "TaskWrap",
  props: ['ToDoList'],
  components: {
    Task,
    ActionButton,
    Filters
  },

  computed: {
    ...mapState('todo/', {
      UserToDoList: state => state.UserToDoList
    }),

    // filteredList() {
    //   return this.ToDoList.slice()
    // },

    /**
     * @returns {string} - текст кнопки переключения статуса (выполнено или нет) в зависимости от статуса
     */
    btnCaption() {
      return 'Show ' + (this.taskStyle ? 'grid' : 'list');
    },
  },

  data() {
    return {
      taskStyle: true, // true - list, false - grid
      filteredList: this.ToDoList[1],
    }
  },

  methods: {

    /**
     * сообщает родительскому компоненту о необходимости обновить юзера, потому что изменился его список тасок (одна таска изменилась)
     * @param task
     */
    updateTask(task) {
      let updatedTaskIndex = this.UserToDoList.findIndex(item => item.taskId === task.taskId);
      this.UserToDoList.splice(updatedTaskIndex, 1, task);
      this.$store.dispatch(`todo/${UPDATE_TODO_LIST}`, this.UserToDoList);
    },

    /**
     * сообщает родительскому компоненту о необходимости обновить юзера, потому что изменился его список тасок (одна таска удалилась)
     * @param task
     */
    deleteTask(task) {
      let deleteTaskIndex = this.UserToDoList.findIndex(item => item.taskId === task.taskId);
      this.UserToDoList.splice(deleteTaskIndex, 1);
      this.$store.dispatch(`todo/${UPDATE_TODO_LIST}`, this.UserToDoList);
    },

    setFilters(filters) {
      console.log(filters);
      //this.filteredList = [1, 2, 3]
      //     stateBtnRed: true,
      //     stateBtnYellow: true,
      //     stateBtnGreen: true,
      //     stateBtnBlank: true,
      //     searchText: ''

      // let guests = this.guests;
      //
      // switch (true) {
      //   case filters.stateArrivedBtn && filters.stateNonArrivedBtn:
      //     guests = this.guests;
      //     break;
      //   case !filters.stateArrivedBtn && !filters.stateNonArrivedBtn:
      //     guests = [];
      //     break;
      //   case !filters.stateArrivedBtn && filters.stateNonArrivedBtn:
      //     guests = this.guests.filter( (item) => !this.arrivedGuests.includes(item._id));
      //     break;
      //   case filters.stateArrivedBtn && !filters.stateNonArrivedBtn:
      //     guests = this.guests.filter( (item) => this.arrivedGuests.includes(item._id));
      //     break;
      //   default:
      //     guests = this.guests;
      // }
      //
      // this.searchValue = filters.searchText;
      //
      // if (guests.length > 0 && filters.searchText) {
      //
      //
      //   guests = guests.filter( (item) => {
      //
      //     let keys = Object.keys(item);
      //
      //     for (let key of keys) {
      //       if (String(item[key]).toLowerCase().indexOf(filters.searchText.toLowerCase()) !== -1) {
      //         return true;
      //       }
      //     }
      //     return false;
      //   });
      // }
      //
      // this.shownGuests = guests;
    }
  },
}
</script>

<style scoped>
.task-style-btn {text-align: right; margin-bottom: 10px;}



#task-wrap {
  display: block;
  position: relative;
}
#task-wrap.task-wrap-grid {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: horizontal;
  -webkit-box-direction: normal;
  -ms-flex-direction: row;
  flex-direction: row;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
}
</style>