const ContactCard = {
    name: 'ContactCard',
    props: {
        contact: {
            type: Object,
            required: true
        }
    },
    template: `
    <tr>
        <td><img width="100" :src="contact.img" v-if="contact.img"><span v-else>No Avatar</span></td>
        <td>{{ contact.firstName }}</td>
        <td>{{ contact.lastName }}</td>
        <td>{{ contact.phone }}</td>
        <td><button type="button" @click="$emit('delete-contact', contact.id)">Delete Contact</button></td>
    </tr>
  `
}