<template>
  <div>
    <filters
      :to-do-list="setPagesFullList()"
      :filters="filters"
      @clear-filters="clearFilters"
    />

    <div class="task-style-btn">
      <action-button :class="'btn-visual'" @btn-click="taskStyle = !taskStyle">{{ 'Show ' + (taskStyle ? 'grid' : 'list') }}</action-button>
    </div>

    <div id="task-wrap" :class="taskStyle ? '' : 'task-wrap-grid'">

      <transition-group name="tasks">

        <task
            v-for="task in setPagesFilteredList()"
            :key="task.taskId"
            :task="task"
            @task-change="updateTask"
            @task-delete="deleteTask"
        />

      </transition-group>
    </div>
  </div>
</template>

<script>

const blankFilters = {
  stateBtnRed: true,
  stateBtnYellow: true,
  stateBtnGreen: true,
  stateBtnBlank: true,
  searchText: ''
}

import Task from '@/components/task/Task';
import Filters from '@/components/task/Filters';
import ActionButton from "@/components/common/ActionButton";
import {mapState, mapGetters} from 'vuex';
import {UPDATE_HISTORY, UPDATE_TODO_LIST} from "../../types/actions";

export default {
  name: "TaskWrap",
  components: {
    Task,
    ActionButton,
    Filters
  },

  computed: {
    ...mapState('todo/', {
      UserToDoList: state => state.UserToDoList,
      ActiveUser: state => state.ActiveUser,
    }),
    ...mapGetters([
      'getCurrentDate'
    ])
  },

  data() {
    return {
      taskStyle: true, // true - list, false - grid
      filters: Object.assign({}, blankFilters)
    }
  },

  methods: {

    updateTask(task) {
      let updatedTaskIndex = this.UserToDoList.findIndex(item => item.taskId === task.taskId);
      this.UserToDoList.splice(updatedTaskIndex, 1, task);
      this.$store.dispatch(`todo/${UPDATE_TODO_LIST}`, this.UserToDoList);
    },

    deleteTask(task) {
      let deleteTaskIndex = this.UserToDoList.findIndex(item => item.taskId === task.taskId);
      this.UserToDoList.splice(deleteTaskIndex, 1);
      this.$store.dispatch(`todo/${UPDATE_TODO_LIST}`, this.UserToDoList);
      this.$store.dispatch(`history/${UPDATE_HISTORY}`, {
        type: 'task',
        user: this.ActiveUser.userNickname,
        date: this.$store.getters.getCurrentDate,
        action: 'delete',
        task: task.taskName});
    },

    setPagesFullList() {
      if (this.$route.path === '/todos') {
        return this.UserToDoList.filter(task => !task.isDone);
      }

      if (this.$route.path === '/todos-completed') {
        return this.UserToDoList.filter(task => task.isDone);
      }
    },

    setPagesFilteredList() {

      return this.setPagesFullList().filter(task => {

        if (!this.filters.stateBtnRed && task.taskStatus === 'red') return false;
        if (!this.filters.stateBtnYellow && task.taskStatus === 'yellow') return false;
        if (!this.filters.stateBtnGreen && task.taskStatus === 'green') return false;
        if (!this.filters.stateBtnBlank && task.taskStatus === '') return false;

        if (this.filters.searchText) {
          let {taskName, taskDescription} = task;

          return taskName.toLowerCase().indexOf(this.filters.searchText.toLowerCase()) !== -1 ||
              taskDescription.toLowerCase().indexOf(this.filters.searchText.toLowerCase()) !== -1;
        }

        return true;

      }).reverse();
    },

    clearFilters() {
      this.filters = Object.assign({}, blankFilters);
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

.tasks-enter {
  transform: scale(0.5) translatey(-80px);
  opacity:0;
}

.tasks-leave-to{
  transform: translatey(30px);
  opacity:0;
}

.tasks-leave-active {
  position: absolute;
  z-index:-1;
}
</style>