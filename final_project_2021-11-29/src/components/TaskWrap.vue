<template>
  <div>
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

    <div id="task-wrap" v-if="userData.length" :class="taskStyle ? '' : 'task-wrap-grid'">

      <task
        v-for="task in userData"
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
import {GET_ACTIVE_USER_ID} from "../types/actions";
import Task from './Task.vue';
import EditForm from "./EditForm";
import ActionButton from "./FormElements/ActionButton";

export default {
  name: "TaskWrap",

  data() {
    return {
      blankTask: Object.assign({}, blankTask),
      userData: Object.assign({}, this.UserToDoList),
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
      UserToDoList: state => state.UserToDoList
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
 beforeCreate() {
    this.$store.dispatch(`todo/${GET_ACTIVE_USER_ID}`);

  },

  methods: {

    /**
     * сообщает родительскому компоненту о необходимости обновить юзера, потому что изменился его список тасок (одна таска изменилась)
     * @param task
     */
    updateTask(task) {
      let updatedTaskIndex = this.userData.findIndex(item => item.taskId === task.taskId);
      this.userData.splice(updatedTaskIndex, 1, task);
      this.$emit('change-user');
    },

    /**
     * сообщает родительскому компоненту о необходимости обновить юзера, потому что изменился его список тасок (одна таска удалилась)
     * @param task
     */
    deleteTask(task) {
      let deleteTaskIndex = this.userData.findIndex(item => item.taskId === task.taskId);
      this.userData.splice(deleteTaskIndex, 1);
      this.$emit('change-user');
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
      this.userData.push(newTask);
      this.blankTask = Object.assign({}, blankTask);
      this.$emit('change-user');
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
      if (!this.userData.length) {
        return 1;
      }
      let existingIds = this.userData.map(item => item.taskId);
      return Math.max.apply(Math.max, existingIds) + 1;
    }
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