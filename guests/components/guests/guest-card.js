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
    checkedClass() {
      if (this.checked) {
        return 'checked-guest';
      } else {
        return '';
      }
    }
  },
  methods: {
    setArrivedData() {
      this.arriveData.isChecked = !this.checked;
      this.$emit('set-arrive', this.arriveData);
    },
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