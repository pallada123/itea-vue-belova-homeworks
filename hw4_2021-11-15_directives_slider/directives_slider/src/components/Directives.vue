<template>
  <div>
    <h1>Custom Directives</h1>
    <h2>Harry Potter and the...</h2>
    <ul>
      <list-item
          v-for="(item, i) in list"
          :key="i"
          v-after-loop="{listLength: list.length, i, callback: test}"
      >
        {{ item }}
      </list-item>
    </ul>

    <h2>Buttons Types</h2>

    <button type="button" class="btn btn_some_class" v-class-builder:color="'orange'" v-class-builder:size="'small'">1</button>
    <button type="button" class="btn" v-class-builder:color="'blue'" v-class-builder:size="'medium'">2</button>
    <button type="button" class="btn btn_another_some_class" v-class-builder:color="'magenta'" v-class-builder:size="'large'">3</button>
    <button type="button" class="btn" v-class-builder:color="'yellow'" v-class-builder:size="'small'">4</button>
    <button type="button" class="btn" v-class-builder:color="'orange'" v-class-builder:size="'medium'">5</button>
    <button type="button" class="btn" v-class-builder:color="'blue'" v-class-builder:size="'large'">6</button>
    <button type="button" class="btn" v-class-builder:color="'magenta'" v-class-builder:size="'small'">7</button>

  </div>
</template>

<script>
import afterLoop from './Directives/AfterLoop'
import classBuilder from './Directives/ClassBuilder'
import ListItem from "./ListItem";


export default {
  name: 'Directives',
  components: {
    ListItem
  },
  directives: {
    afterLoop,
    classBuilder
  },
  data() {
    return {
      list: [
        'Philosopher\'s Stone',
        'Chamber of Secrets',
        'Prisoner of Azkaban',
        'Goblet of Fire',
        'Order of the Phoenix',
        'Half-Blood Prince',
        'Deathly Hallows'
      ]
    }
  },
  methods: {
    test(tag, parent) {
      const newItem = document.createElement(tag);
      newItem.innerText = 'The End';
      newItem.style.color = 'green';
      parent.append(newItem);
    }
  },
}
</script>

<style scoped>
.btn, .btn:active, .btn:visited, .btn:focus, .btn:link, .btn:hover,
button.btn, button.btn:active, button.btn:visited, button.btn:focus, button.btn:link, button.btn:hover{
  display: inline-block;
  cursor: pointer;
  box-sizing: border-box;
  min-width: 100px;
  color: #fff;
  font-weight: bold;
  text-align: center;
  border-radius: 7px;
  background-clip: padding-box;
  -webkit-transition: all 0.2s linear;
  -o-transition: all 0.2s linear;
  transition: all 0.2s linear;
  border: none;
  margin: 0 10px 20px;
  vertical-align: bottom;
}
.btn:hover{
  -webkit-transform:scale(1.1);
  -ms-transform:scale(1.1);
  transform:scale(1.1);
}
/* size */
.btn_size_small, .btn_size_small:hover {
  height: 30px;
  line-height: 30px;
  padding: 0 13px;
  font-size: 16px;
}
.btn_size_medium, .btn_size_medium:hover {
  height: 44px;
  line-height: 44px;
  padding: 0 30px;
  font-size: 19px;
}
.btn_size_large, .btn_size_large:hover {
  height: 58px;
  line-height: 58px;
  padding: 0 42px;
  font-size: 24px;
}

/* color */
.btn_color_orange, .btn_color_orange:hover {
  background-color: #ff8f32;
  -webkit-box-shadow: 0 6px 0 #cc7228;
  box-shadow: 0 6px 0 #cc7228;
}
.btn_color_blue, .btn_color_blue:hover {
  background-color: #2cb9ef;
  -webkit-box-shadow: 0 6px 0 #2394bf;
  box-shadow: 0 6px 0 #2394bf;
}
.btn_color_magenta, .btn_color_magenta:hover {
  background-color: #fd33c3;
  -moz-box-shadow: 0 6px 0 #ca299c;
  -webkit-box-shadow: 0 6px 0 #ca299c;
  box-shadow: 0 6px 0 #ca299c;
}
.btn_color_yellow, .btn_color_yellow:hover {
  background-color: #f6d300;
  -moz-box-shadow: 0 6px 0 #c5a900;
  -webkit-box-shadow: 0 6px 0 #c5a900;
  box-shadow: 0 6px 0 #c5a900;
  color: #000 !important;
}
</style>
