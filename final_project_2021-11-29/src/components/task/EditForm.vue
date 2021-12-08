<template>

    <div class="edit-form">
      <div class="edit-item">
        <label>Task name *</label><input-text :class="requiredError ? 'input-error' : ''" v-bind:input.sync="editingTask.taskName" />
        <error-msg v-show="requiredError">{{ errorMsg }}</error-msg>
      </div>
      <div class="edit-item">
        <label>Task Description</label><input-text v-bind:input.sync="editingTask.taskDescription" />
      </div>
      <div class="edit-item">
        <label>Task Image URL (.png or .jpg only)</label><input-text :class="imgError ? 'input-error' : ''" v-bind:input.sync="editingTask.taskImgUrl" />
        <error-msg v-show="imgError">{{ errorImgMsg }}</error-msg>
      </div>
      <div class="edit-btns">
        <action-button @btn-click="saveTask">Save</action-button>
        <action-button @btn-click="cancelEditing">Cancel</action-button>
      </div>



    </div>

</template>

<script>
import InputText from "../common/InputText";
import ActionButton from "../common/ActionButton";
import ErrorMsg from "../login/ErrorMsg";

export default {
  name: "EditForm",
  components: {ErrorMsg, ActionButton, InputText},

  props: {
    task: {
      type: Object
    }
  },

  data() {
    return {
      editingTask: Object.assign({}, this.task),
      requiredError: false,
      errorMsg: 'This field is required.',
      imgError: false,
      errorImgMsg: 'Incorrect image file extension.'
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
      this.imgError = false;

      this.requiredError = !this.editingTask.taskName;

      if(this.editingTask.taskImgUrl && !this.checkImg(this.editingTask.taskImgUrl)) {
        this.imgError = true;
      }

      if (this.imgError || this.requiredError) {
        return;
      }

      this.$emit('save-task', this.editingTask);
    },

    /**
     * проверка расширения изображения
     * @param url - введённый в инпут URL изображения
     * @returns {boolean} - true, если расширение подходит, false -есть нет
     */
    checkImg(url) {

      if (url.indexOf('?') !== -1) {
        url = url.slice(0, url.indexOf('?'));
      }
      if (url.indexOf('#') !== -1) {
        url = url.slice(0, url.indexOf('#'));
      }
      let ext = url.slice(-4);

      if (ext !== '.jpg' && ext !== '.png') {
        return false;
      }
      return true;

    }
  }


}
</script>

<style scoped>
.edit-form {
  margin-bottom: 20px;
  width: 100%;



  transition: all .35s ease-in-out;}
.task-item .edit-form {margin-bottom: 0;}
.edit-item {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
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

/*.edit-enter-active, .edit-leave-active {*/
/*  transition: all .5s;*/
/*}*/
/*.edit-enter, .edit-leave-to {*/
/*  opacity: 0;*/
/*  left: 200px;*/
/*}*/
</style>