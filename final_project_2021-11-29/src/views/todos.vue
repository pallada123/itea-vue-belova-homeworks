<template>
  <div>

    <div v-if="ActiveUser">

      <action-button @btn-click="logOut">Log Out</action-button>

      <h1>{{ActiveUser.userNickname}}'s To Do List</h1>

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

    <unauthorized v-else />

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
import {SET_USER_TODO_LIST} from "../types/mutations";
import EditForm from "../components/task/EditForm";
import TaskWrap from "../components/task/TaskWrap";
import ActionButton from "../components/common/ActionButton";
import Unauthorized from "../components/task/Unauthorized";

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
    EditForm,
    Unauthorized
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
   * Инициирует получение активного пользователя и (если он есть) списка его задач в сторе.
   * @returns {Promise<void>}
   */
  async beforeCreate() {
    await this.$store.dispatch(`todo/${GET_ACTIVE_USER}`);
    if (this.ActiveUser) {
      await this.$store.dispatch(`todo/${GET_USER_TODO_LIST}`);
    }
  },

  methods: {

    /**
     * Отмена добавления новой задачи.
     */
    cancelAdding() {
      this.isAdding = false;
      this.blankTask = Object.assign({}, blankTask);
    },

    /**
     * СОхранение добавленной задачи:
     * Добавление новой задачи в массив задач активного пользователя.
     * Инициация изменений в сторе списка задач и истории.
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
        userId: this.ActiveUser.userId,
        date: this.$store.getters.getCurrentDate,
        action: 'add',
        task: newTask.taskName,
        taskId: newTask.taskId
      });
    },

    /**
     * Вычисление ID добавляемой зазачи.
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
     * Инициирует обнуление активного пользователя в сторе и мутацию в сторе state UserToDoList на пустой массив.
     * Редирект на главную страницу.
     * @returns {Promise<void>}
     */
    async logOut() {
      await this.$store.dispatch(`todo/${CHANGE_ACTIVE_USER}`, 0);
      this.$store.commit(`todo/${SET_USER_TODO_LIST}`, []);
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