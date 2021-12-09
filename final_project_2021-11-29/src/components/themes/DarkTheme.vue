<script>
export default {
  name: 'DarkTheme',
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
      body.classList.remove('light-theme');
      body.classList.add('dark-theme');
      body.style.backgroundColor = '#6a6f73';
      body.style.color = '#bbb';
    }
  },
}
</script>

<style scoped>
.dark-theme,
.dark-theme *{

  --text-size-small: 14px;
  --text-color-error: #e91e63;

  --link-color: #3c3f41;

  --btn-bgcolor: #3c3f41;
  --btn-color: #afb1b3;

  --btn-visual-bgcolor: #81888c;
  --btn-visual-border: #3c3f41;
  --btn-visual-color: #3c3f41;

  --btn-hover-bgcolor: #47bfcb;

  --input-border: #323232;
  --input-color: #bbb;
  --input-bgcolor: #45484a;
  --input-task-bgcolor: #3c3f41;
  --input-border-error: #e91e63;

  --popup-overlay-bgcolor: #fff;
  --popup-bgcolor: #2b2b2b;

  --task-border: #323232;
  --task-bgcolor: #525659;
  --task-done-bgcolor: #f5f5f5;
  --task-border-red: #e91e63;
  --task-border-yellow: #cccc00;
  --task-border-green: #00c853;
}
</style>
