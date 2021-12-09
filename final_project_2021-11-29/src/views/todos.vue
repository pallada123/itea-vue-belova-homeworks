<template>
  <div>

    <action-button @btn-click="logOut">Log Out</action-button>

    <h1 v-if="ActiveUser">{{ActiveUser.userNickname}}'s To Do List</h1>

    <div id="nav">
      <router-link to="/todos-completed">Completed tasks</router-link>
    </div>

    <transition name="task" v-if="isAdding">

      <edit-form
          :task="blankTask"
          @cancel-editing="cancelAdding"
          @save-task="saveTask"
      />

    </transition>

    <transition name="task" v-else>

      <div class="add-task-btn">
        <action-button @btn-click="isAdding = !isAdding">Add Task</action-button>
      </div>

    </transition>

    <task-wrap />
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


import {mapState, mapGetters} from 'vuex';
import {
  GET_ACTIVE_USER,
  GET_USER_TODO_LIST,
  UPDATE_TODO_LIST,
  CHANGE_ACTIVE_USER,
  UPDATE_HISTORY
} from "../types/actions";
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

  inject: ['setBodyClass'],

  created() {
    this.setBodyClass();
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
      newTask.taskCreationDate = this.$store.getters.getCurrentDate;
      this.UserToDoList.push(newTask);
      this.blankTask = Object.assign({}, blankTask);
      this.$store.dispatch(`todo/${UPDATE_TODO_LIST}`, this.UserToDoList);
      this.$store.dispatch(`history/${UPDATE_HISTORY}`, {
        type: 'task',
        user: this.ActiveUser.userNickname,
        date: this.$store.getters.getCurrentDate,
        action: 'add',
        task: newTask.taskName});
    },

    /**
     *
     * @returns {string} - текущие дата и временя в нужном формате
     */
    // getCurrentDate() {
    //   let d = new Date();
    //   return `${d.getFullYear()}-${("0"+(d.getMonth()+1)).slice(-2)}-${("0" + d.getDate()).slice(-2)}, ${("0" + d.getHours()).slice(-2)}:${("0" + d.getMinutes()).slice(-2)}`;
    // },

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


  transition: all .35s ease-in-out;
}
.task-style-btn {
  margin-bottom: 20px;
  text-align: right;
}

/*.edit-enter-active, .edit-leave-active {*/
/*  transition: opacity 2s*/
/*}*/
/*.edit-enter, .edit-leave-to !* .fade-leave-active below version 2.1.8 *! {*/
/*  opacity: 0*/
/*}*/

.task-enter {
  transform: scale(0.5) translatey(-80px);
  opacity:0;
}

.task-leave-to{
  transform: translatey(30px);
  opacity:0;
}

.task-leave-active {
  position: absolute;
  z-index:-1;
}
</style>