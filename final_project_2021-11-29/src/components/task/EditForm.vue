<template>

    <div class="edit-form">
      <div class="edit-item">
        <label>Task name *</label><input-text :class="{'input-error': requiredError}" v-bind:input.sync="editingTask.taskName" />
        <error-msg v-show="requiredError">{{ errorMsg }}</error-msg>
      </div>
      <div class="edit-item">
        <label>Task Description</label><input-text v-bind:input.sync="editingTask.taskDescription" />
      </div>
      <div class="edit-item">
        <label>Task Image URL (.png or .jpg only)</label><input-text :class="{'input-error': imgError}" v-bind:input.sync="editingTask.taskImgUrl" />
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
     *
     */
    cancelEditing() {

      this.$emit('cancel-editing');
    },

    /**
     *
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
     *
     * @param url
     * @returns {boolean}
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

@media only screen and (max-width: 610px) {
  .edit-btns {text-align: center;}
}
</style>