<script>
export default {
  name: 'LightTheme',
  provide: function() {
    return {
      setBodyClass: this.setBodyClass
    };
  },
  render(h) {
    return this.$slots.default
  },
  methods: {
    setBodyClass() {
      const body = document.body;
      body.classList.remove('dark-theme');
      body.classList.add('light-theme');
      body.style.backgroundColor = '#f5f5f5';
      body.style.color = '#000';
    }
  },
}
</script>

<style scoped>
.light-theme,
.light-theme * {

  --text-size-small: 14px;
  --text-color-error: #af0f23;

  --link-color: #639599;

  --btn-bgcolor: #85c6cc;
  --btn-color: #fff;

  --btn-visual-bgcolor: #fff;
  --btn-visual-border: #85c6cc;
  --btn-visual-color: #000;

  --btn-hover-bgcolor: #47bfcb;

  --input-border: #eaeaea;
  --input-color: #808080;
  --input-bgcolor: #fff;
  --input-task-bgcolor: #f5f5f5;
  --input-border-error: #af0f23;

  --popup-overlay-bgcolor: #000;
  --popup-bgcolor: #fff;

  --task-border: #e5e5e5;
  --task-bgcolor: #fff;
  --task-done-bgcolor: #f5f5f5;
  --task-border-red: red;
  --task-border-yellow: #cccc00;
  --task-border-green: green;


}
</style>