const More = {
    name: 'More',
    props: ['shownGuestsParts', 'shownGuests'],
    data() {
        return {

        }
    },
    methods: {


    },
    template: `
    <div v-if="shownGuestsParts.length < shownGuests.length" id="more-box">
        
        <button type="button" v-on:click="$emit('add-more')">More</button>
        <button type="button" v-on:click="$emit('show-all')">Show All</button>
    </div>
  `
}
//