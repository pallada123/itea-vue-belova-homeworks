const CreateForm = {
    name: 'CreateForm',
    data() {
        return {
            contactItem: {
                firstName: '',
                lastName: '',
                phone: '',
                img: ''
            },
            errorMsg: 'Please fill in at least one field',
            showForm: false,
            showError: false
        }

    },

    methods: {

        /**
         * заполняет поля шаблоного объекта контакта даными нового контакта,
         * отправляет в родительский компонент копию заполненного шаблонного объекта,
         * очищает шаблонный объект контакта
         */
        fillData() {

            if (this.contactItem.firstName === '' && this.contactItem.lastName === '' && this.contactItem.phone === '' && this.contactItem.img === '') {
                this.showError = true;
                return;
            }

            this.showError = false;

            this.$emit('add-contact', Object.assign({}, this.contactItem));

            this.contactItem.firstName = '';
            this.contactItem.lastName = '';
            this.contactItem.phone = '';
            this.contactItem.img = '';
        },

    },
    template: `
    <div id="create-form">
        <button type="button" v-on:click="showForm = !showForm">{{ showForm ? 'Hide Form' : 'Add New Contact' }}</button>
        <div v-show="showForm">
            <label>First Name</label> <input v-model="contactItem.firstName" type="text" /><br>
            <label>Last Name</label> <input v-model="contactItem.lastName" type="text" /><br>
            <label>Phone</label> <input v-model="contactItem.phone" type="text" /><br>
            <label>Image URL</label> <input v-model="contactItem.img" type="text" /><br>
            <button type="button" @click="fillData">Add Contact</button>
        </div>
        <p v-show="showError">{{ errorMsg }}</p>
    </div>
  `
}