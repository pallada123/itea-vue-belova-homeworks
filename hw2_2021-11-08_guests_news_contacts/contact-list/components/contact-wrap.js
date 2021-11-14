const ContactWrap = {
    name: 'ContactWrap',
    components: {
        ContactCard,
        CreateForm,
        SearchForm
    },
    props: {
        title: {
            type: String,
            default: 'Contact list'
        }
    },
    data() {
        return {
            contacts: [],
            shownContacts: [],
            contactId: 0,
            searchText: '',
            number: null
        }
    },
    watch: {

        /**
         * слушает изменения полного списка контактов (добавление, удаление),
         * переписывает список показываемых контактов с учетем фильтрации
         */
        contacts() {
            this.shownContacts = this.contacts;
            this.filterList(this.searchText);
        },

        /**
         * слушает изменение списка показываемых контактов для получения его длины,
         * переписывает переменную number
         */
        shownContacts() {
            this.number = this.shownContacts.length;
        }
    },
    template: `
    <div class="container">
        <h1>{{title}}</h1>
        
        <create-form
         :contact-id="contactId"
         @add-contact="addContact" 
         />
        
        <search-form 
        v-on:search-text="filterList"
        :number="number"
         />
        
          <table v-show="contacts.length">
          <tr>
              <th>Avatar</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Phone</th>
              <th></th>
          </tr>
        <contact-card 
        v-for="(item, i) in shownContacts"         
        :key="i"
        :contact="item"
        @delete-contact="deleteContact" />
          </table>
        
        
    </div>
  `,
    methods: {

        /**
         * добавляет новый контакт в полный список контактов
         * @param contactItem - объект нового контакта
         */
        addContact(contactItem) {
            contactItem.id = this.contactId++;
            this.contacts.push(contactItem);
        },

        /**
         * удаляет из полного списка контактов контакт по полю id
         * @param id - значение поля id контакта, в котором нажали кнопку "удалить"
         */
        deleteContact(id) {
            let deletedContactIndex = this.contacts.findIndex(item => item.id === id);
            this.contacts.splice(deletedContactIndex, 1);
        },

        /**
         * фильтрует список показываемых контактов по полученному фильтру
         * @param searchText - поисковый запрос
         */
        filterList(searchText) {

            this.searchText = searchText;

            let contacts = this.contacts;

            if (contacts.length > 0 && searchText) {


                contacts = contacts.filter( (item) => {

                    let keys = Object.keys(item);

                    for (let key of keys) {

                        if (String(key) !== 'img' && String(key) !== 'id') {

                            if (String(item[key]).toLowerCase().indexOf(searchText.toLowerCase()) !== -1) {
                                return true;
                            }

                        }

                    }
                    return false;
                });
            }

            this.shownContacts = contacts;
        }

    }

}