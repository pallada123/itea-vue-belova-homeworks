const GuestCard = {
  name: 'GuestCard',
  props: {
    guest: {
      type: Object,
      required: true
    },
    arrived: {
      type: Boolean,
      required: true
    },
    search: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      arriveData: {
        id: this.guest._id,
        isChecked: false
      },
      checked: this.arrived
    }

  },
  computed: {

    /**
     * проверяет состояние госта - чекнутый или нет.
     * в зависимости от состояние добавляет или убирает класс "чекнутости" строке гостя (класс зачеркивает текст)
     * @returns {string} - имя класса
     */
    checkedClass() {
      if (this.checked) {
        return 'checked-guest';
      } else {
        return '';
      }
    }
  },

  methods: {

    /**
     * при событии "кликнули в чекбокс гостя" инвертирует состояние гостя (чекнутое/нечекнутое) в объекте arriveData (ID гостя и состояние)
     * передаёт на слушатель события в родительском компоненте срабатывание события и объект arriveData
     */
    setArrivedData() {
      this.arriveData.isChecked = !this.checked;
      this.$emit('set-arrive', this.arriveData);
    },

    /**
     * проверяет наличие символов поискового запроса в принятом через параметр тексте.
     * если поисковый запрос присутствует - оборачивает его в span (в CSS span становится красным) -
     * для подсветки поискового запроса в найденных результатах
     * @param text - значение очередного ключа в объекте гостя
     * @returns {string} - изменённое или не изменённое значение полученного ключа для отрисовки на странице
     */
    setBoldSearchedText(text) {
      let stringText = String(text);
      if (this.search === '' || stringText.indexOf(this.search) === -1) {
        return stringText;
      }
      let search = this.search.replace(/([()\[{*+.$^\\|?\]])/g, '\\$1');
      let reg = new RegExp('(' + search + ')', 'g');
      return stringText.replace(reg, '<span>$1</span>');
    }
  },
  template: `
    <tr :class="checkedClass">
        <td><input type="checkbox" v-model="checked" v-on:click="setArrivedData"></td>
        <td v-for="(item, i) in guest" :key="i" v-html="setBoldSearchedText(item)"></td>
    </tr>
  `
}