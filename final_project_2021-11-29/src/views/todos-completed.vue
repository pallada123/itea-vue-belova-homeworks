<template>
  <div>
    <action-button @btn-click="logOut">Log Out</action-button>

    <h1 v-if="ActiveUser">{{ActiveUser.userNickname}}'s Completed Tasks</h1>
    <div id="nav">
      <router-link to="/todos">Uncompleted tasks</router-link>
    </div>

    <task-wrap
        :to-do-list="UserToDoListCompleted"
    />
  </div>
</template>

<script>

import {mapState} from 'vuex';
import {GET_ACTIVE_USER, GET_USER_TODO_LIST, CHANGE_ACTIVE_USER} from "../types/actions";
import ActionButton from "../components/common/ActionButton";
import TaskWrap from "../components/task/TaskWrap";
import EditForm from "../components/task/EditForm";

export default {
  name: "Todos-completed",

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
      UserToDoListCompleted: state => {
        return state.UserToDoList.filter(task => task.isDone)
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