<template>
  <div id="nav-btns">
    <a @click.prevent="goPrev">&#8592; prev</a>
    <a @click.prevent="goNext">next &#8594;</a>
  </div>
</template>

<script>
export default {
  name: 'PrevNextNav',
  methods: {

    /**
     * задаёт, на сколько шагов в истории браузера вернётся юзер при кликем на кнопку "prev"
     */
    goNext() {
      this.$router.go(1)
    },

    /**
     * задаёт, на сколько шагов в истории браузера пройдёт вперёд юзер при кликем на кнопку "next"
     */
    goPrev() {
      this.$router.go(-1)
    }
  },
}
</script>

<style scoped>
#nav-btns {
  text-align: center;
  margin: 0 0 40px 0;
}
#nav-btns a,
#nav-btns a:hover {
  display: inline-block;
  margin: 0 10px;
  cursor: pointer;
  text-decoration: underline;
}
#nav-btns a:hover {text-decoration: none;}
</style>