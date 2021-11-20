<template>
<div>
  <h2>Slider</h2>

  <div id="slider">

    <button type="button" class="slider-btn slider-btn-prev" @click="prevImg"></button>
    <button type="button" class="slider-btn slider-btn-next" @click="nextImg"></button>
    <div id="slider-container">
      <transition-group name="slider">
        <img v-for="(item, i) in list" :key="i" :src="item" v-show="imgId === i" alt="">
      </transition-group>
    </div>

  </div>
</div>
</template>

<script>
export default {
  name: "Slider",
  data() {
    return {
      list: [
          'https://icatcare.org/app/uploads/2018/07/Thinking-of-getting-a-cat.png',
          'https://www.rochesterfirst.com/wp-content/uploads/sites/66/2019/09/cat.jpg',
          'https://i.guim.co.uk/img/media/7a633730f5f90db3c12f6efc954a2d5b475c3d4a/0_138_5544_3327/master/5544.jpg?width=1200&quality=85&auto=format&fit=max&s=c01573da1b2f409140ce82ebf360073f',
          'https://images2.minutemediacdn.com/image/upload/c_crop,h_1193,w_2121,x_0,y_64/f_auto,q_auto,w_1100/v1565279671/shape/mentalfloss/578211-gettyimages-542930526.jpg',
          'https://www.thetimes.co.uk/imageserver/image/%2Fmethode%2Ftimes%2Fprod%2Fweb%2Fbin%2Fc3836660-7846-11eb-80c3-8cc375faed89.jpg?crop=5729%2C3222%2C187%2C805&resize=1200'
      ],
      imgId: 0
    }
  },
  methods: {
    prevImg() {
      if (this.imgId === 0) {
        this.imgId = this.list.length - 1;
      } else {
        this.imgId--;
      }

    },
    nextImg() {
      if (this.imgId === this.list.length - 1) {
        this.imgId = 0;
      } else {
        this.imgId++;
      }
    }
  },
}
</script>

<style scoped>
.slider-enter-active, .slider-leave-active {
  transition: opacity .5s;
}
.slider-enter, .slider-leave-to {
  opacity: 0;
}



#slider {
  position: relative;
  margin: 0 auto;
  width: 800px;
  box-sizing: border-box;
  padding: 0 100px;
}
.slider-btn {
  display: block;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 40px;
  height: 40px;
  border-radius: 999px;
  background-color: #cdcdcd;
  color: #000000;
  line-height: 40px;
  font-size: 20px;
  font-weight: bold;
  cursor: pointer;
  border: none;
  outline: none;
  text-align: center;
}
.slider-btn-prev {left: 0;}
.slider-btn-next {right: 0;}
.slider-btn::before {
  display: inline;
}
.slider-btn-prev::before {content: '<';}
.slider-btn-next::before {content: '>';}

#slider-container {
  width: auto;
  height: 300px;
  overflow: hidden;
}
#slider-container img {
  display: block;
  position: absolute;
  height: 100%;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  border: solid 1px #cdcdcd;
  border-radius: 20px;
}
</style>