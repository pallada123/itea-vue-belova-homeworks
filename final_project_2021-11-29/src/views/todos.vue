<template>
  <div>
    <action-button @btn-click="logOut">Log Out</action-button>

      <h1>{{ActiveUser.userLogin}}'s To Do List</h1>
<!--    <h1>Your To Do List</h1>-->

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

    <div class="task-style-btn">
      <action-button @btn-click="taskStyle = !taskStyle">{{ btnCaption }}</action-button>
    </div>

    <div id="task-wrap" v-if="UserToDoList.length" :class="taskStyle ? '' : 'task-wrap-grid'">

      <task
          v-for="task in UserToDoList"
          :key="task.taskId"
          :task="task"
          @task-change="updateTask"
          @task-delete="deleteTask"
      />
    </div>
  </div>
</template>

<script>

const blankTask = {
  taskId: null,
  taskName: '',
  taskDescription: '',
  taskImgUrl: '',
  taskCreationDate: '',
  isEdited: false,
  isDone: false
};


import {mapState} from 'vuex';
import {GET_ACTIVE_USER_ID, GET_USER_TODO_LIST, UPDATE_TODO_LIST, CHANGE_ACTIVE_USER_ID} from "../types/actions";
import Task from '@/components/Task';
import EditForm from "@/components/EditForm";
import ActionButton from "@/components/ActionButton";

export default {
  name: "TaskWrap",

  data() {
    return {
      blankTask: Object.assign({}, blankTask),
      isAdding: false,
      taskStyle: true // true - list, false - grid

    }
  },

  components: {
    ActionButton,
    EditForm,
    Task
  },

  computed: {
    ...mapState('todo/', {
      ActiveUserId: state => state.ActiveUserId,
      UserToDoList: state => state.UserToDoList,
      ActiveUser: state => state.ActiveUser
    }),

    /**
     * @returns {string} - текст кнопки переключения статуса (выполнено или нет) в зависимости от статуса
     */
    btnCaption() {
      return 'Show ' + (this.taskStyle ? 'grid' : 'list');
    }
  },

  /**
   * Не для тестирования: инициирует запрос из Local Storage ID активного пользователя
   * @returns {Promise<void>}
   */
  async beforeCreate() {
    await this.$store.dispatch(`todo/${GET_ACTIVE_USER_ID}`);
    this.$store.dispatch(`todo/${GET_USER_TODO_LIST}`);
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
      await this.$store.dispatch(`todo/${CHANGE_ACTIVE_USER_ID}`, 0);
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