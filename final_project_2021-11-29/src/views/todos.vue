<template>
  <div>

    <action-button @btn-click="logOut">Log Out</action-button>

    <h1 v-if="ActiveUser">{{ActiveUser.userNickname}}'s To Do List</h1>
    <div id="nav">
      <router-link to="/todos-completed">Completed tasks</router-link>
    </div>

    <div v-if="isAdding">

      <edit-form
          :task="blankTask"
          @cancel-editing="cancelAdding"
          @save-task="saveTask"
      />
    </div>
    <div class="add-task-btn" v-else>
      <action-button @btn-click="isAdding = !isAdding">Add Task</action-button>
    </div>

    <task-wrap
        :to-do-list="UserToDoListUncompleted"
    />
  </div>
</template>

<script>

const blankTask = {
  taskId: null,
  taskName: '',
  taskDescription: '',
  taskImgUrl: '',
  taskCreationDate: '',
  taskStatus: '',
  isEdited: false,
  isDone: false
};


import {mapState} from 'vuex';
import {GET_ACTIVE_USER, GET_USER_TODO_LIST, UPDATE_TODO_LIST, CHANGE_ACTIVE_USER} from "../types/actions";
import EditForm from "../components/task/EditForm";
import TaskWrap from "../components/task/TaskWrap";
import ActionButton from "../components/common/ActionButton";

export default {
  name: "Todos",

  data() {
    return {
      blankTask: Object.assign({}, blankTask),
      isAdding: false

    }
  },

  components: {
    TaskWrap,
    ActionButton,
    EditForm
  },

  computed: {
    ...mapState('todo/', {
      UserToDoList: state => state.UserToDoList,
      ActiveUser: state => state.ActiveUser,
      UserToDoListUncompleted: state => {
        return state.UserToDoList.filter(task => !task.isDone)
      }
    })
  },

  /**
   * Не для тестирования: инициирует запрос из Local Storage ID активного пользователя
   * @returns {Promise<void>}
   */
  async beforeCreate() {
    await this.$store.dispatch(`todo/${GET_ACTIVE_USER}`);
    if (!this.ActiveUser) {
      this.$router.push('/');
    } else {

      await this.$store.dispatch(`todo/${GET_USER_TODO_LIST}`);
    }
  },

  methods: {

    /**
     * отмена добавления таски - скрытие формы добавления
     */
    cancelAdding() {
      this.isAdding = false;
      this.blankTask = Object.assign({}, blankTask);
    },

    /**
     * сообщает родительскому компоненту о необходимости обновить юзера, потому что изменился его список тасок (одна таска добавилась)
     * @param newTask
     */
    saveTask(newTask) {
      this.isAdding = false;
      newTask.taskId = this.getNewTaskId();
      newTask.taskCreationDate = this.getCurrentDate();
      this.UserToDoList.push(newTask);
      this.blankTask = Object.assign({}, blankTask);
      this.$store.dispatch(`todo/${UPDATE_TODO_LIST}`, this.UserToDoList);
    },

    /**
     *
     * @returns {string} - текущие дата и временя в нужном формате
     */
    getCurrentDate() {
      let d = new Date();
      return `${d.getFullYear()}-${("0"+(d.getMonth()+1)).slice(-2)}-${("0" + d.getDate()).slice(-2)}, ${("0" + d.getHours()).slice(-2)}:${("0" + d.getMinutes()).slice(-2)}`;
    },

    /**
     * вычисление ID добавляемой таски
     * @returns {number}
     */
    getNewTaskId() {
      if (!this.UserToDoList.length) {
        return 1;
      }
      let existingIds = this.UserToDoList.map(item => item.taskId);
      return Math.max.apply(Math.max, existingIds) + 1;
    },

    /**
     * вылогинивание текущего юзера
     */
    async logOut() {
      await this.$store.dispatch(`todo/${CHANGE_ACTIVE_USER}`, 0);
      this.$router.push('/');
    },
  }
}
</script>

<style scoped>
.add-task-btn {
  margin-bottom: 0;
  text-align: right;
}
.task-style-btn {
  margin-bottom: 20px;
  text-align: right;
}
</style>