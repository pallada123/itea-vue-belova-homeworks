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

    setArrive(event) {
      if (event.isChecked) {
        this.arrivedGuests.push(event.id);
      } else {
        this.arrivedGuests.splice(this.arrivedGuests.indexOf(event.id), 1)
      }
    },


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

      if (guests.length > 0 && filters.searchText) {

        this.searchValue = filters.searchText;

        guests = guests.filter( (item) => {

          let keys = Object.keys(item);

          for (let key of keys) {
            if (String(item[key]).indexOf(filters.searchText) !== -1) {
              return true;
            }
          }
          return false;
        });
      }

      this.shownGuests = guests;
      this.page = 1;
    },

    addMore() {
      this.page++;
    },

    showAll() {
      this.page = this.shownGuests.length;
    }

  }
}