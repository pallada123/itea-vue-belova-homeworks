<template>
  <div id="nav">

    <span class="nav-item" v-for="item in menuItems.filter((it) => !it.hidden)">

      <span v-if="item.name" :key="item.name">
        <router-link :to="item.path">{{ item.name }}</router-link>
      </span>

    </span>

  </div>

</template>

<script>
export default {
  name: "MainMenu",
  props: {
    menuItems: {
      type: Array,
      required: true
    },
  }
}
</script>

<style scoped>

#nav {
  padding: 30px;
}
.nav-item {display: inline-block}

.nav-item span {
  display: inline-block;
  position: relative;
  margin-right: 20px;
}

.nav-item span::before {
  position: absolute;
  display: block;
  content: '|';
  top: 1px;
  right: -10px;
}

#nav .nav-item:last-child span {
  margin-right: 0;
}
#nav .nav-item:last-child span::before {display: none;}

.nav-item a {
  font-weight: bold;
  color: #2c3e50;
}

.nav-item a.router-link-exact-active {
  color: #42b983;
}

</style>