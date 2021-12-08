<template>

  <div class="task-container" :class="{'task-status-red': task.taskStatus === 'red', 'task-status-yellow': task.taskStatus === 'yellow', 'task-status-green': task.taskStatus === 'green'}">

    <div class="task-item" v-if="isEditing">
      <edit-form
          :task="task"
          @cancel-editing="cancelEditing"
          @save-task="saveTask"
      />
    </div>

    <div class="task-item" v-else>

      <div class="task-img">
        <img :src="task.taskImgUrl ? task.taskImgUrl : 'https://upload.wikimedia.org/wikipedia/commons/3/3f/Placeholder_view_vector.svg'" />
      </div>
      <div class="task-txt">
        <p class="task-head">{{ task.taskName }}</p>
        <p class="task-body">{{ task.taskDescription }}</p>

      </div>

      <div class="task-btns">

        <action-button :class="'btn-visual'" @btn-click="showActions = !showActions">{{ (showActions ? 'Hide' : 'Show') + ' actions' }}</action-button>

        <div v-show="showActions">
          <action-button @btn-click="toggleTaskDone">{{ 'Mark ' + (task.isDone ? 'Undone' : 'Done') }}</action-button>
          <action-button @btn-click="setEditing">Edit</action-button>
          <action-button @btn-click="$emit('task-delete', task)">Delete</action-button>
          <br>
          <label>Change status</label>
          <select v-model="task.taskStatus" @change="changeStatus">
            <option value="">No status</option>
            <option value="red">Red</option>
            <option value="yellow">Yellow</option>
            <option value="green">Green</option>
          </select>
        </div>

      </div>

      <div class="task-create-date">Created: {{ task.taskCreationDate }}</div>
      <div class="task-edited" v-if="task.isEdited">Task was edited</div>

    </div>

  </div>
</template>

<script>

import ActionButton from '@/components/common/ActionButton';
import InputText from '@/components/common/InputText';
import EditForm from "@/components/task/EditForm";

export default {
  name: "Task",

  props: {
    task: {
      type: Object
    }
  },

  data() {
    return {
      isEditing: false,
      showActions: false
    }
  },

  components: {
    EditForm,
    InputText,
    ActionButton
  },

  methods: {

    /**
     * переключает статус таски с выполненной на невыполненную и обратно
     */
    toggleTaskDone() {
      this.task.isDone = !this.task.isDone;
      this.$emit('task-change', this.task);
    },

    changeStatus() {
      this.$emit('task-change', this.task);
    },

    /**
     * включает режим редактирования таски
     */
    setEditing() {
      this.isEditing = true;
    },

    /**
     * выключает режим редактирования таски (если нажали отмену)
     */
    cancelEditing() {
      this.isEditing = false;
    },

    /**
     * выключает режим редактирования таски (если нажали сохранить),
     * передаёт в родительский компонент событие "таска изменилась" и объект таски
     * @param editedTask - изменённая таска
     *
     */
    saveTask(editedTask) {
      this.isEditing = false;
      editedTask.isEdited = true;
      this.$emit('task-change', editedTask);
    },

  }
}
</script>

<style scoped>
.task-container {
  background-color: var(--task-bgcolor);
  border: 1px solid var(--task-border);
  border-radius: 10px;
  margin: 0 0 20px 0;
  width: 100%;
  position: relative;


  transition: all .35s ease-in-out;
}
.task-container.task-status-red {
  border-color: var(--task-border-red);
}
.task-container.task-status-yellow {
  border-color: var(--task-border-yellow);
}
.task-container.task-status-green {
  border-color: var(--task-border-green);
}
.task-item {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: start;
  -ms-flex-align: start;
  align-items: flex-start;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
  padding: 20px;
  transition: all .35s ease-in-out;
  width: 100%;
  position: relative;
}

.task-img {width: 200px; margin-right: 20px;}
.task-img img {width: 100%; border-radius: 5px;}
.task-txt {
  -webkit-box-flex: 1;
  -ms-flex-positive: 1;
  flex-grow: 1;
  width: calc(100% - 390px);
}
.task-txt p {padding-bottom: 18px;}
.task-head {font-weight: bold;}
.task-btns {width: 150px; margin-left: 20px; text-align: center;}

.task-btns label {
  display: block;
  margin: 15px 0 5px 0;
}
.task-btns select {

  height: 32px;
  line-height: 32px;
  border: 1px solid var(--input-border);
  border-radius: 10px;
  background-clip: padding-box;
  background-color: var(--input-bgcolor);
  color: var(--input-color);
  font-family: Arial, Helvetica, sans-serif;
  font-size: var(--text-size);
  padding: 0 15px;
  display: inline-block;
  min-width: 1px;
}

.task-create-date,
.task-edited {
  width: 100%;
  text-align: right;
  font-style: italic;
  color: gray;
  font-size: 14px;
}
.task-create-date {padding-top: 10px;}

#task-wrap.task-wrap-grid .task-container {
  width: calc(50% - 10px);
}

#task-wrap.task-wrap-grid .task-img,
#task-wrap.task-wrap-grid .task-btns {
  width: calc(50% - 20px);
}
#task-wrap.task-wrap-grid .task-txt {
  width: 100%;
  -webkit-box-ordinal-group: 3;
  -ms-flex-order: 2;
  order: 2;
  padding-top: 20px;
}
#task-wrap.task-wrap-grid .task-create-date {
  -webkit-box-ordinal-group: 4;
  -ms-flex-order: 3;
  order: 3;
}
#task-wrap.task-wrap-grid .task-edited {
  -webkit-box-ordinal-group: 5;
  -ms-flex-order: 4;
  order: 4;
}
</style>