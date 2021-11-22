<script>
export default {
  name: 'ColoredTheme',
  provide: {
    formStyles: {
      bgInput: '#b977b1',
      borderInput: '#8175b5',
      bgButton: '#ca299c',
      borderButton: '#8a2be2',
      labelColor: '#8a2be2'
    }
  },
  render(h) {
    return this.$slots.default
  }
}
</script>
