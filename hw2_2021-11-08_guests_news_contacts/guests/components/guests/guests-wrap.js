const GuestsWrap = {
  name: 'GuestsWrap',
  components: {
    GuestCard,
    FilterWrap,
    More
  },
  props: {
    title: {
      type: String,
      default: 'Guests list'
    }
  },
  data() {
    return {
      guests: guestsList,
      shownGuests: guestsList,
      page: 1,
      guestsDataName: Object.keys(guestsList[0]),
      arrivedGuests: [],
      searchValue: ''
    }
  },
  computed: {
    numberArrived() {
      return this.arrivedGuests.length;
    },
    numberNonArrived() {
      return this.guests.length - this.arrivedGuests.length;
    },
    shownGuestsNumber() {
      return this.shownGuests.length;
    },
    shownGuestsParts() {

      return this.shownGuests.slice(0, this.page*10);
    }
  },
  template: `
    <div class="container">
          <h1>{{title}}</h1>
          <filter-wrap 
            :number-arrived="numberArrived" 
            :number-non-arrived="numberNonArrived" 
            :number-shown="shownGuestsNumber"
            @set-filters="setFilteredGuests" 
            />
          <table>
          <tr>
              <th></th>
              <th v-for="(item, i) in guestsDataName" :key="i">{{ item }}</th>
          </tr>
              <guest-card
                  v-for="guest in shownGuestsParts"
                  :key="guest['_id']"
                  :guest="guest" 
                  :arrived="arrivedGuests.includes(guest['_id'])"
                  :search="searchValue"
                  @set-arrive="setArrive" 
                />
          </table>
          <more
           :shown-guests-parts="shownGuestsParts"
           :shown-guests="shownGuests"
           @add-more="addMore"
           @show-all="showAll"
           />
    </div>
  `,
  methods: {

    /**
     * меняет наполнение массива arrivedGuests (элемент массива - ID чекнутого гостя)
     * @param event - объект гостя, в котором произошло событие изменения чекбокса "прибыл"
     *
     */
    setArrive(event) {
      if (event.isChecked) {
        this.arrivedGuests.push(event.id);
      } else {
        this.arrivedGuests.splice(this.arrivedGuests.indexOf(event.id), 1)
      }
    },

    /**
     * фильтрует гостей, из "всех гостей" делая массив гостей, которых надо показывать
     * 1. проверяет значение каждого ключа полученного объекта
     * 2. в зависимости от комбинации ключей переписывает массив shownGuests
     * (список гостей, который сейчас нужно показывать)
     * 3. переписывает значение переменной searchValue
     * 4. сбрасывает значение переменной  page
     * (количество десятков гостей, которые сейчас выводятся)
     * @param filters - изменённый объект filters с состояниями каждого из трёх фильтров
     * (нажата или нет кнопка прибывших, нажата или нет кнопка неприбывших, value инпута поиска
     */
    setFilteredGuests(filters) {

      let guests = this.guests;

      switch (true) {
        case filters.stateArrivedBtn && filters.stateNonArrivedBtn:
          guests = this.guests;
          break;
        case !filters.stateArrivedBtn && !filters.stateNonArrivedBtn:
          guests = [];
          break;
        case !filters.stateArrivedBtn && filters.stateNonArrivedBtn:
          guests = this.guests.filter( (item) => !this.arrivedGuests.includes(item._id));
          break;
        case filters.stateArrivedBtn && !filters.stateNonArrivedBtn:
          guests = this.guests.filter( (item) => this.arrivedGuests.includes(item._id));
          break;
        default:
          guests = this.guests;
      }

      this.searchValue = filters.searchText;

      if (guests.length > 0 && filters.searchText) {


        guests = guests.filter( (item) => {

          let keys = Object.keys(item);

          for (let key of keys) {
            if (String(item[key]).toLowerCase().indexOf(filters.searchText.toLowerCase()) !== -1) {
              return true;
            }
          }
          return false;
        });
      }

      this.shownGuests = guests;
      this.page = 1;
    },

    /**
     * инкрементирует значение переменной page (количество десятков гостей, которые сейчас выводятся)
     */
    addMore() {
      this.page++;
    },

    /**
     * устанавливает значение переменной  page (количество десятков гостей,
     * которые сейчас выводятся) на число, безусловно превышающее
     * возможное количество страниц результатов поиска - чтобы показать всех.
     */
    showAll() {
      this.page = this.shownGuests.length;
    }

  }
}