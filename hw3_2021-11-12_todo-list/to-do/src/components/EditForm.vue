<template>

  <div class="edit-form">
    <div class="edit-item">
      <label>Task name</label><input-text v-bind:input.sync="editingTask.taskName" />
    </div>
    <div class="edit-item">
      <label>Task Description</label><input-text v-bind:input.sync="editingTask.taskDescription" />
    </div>
    <div class="edit-item">
      <label>Task Image URL</label><input-text v-bind:input.sync="editingTask.taskImgUrl" />
    </div>
    <div class="edit-btns">
      <action-button @btn-click="saveTask">Save</action-button>
      <action-button @btn-click="cancelEditing">Cancel</action-button>
    </div>

    <p class="error" v-show="showError">{{ errorMsg }}</p>


  </div>

</template>

<script>
import InputText from "./FormElements/InputText";
import ActionButton from "./FormElements/ActionButton";
export default {
  name: "EditForm",
  components: {ActionButton, InputText},

  props: {
    task: {
      type: Object
    }
  },

  data() {
    return {
      editingTask: Object.assign({}, this.task),
      showError: false,
      errorMsg: 'Please fill in at least one field',
    }
  },

  methods: {

    /**
     * по надатию кнопки "Cancel" передаёт родительскому компоненту событие отмены редактирования
     */
    cancelEditing() {

      this.$emit('cancel-editing');
    },

    /**
     * по нажатию кнопки "Save" проверяет, есть ли хоть одно непустое поле.
     * если все поля пустые, передаёт true (показываться) элементу с соответствующим error message.
     * если хотя бы одно поле непустое, передаёт родительскому компоненту событие сохранения и объект изменённой таски
     */
    saveTask() {

      if (this.editingTask.taskName === '' && this.editingTask.taskDescription === '' && this.editingTask.taskImgUrl === '') {
        this.showError = true;
        return;
      }

      this.showError = false;

      this.$emit('save-task', this.editingTask);
    },
  }


}
</script>

<style scoped>
.edit-form {margin-bottom: 20px; width: 100%;}
.task-item .edit-form {margin-bottom: 0;}
.edit-item {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  margin-bottom: 10px;
}
.edit-item label {width: 150px;}

.edit-item input[type='text'] {
  -webkit-box-flex: 1;
  -ms-flex-positive: 1;
  flex-grow: 1;
  width: calc(100% - 150px);
}

.edit-btns {text-align: right;}
.edit-form .error {padding: 0; margin: 10px 0; color: brown; text-align: center;}
</style>