<script>
export default {
  name: 'DefaultTheme',
  provide: {
    formStyles: {
      bgInput: '#fff',
      borderInput: '#cdcdcd',
      bgButton: '#efefef',
      borderButton: '#3b3b3b',
      labelColor: '#2c3e50'
    }
  },
  render(h) {
    return this.$slots.default
  }
}
</script>
