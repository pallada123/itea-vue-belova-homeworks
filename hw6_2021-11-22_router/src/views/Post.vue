<template>
  <div id="popup">

    <div id="popup-overlay" @click="goPrev"></div>
    <div id="popup-item">

      <div id="popup-content">

        <div v-if="!(isLoadedSinglePost && isLoadedUser)">Loading...</div>

        <div v-else>
          <p class="post-title">{{ SinglePost.title }}</p>
          <p>{{ SinglePost.body }}</p>

          <router-link :to="{name: 'User', params: { userId: User.id }}">{{ User.username }}</router-link>
        </div>

      </div>

      <button type="button" class="popup-close" @click="goPrev"></button>

    </div>


  </div>
</template>

<script>
import {actions, getters} from "../store";

export default {
  name: "Post",

  computed: {
    ...getters
  },

  /**
   * отложенно (чтобы this уже был) вызывает метод получения одного поста из хока
   */
  beforeCreate() {
    const vm = this
    setTimeout(() => {
      vm.getSinglePost(this.$route.params.postId)
    }, 200)
  },

  methods: {

    /**
     * принимает методы из хока
     */
    ...actions,

    /**
     * определяет, на сколько шагов назад по истории браузера вернуться по клику -
     * чтобы при закрытии попапа с постом крестиком или кликом на оверлей мы возвращались на предыдущую страницу -
     * то есть пользователь просто закрывает попап и видит страницу, поверх которой попап отрисовывался.
     */
    goPrev() {
      this.$router.go(-1);
      this.clearSinglePost();
    }


  }
}
</script>

<style scoped>
#popup-overlay {
  background-color: #000;
  opacity: .3;
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
}
#popup-item {
  background-color: #fff;
  -webkit-box-shadow: 10px 17px 30px rgba(26,23,20,.35);
  box-shadow: 10px 17px 30px rgba(26,23,20,.35);
  width: 400px;
  min-height: 400px;
  max-width: 90vw;
  max-height: 90vh;
  position: fixed;
  top: 50%;
  left: 50%;
  -webkit-transform: translateX(-50%) translateY(-50%);
  -ms-transform: translateX(-50%) translateY(-50%);
  transform: translateX(-50%) translateY(-50%);
  border-radius: 20px;
}

button.popup-close {
  border: solid 1px #000;
  border-radius: 999px;
  color: #000;
  min-width: auto;
  text-align: center;
  height: 30px;
  width: 30px;
  line-height: normal;
  font-weight: bold;
  background: transparent url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij4KICAgIDxnIGlkPSJjbG9zZSI+CiAgICAgICAgPHBhdGggaWQ9IngiIGQ9Ik0xOC43MTcgNi42OTdsLTEuNDE0LTEuNDE0LTUuMzAzIDUuMzAzLTUuMzAzLTUuMzAzLTEuNDE0IDEuNDE0IDUuMzAzIDUuMzAzLTUuMzAzIDUuMzAzIDEuNDE0IDEuNDE0IDUuMzAzLTUuMzAzIDUuMzAzIDUuMzAzIDEuNDE0LTEuNDE0LTUuMzAzLTUuMzAzeiIvPgogICAgPC9nPgo8L3N2Zz4K) center center no-repeat;
  -webkit-box-shadow: 0 0 0 rgba(0,0,0,0);
  box-shadow: 0 0 0 rgba(0,0,0,0);
  position: absolute;
  right: 10px;
  top: 10px;
  -webkit-transition: all 0.2s linear;
  -o-transition: all 0.2s linear;
  transition: all 0.2s linear;
  opacity: 1;
  margin: 0;
  cursor: pointer;
}
button.popup-close:hover {
  -webkit-transform: rotate(-180deg);
  -ms-transform: rotate(-180deg);
  transform: rotate(-180deg);
}

#popup-content {
  min-height: 400px;
  padding: 50px 20px 20px 20px;
  text-align: left;
}
.post-title {font-weight: bold;}



</style>